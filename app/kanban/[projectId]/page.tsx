import { redirect } from "next/navigation";
import { getProject } from "./action";
import type { Project } from "./action";
import KanbanNavigation from "./_components/KanbanNavigation";
import KanbanColumnCard from "./_components/Kanban/KanbanColumnCard";

const KanbanApp = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const { projectId } = await params;

  const project = await getProject(projectId);
  if (!project) {
    redirect("/kanban");
  }

  return (
    <main className="h-screen">
      <KanbanNavigation project={project} />

      <div className="mx-6 my-4 flex gap-10">
        <KanbanColumnCard />
        <KanbanColumnCard />
      </div>
    </main>
  );
};

export default KanbanApp;
