import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import KanbanTaskCard from "./KanbanTaskCard";
import CreateTaskDialog from "./CreateTaskDialog";
import { CircleDashed } from "lucide-react";
import { Task } from "@/types/project";
import { useDroppable } from "@dnd-kit/react";
import { CollisionPriority } from "@dnd-kit/abstract";
import { Button } from "@/components/ui/button";

type KanbanColumnCardProps = {
  id: string;
  columnId: number;
  name: string;
  tasks: Task[];
  onTaskCreated: (task: Task) => void;
  onTaskUpdated: (task: Task) => void;
};

const KanbanColumnCard = ({
  id,
  columnId,
  name,
  tasks,
  onTaskCreated,
  onTaskUpdated,
}: KanbanColumnCardProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { ref, isDropTarget } = useDroppable({
    id,
    type: "column",
    accept: "task",
    collisionPriority: CollisionPriority.Low,
  });

  return (
    <div className="p-2 min-w-96 max-w-96 bg-muted/40 rounded border">
      <div className="flex items-center gap-2">
        <CircleDashed size={16} className="text-gray-400" />
        <div className="text-xs font-medium">{name}</div>
      </div>
      <Separator className="text-gray-200 mt-2" />

      <div
        ref={ref}
        className={`h-full w-full flex min-h-20 flex-col gap-2 p-2 ${isDropTarget ? "bg-muted/80" : ""}`}
      >
        {tasks.map((task, index) => (
          <KanbanTaskCard
            key={task.id}
            task={task}
            index={index}
            columnId={id}
            priority={0}
            onTaskUpdated={onTaskUpdated}
          />
        ))}

        <Button
          variant="outline"
          className="w-full self-end"
          onClick={() => setDialogOpen(true)}
        >
          Add a task
        </Button>
      </div>

      <CreateTaskDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        columnId={columnId}
        columnName={name}
        onCreated={onTaskCreated}
      />
    </div>
  );
};

export default KanbanColumnCard;
