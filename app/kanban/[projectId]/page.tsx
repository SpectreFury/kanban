import { redirect } from "next/navigation";
import { getProject } from "./action";
import type { Project } from "./action";
import KanbanNavigation from "./_components/KanbanNavigation";

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


    </main>
  );
};

export default KanbanApp;
