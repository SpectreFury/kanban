"use client";

import { useState } from "react";
import { Project } from "@/types/project";
import { DragDropProvider, DragEndEvent } from "@dnd-kit/react";
import KanbanColumnCard from "./KanbanColumnCard";

type KanbanDNDAreaProps = {
  initialProject: Project;
};

const getColumnId = (id: number) => {
  return `column-${id}`;
};

const KanbanDNDArea = ({ initialProject }: KanbanDNDAreaProps) => {
  const [board, setBoard] = useState(initialProject.kanbanColumn);

  function handleDragEnd(event: DragEndEvent) {}

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      {board.map((column) => (
        <KanbanColumnCard
          key={column.id}
          id={getColumnId(column.id)}
          name={column.name}
          tasks={column.task}
        />
      ))}
    </DragDropProvider>
  );
};

export default KanbanDNDArea;
