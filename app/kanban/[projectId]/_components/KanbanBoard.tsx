"use client";

import { useState } from "react";
import { Columns3, Plus } from "lucide-react";
import { Project, Task, KanbanColumn } from "@/types/project";
import { saveBoard } from "../action";
import { toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import KanbanNavigation from "./KanbanNavigation";
import KanbanDNDArea from "./Kanban/KanbanDNDArea";
import CreateColumnDialog from "./Kanban/CreateColumnDialog";

const getColumnKey = (id: number) => {
  return `column-${id}`;
};

type KanbanBoardProps = {
  initialProject: Project;
};

const KanbanBoard = ({ initialProject }: KanbanBoardProps) => {
  const [columns, setColumns] = useState(initialProject.kanbanColumn);
  const [items, setItems] = useState<Record<string, Task[]>>(() =>
    Object.fromEntries(
      initialProject.kanbanColumn.map((column): [string, Task[]] => [
        getColumnKey(column.id),
        column.task,
      ]),
    ),
  );
  const [isSaving, setIsSaving] = useState(false);
  const [columnDialogOpen, setColumnDialogOpen] = useState(false);

  function handleColumnCreated(column: KanbanColumn) {
    setColumns((prev) => [...prev, column]);
    setItems((prev) => ({ ...prev, [getColumnKey(column.id)]: [] }));
  }

  function handleTaskCreated(task: Task) {
    setItems((prev) => {
      const key = getColumnKey(task.kanbanColumnId);
      return { ...prev, [key]: [...(prev[key] ?? []), task] };
    });
  }

  function handleTaskUpdated(updated: Task) {
    setItems((prev) => {
      const key = getColumnKey(updated.kanbanColumnId);
      return {
        ...prev,
        [key]: (prev[key] ?? []).map((task) =>
          task.id === updated.id ? updated : task,
        ),
      };
    });
  }

  async function handleSave() {
    setIsSaving(true);

    const layout = columns.flatMap((column) =>
      (items[getColumnKey(column.id)] ?? []).map((task, position) => ({
        id: task.id,
        kanbanColumnId: column.id,
        position,
      })),
    );

    const result = await saveBoard({ projectId: initialProject.id, layout });

    setIsSaving(false);

    if (result.error) {
      toast.add({ title: result.error });
      return;
    }

    toast.add({ title: "Board saved" });
  }

  return (
    <>
      <KanbanNavigation
        project={initialProject}
        onSave={handleSave}
        isSaving={isSaving}
      />

      <div className="mx-6 my-4 flex items-start gap-10">
        {columns.length === 0 ? (
          <div className="flex min-h-[60vh] w-full items-center justify-center">
            <div className="flex w-full max-w-sm flex-col items-center rounded-2xl border border-dashed bg-card px-8 py-12 text-center shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted">
                <Columns3 className="h-5 w-5 text-muted-foreground" />
              </div>
              <h2 className="mt-4 text-lg font-semibold tracking-tight">
                No columns yet
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Columns organize your work into stages. Create your first
                one to get started.
              </p>
              <Button
                onClick={() => setColumnDialogOpen(true)}
                className="mt-6 gap-1.5"
              >
                <Plus className="h-4 w-4" />
                New column
              </Button>
            </div>
          </div>
        ) : (
          <>
            <KanbanDNDArea
              columns={columns}
              items={items}
              onItemsChange={setItems}
              onTaskCreated={handleTaskCreated}
              onTaskUpdated={handleTaskUpdated}
            />
            <button
              onClick={() => setColumnDialogOpen(true)}
              className="flex min-w-96 cursor-pointer items-center justify-center gap-2 self-stretch rounded border border-dashed bg-card/50 p-4 text-sm font-medium text-muted-foreground transition-colors hover:border-foreground/20 hover:bg-muted/40 hover:text-foreground"
            >
              <Plus className="h-4 w-4" />
              New column
            </button>
          </>
        )}
      </div>

      <CreateColumnDialog
        open={columnDialogOpen}
        onOpenChange={setColumnDialogOpen}
        projectId={initialProject.id}
        onCreated={handleColumnCreated}
      />
    </>
  );
};

export default KanbanBoard;
