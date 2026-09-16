import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { eq, desc } from "drizzle-orm";
import { auth } from "@/lib/auth/auth";
import { db } from "@/db/drizzle";
import { project } from "@/db/schema";
import { formatProjectDate } from "@/lib/format";
import { Project } from "@/types/project";
import UserMenu from "./_components/UserMenu";
import ProjectsSection from "./_components/ProjectsSection";
import { FolderKanban } from "lucide-react";

const KanbanDashboard = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  const rows = await db.query.project.findMany({
    where: eq(project.authorId, session.user.id),
    orderBy: [desc(project.createdAt)],
  });

  const initialProjects: Project[] = rows.map((row) => ({
    id: String(row.id),
    name: row.name,
    date: formatProjectDate(row.createdAt),
  }));

  return (
    <main className="flex flex-col min-h-svh">
      <div className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto h-14 max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex h-full items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center rounded-lg bg-violet-400/10 p-1.5">
                <FolderKanban className="h-5 w-5 text-violet-400" />
              </div>
              <span className="text-lg font-semibold tracking-tight">Kanban</span>
            </div>

            <UserMenu />
          </nav>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center pt-20">
          <ProjectsSection initialProjects={initialProjects} />
        </div>
      </div>
    </main>
  );
};

export default KanbanDashboard;