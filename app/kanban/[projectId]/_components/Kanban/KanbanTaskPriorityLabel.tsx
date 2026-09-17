import { GripVertical } from "lucide-react";

type KanbanTaskPriorityLabelProps = {
  priority: number;
};
const KanbanTaskPriorityLabel = ({
  priority,
}: KanbanTaskPriorityLabelProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm px-2 bg-violet-200 rounded-full self-start">
        #{priority}
      </div>
      <GripVertical size={20} className="text-gray-400" />
    </div>
  );
};

export default KanbanTaskPriorityLabel;
