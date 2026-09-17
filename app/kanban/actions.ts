"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import * as z from "zod";
import { auth } from "@/lib/auth/auth";
import { db } from "@/db/drizzle";
import { project } from "@/db/schema";
import { formatProjectDate } from "@/lib/format";
import { ProjectSummary } from "@/types/project";

const createProjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name should be at least 2 characters")
    .max(50, "Name should be at most 50 characters"),
});

type CreateProjectResult =
  | { project: ProjectSummary; error?: never }
  | { project?: never; error: string };

export async function createProject(input: {
  name: string;
}): Promise<CreateProjectResult> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { error: "You must be logged in to create a project" };
  }

  const parsed = createProjectSchema.safeParse(input);

  if (!parsed.success) {
    return { error: "Invalid project name" };
  }

  const [row] = await db
    .insert(project)
    .values({ name: parsed.data.name, authorId: session.user.id })
    .returning();

  revalidatePath("/kanban");

  return {
    project: {
      id: String(row.id),
      name: row.name,
      date: formatProjectDate(row.createdAt),
    },
  };
}
