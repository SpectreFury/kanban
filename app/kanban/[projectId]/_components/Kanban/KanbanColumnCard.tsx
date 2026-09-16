"use client";

import { Separator } from "@/components/ui/separator";
import KanbanTaskCard from "./KanbanTaskCard";
import { useDroppable } from "@dnd-kit/react";
import { CollisionPriority } from "@dnd-kit/abstract";
import { Task } from "@/types/project";

// Dummy heights
//

type KanbanColumnCardProps = {
  id: number;
  name: string;
  tasks: Task[];
};

const KanbanColumnCard = ({ id, name, tasks }: KanbanColumnCardProps) => {
  const columnId = `column-${id}`;
  const { ref } = useDroppable({
    id: columnId,
    type: 'column',
    accept: 'task',
    collisionPriority: CollisionPriority.Low
  });

  return (
    <div className="p-2 min-h-96 min-w-96 max-w-96 bg-gray-100 rounded">
      <div className="text-sm">{name}</div>
      <Separator className="text-gray-200 mt-2" />

      <div ref={ref} className="flex flex-col gap-2 p-2">
        {tasks.map((task, index) => (
          <KanbanTaskCard
            key={task.id}
            id={task.id}
            index={index}
            text={task.text}
            columnId={columnId}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumnCard;
