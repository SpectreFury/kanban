import { auth } from "@/lib/auth/auth";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/db/drizzle";
import { eq, and } from "drizzle-orm";
import { project } from "@/db/schema";

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
