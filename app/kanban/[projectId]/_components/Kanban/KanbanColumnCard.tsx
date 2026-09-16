"use client";

import { Separator } from "@/components/ui/separator";
import KanbanTaskCard from "./KanbanTaskCard";
import { useDroppable } from "@dnd-kit/react";

// Dummy heights
//

type Task = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  position: number;
  text: string;
  kanbanColumnId: number;
};

type KanbanColumnCardProps = {
  id: number;
  name: string;
  tasks: Task[];
};

const KanbanColumnCard = ({ id, name, tasks }: KanbanColumnCardProps) => {
  const { ref } = useDroppable({ id });

  return (
    <div className="p-2 min-h-96 min-w-96 max-w-96 bg-gray-100 rounded">
      <div className="text-sm">{name}</div>
      <Separator className="text-gray-200 mt-2" />

      <div ref={ref} className="flex flex-col gap-2 p-2">
        {tasks.map((task) => (
          <KanbanTaskCard
            key={task.id}
            id={task.id}
            text={task.text}
            priority={0}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumnCard;
