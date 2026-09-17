import { redirect } from "next/navigation";
import { getCurrentKanban, getProject } from "./action";
import KanbanBoard from "./_components/KanbanBoard";

const KanbanApp = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const { projectId } = await params;

  const project = await getCurrentKanban(projectId);
  if (!project) {
    redirect("/kanban");
  }

  console.log("Current Kanban: ", project);

  return (
    <main className="h-screen">
      <KanbanBoard initialProject={project} />
    </main>
  );
};

export default KanbanApp;
