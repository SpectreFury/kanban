"use client";

import { useDraggable } from "@dnd-kit/react";
import KanbanTaskPriorityLabel from "./KanbanTaskPriorityLabel";

type KanbanTaskCardProps = {
  id: number;
  priority: number;
  text: string;
};

const KanbanTaskCard = ({ id, priority, text }: KanbanTaskCardProps) => {
  const { ref } = useDraggable({
    id,
  });

  return (
    <div ref={ref} className="bg-white p-2 flex flex-col gap-2">
      <div>{text}</div>

      <KanbanTaskPriorityLabel priority={priority} />
    </div>
  );
};

export default KanbanTaskCard;
