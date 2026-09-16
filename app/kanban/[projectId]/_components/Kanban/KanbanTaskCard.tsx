"use client";

import { useSortable } from "@dnd-kit/react/sortable";
import KanbanTaskPriorityLabel from "./KanbanTaskPriorityLabel";

type KanbanTaskCardProps = {
  id: number;
  text: string;
  index: number;
  columnId: string;
};

const KanbanTaskCard = ({ id, text, index, columnId }: KanbanTaskCardProps) => {
  const { ref } = useSortable({
    id,
    index,
    type: "task",
    accept: "task",
    group: columnId,
    data: { group: columnId },
  });

  return (
    <div ref={ref} className="bg-white p-2 flex flex-col gap-2">
      <div>{text}</div>

      <KanbanTaskPriorityLabel priority={0} />
    </div>
  );
};

export default KanbanTaskCard;
