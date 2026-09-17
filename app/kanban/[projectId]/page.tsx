import { redirect } from "next/navigation";
import { getCurrentKanban, getProject } from "./action";
import KanbanNavigation from "./_components/KanbanNavigation";
import KanbanColumnCard from "./_components/Kanban/KanbanColumnCard";
import KanbanDNDArea from "./_components/Kanban/KanbanDNDArea";

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
      <KanbanNavigation project={project} />

      <div className="mx-6 my-4 flex gap-10">
        <KanbanDNDArea>
          {project.kanbanColumn.map((column) => (
            <KanbanColumnCard
              key={column.id}
              id={column.id}
              name={column.name}
              tasks={column.task}
            />
          ))}
        </KanbanDNDArea>
      </div>
    </main>
  );
};

export default KanbanApp;
