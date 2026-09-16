"use client";

import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import KanbanColumnCard from "./KanbanColumnCard";
import { useState } from "react";
import type { Project, Task } from "@/types/project";

type KanbanDNDAreaProps = {
  initialProject: Project;
};

const columnKey = (columnId: number) => `column-${columnId}`;

const KanbanDNDArea = ({ initialProject }: KanbanDNDAreaProps) => {
  const [items, setItems] = useState<Record<string, Task[]>>(() =>
    Object.fromEntries(
      initialProject.kanbanColumn.map((column) => [
        columnKey(column.id),
        column.task,
      ]),
    ),
  );

  return (
    <DragDropProvider
      onDragOver={(event) => {
        setItems((items) => move(items, event));
      }}
    >
      <div className="Root flex gap-4">
        {initialProject.kanbanColumn.map((column) => (
          <KanbanColumnCard
            key={column.id}
            id={column.id}
            name={column.name}
            tasks={items[columnKey(column.id)] ?? []}
          />
        ))}
      </div>
    </DragDropProvider>
  );
};

export default KanbanDNDArea;
