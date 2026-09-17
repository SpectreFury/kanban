import { useSortable } from "@dnd-kit/react/sortable";
import KanbanTaskPriorityLabel from "./KanbanTaskPriorityLabel";

type KanbanTaskCardProps = {
  id: number;
  priority: number;
  text: string;
  position: number;
};

const KanbanTaskCard = ({ id, position, text }: KanbanTaskCardProps) => {
  const { ref } = useSortable({
    id,
    index: position,
    type: "task",
    accept: "task",
  });

  return (
    <button
      ref={ref}
      className="bg-white p-2 flex flex-col gap-2 border rounded-lg"
    >
      <div className="self-start">{text}</div>

      <KanbanTaskPriorityLabel priority={0} />
    </button>
  );
};

export default KanbanTaskCard;
