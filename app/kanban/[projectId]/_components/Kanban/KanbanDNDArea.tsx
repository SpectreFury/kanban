"use client";

import type { Dispatch, SetStateAction } from "react";
import { KanbanColumn, Task } from "@/types/project";
import { DragDropProvider, type DragOverEvent } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import KanbanColumnCard from "./KanbanColumnCard";

type KanbanDNDAreaProps = {
  columns: KanbanColumn[];
  items: Record<string, Task[]>;
  onItemsChange: Dispatch<SetStateAction<Record<string, Task[]>>>;
  onTaskCreated: (task: Task) => void;
  onTaskUpdated: (task: Task) => void;
};

const getColumnId = (id: number) => {
  return `column-${id}`;
};

const KanbanDNDArea = ({
  columns,
  items,
  onItemsChange,
  onTaskCreated,
  onTaskUpdated,
}: KanbanDNDAreaProps) => {
  function handleDragOver(event: DragOverEvent) {
    onItemsChange((current) => move(current, event));
  }

  return (
    <DragDropProvider onDragOver={handleDragOver}>
      {columns.map((column) => {
        const key = getColumnId(column.id);
        return (
          <KanbanColumnCard
            key={column.id}
            id={key}
            columnId={column.id}
            name={column.name}
            tasks={items[key] ?? []}
            onTaskCreated={onTaskCreated}
            onTaskUpdated={onTaskUpdated}
          />
        );
      })}
    </DragDropProvider>
  );
};

export default KanbanDNDArea;
