"use server";

import { auth } from "@/lib/auth/auth";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { eq, and, asc } from "drizzle-orm";
import * as z from "zod";
import { kanbanColumn, project, task } from "@/db/schema";
import { Task, KanbanColumn } from "@/types/project";

export type Project = {
  id: number;
  name: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
};

export const getProject = async (
  projectId: string,
): Promise<Project | null> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  const [row] = await db
    .select()
    .from(project)
    .where(
      and(
        eq(project.authorId, session.user.id),
        eq(project.id, Number(projectId)),
      ),
    );

  if (!row) {
    return null;
  }

  return row;
};

export const getCurrentKanban = async (projectId: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  const kanban = await db.query.project.findFirst({
    where: and(
      eq(project.authorId, session.user.id),
      eq(project.id, Number(projectId)),
    ),
    with: {
      kanbanColumn: {
        orderBy: asc(kanbanColumn.position),
        with: { task: { orderBy: asc(task.position) } },
      },
    },
  });

  if (!kanban) {
    return null;
  }

  return kanban;
};

const saveBoardSchema = z.object({
  projectId: z.number().int(),
  layout: z.array(
    z.object({
      id: z.number().int(),
      kanbanColumnId: z.number().int(),
      position: z.number().int().min(0),
    }),
  ),
});

type SaveBoardResult =
  { success: true; error?: never } | { success?: never; error: string };

export const saveBoard = async (input: {
  projectId: number;
  layout: { id: number; kanbanColumnId: number; position: number }[];
}): Promise<SaveBoardResult> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { error: "You must be logged in to save" };
  }

  const parsed = saveBoardSchema.safeParse(input);

  if (!parsed.success) {
    return { error: "Invalid board data" };
  }

  const { projectId, layout } = parsed.data;

  const [owned] = await db
    .select({ id: project.id })
    .from(project)
    .where(
      and(eq(project.id, projectId), eq(project.authorId, session.user.id)),
    );

  if (!owned) {
    return { error: "Project not found" };
  }

  const projectColumns = await db.query.kanbanColumn.findMany({
    where: eq(kanbanColumn.projectId, projectId),
    columns: { id: true },
    with: { task: { columns: { id: true } } },
  });

  const columnIds = new Set(projectColumns.map((column) => column.id));
  const taskIds = new Set(
    projectColumns.flatMap((column) => column.task.map((t) => t.id)),
  );

  for (const item of layout) {
    if (!taskIds.has(item.id) || !columnIds.has(item.kanbanColumnId)) {
      return { error: "Invalid board data" };
    }
  }

  await Promise.all(
    layout.map((item) =>
      db
        .update(task)
        .set({ kanbanColumnId: item.kanbanColumnId, position: item.position })
        .where(eq(task.id, item.id)),
    ),
  );

  revalidatePath(`/kanban/${projectId}`);

  return { success: true };
};

const createTaskSchema = z.object({
  kanbanColumnId: z.number().int(),
  text: z
    .string()
    .trim()
    .min(1, "Task cannot be empty")
    .max(500, "Task should be at most 500 characters"),
});

type CreateTaskResult =
  | { task: Task; error?: never }
  | { task?: never; error: string };

export const createTask = async (input: {
  kanbanColumnId: number;
  text: string;
}): Promise<CreateTaskResult> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { error: "You must be logged in to create a task" };
  }

  const parsed = createTaskSchema.safeParse(input);

  if (!parsed.success) {
    return { error: "Invalid task" };
  }

  const { kanbanColumnId, text } = parsed.data;

  const column = await db.query.kanbanColumn.findFirst({
    where: eq(kanbanColumn.id, kanbanColumnId),
    columns: { id: true, projectId: true },
    with: { project: { columns: { authorId: true } } },
  });

  if (!column || column.project.authorId !== session.user.id) {
    return { error: "Column not found" };
  }

  const existing = await db.query.task.findMany({
    where: eq(task.kanbanColumnId, kanbanColumnId),
    columns: { position: true },
  });

  const position =
    existing.reduce((max, t) => Math.max(max, t.position), -1) + 1;

  const [row] = await db
    .insert(task)
    .values({ text, kanbanColumnId, position })
    .returning();

  revalidatePath(`/kanban/${column.projectId}`);

  return { task: row };
};

const updateTaskSchema = z.object({
  id: z.number().int(),
  text: z
    .string()
    .trim()
    .min(1, "Task cannot be empty")
    .max(500, "Task should be at most 500 characters"),
});

type UpdateTaskResult =
  | { task: Task; error?: never }
  | { task?: never; error: string };

export const updateTask = async (input: {
  id: number;
  text: string;
}): Promise<UpdateTaskResult> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { error: "You must be logged in to edit a task" };
  }

  const parsed = updateTaskSchema.safeParse(input);

  if (!parsed.success) {
    return { error: "Invalid task" };
  }

  const { id, text } = parsed.data;

  const existing = await db.query.task.findFirst({
    where: eq(task.id, id),
    columns: { id: true },
    with: {
      kanbanColumn: {
        columns: { projectId: true },
        with: { project: { columns: { authorId: true } } },
      },
    },
  });

  if (!existing || existing.kanbanColumn.project.authorId !== session.user.id) {
    return { error: "Task not found" };
  }

  const [row] = await db
    .update(task)
    .set({ text })
    .where(eq(task.id, id))
    .returning();

  revalidatePath(`/kanban/${existing.kanbanColumn.projectId}`);

  return { task: row };
};

const createColumnSchema = z.object({
  projectId: z.number().int(),
  name: z
    .string()
    .trim()
    .min(1, "Name cannot be empty")
    .max(50, "Name should be at most 50 characters"),
});

type CreateColumnResult =
  | { column: KanbanColumn; error?: never }
  | { column?: never; error: string };

export const createColumn = async (input: {
  projectId: number;
  name: string;
}): Promise<CreateColumnResult> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { error: "You must be logged in to create a column" };
  }

  const parsed = createColumnSchema.safeParse(input);

  if (!parsed.success) {
    return { error: "Invalid column" };
  }

  const { projectId, name } = parsed.data;

  const [owned] = await db
    .select({ id: project.id })
    .from(project)
    .where(
      and(eq(project.id, projectId), eq(project.authorId, session.user.id)),
    );

  if (!owned) {
    return { error: "Project not found" };
  }

  const existing = await db.query.kanbanColumn.findMany({
    where: eq(kanbanColumn.projectId, projectId),
    columns: { position: true },
  });

  const position =
    existing.reduce((max, c) => Math.max(max, c.position), -1) + 1;

  const [row] = await db
    .insert(kanbanColumn)
    .values({ name, projectId, position })
    .returning();

  revalidatePath(`/kanban/${projectId}`);

  return { column: { ...row, task: [] } };
};
