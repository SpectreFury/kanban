import { Separator } from "@/components/ui/separator";
import KanbanTaskCard from "./KanbanTaskCard";
import { CircleDashed } from "lucide-react";
import { Task } from "@/types/project";

// Dummy heights
//

type KanbanColumnCardProps = {
  id: string;
  name: string;
  tasks: Task[];
};

const KanbanColumnCard = ({ name, tasks }: KanbanColumnCardProps) => {
  return (
    <div className="p-2 min-w-96 max-w-96 bg-muted/40 rounded border">
      <div className="flex items-center gap-2">
        <CircleDashed size={16} className="text-gray-400" />
        <div className="text-xs font-medium">{name}</div>
      </div>
      <Separator className="text-gray-200 mt-2" />

      <div className="flex flex-col gap-2 p-2">
        {tasks.map((task) => (
          <KanbanTaskCard
            key={task.id}
            id={task.id}
            text={task.text}
            position={task.position}
            priority={0}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumnCard;
