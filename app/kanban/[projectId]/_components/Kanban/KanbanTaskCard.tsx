import { useState } from "react";
import { useSortable } from "@dnd-kit/react/sortable";
import { Pencil } from "lucide-react";
import KanbanTaskPriorityLabel from "./KanbanTaskPriorityLabel";
import EditTaskDialog from "./EditTaskDialog";
import { Task } from "@/types/project";

type KanbanTaskCardProps = {
  task: Task;
  priority: number;
  index: number;
  columnId: string;
  onTaskUpdated: (task: Task) => void;
};

const KanbanTaskCard = ({
  task,
  index,
  columnId,
  priority,
  onTaskUpdated,
}: KanbanTaskCardProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { ref } = useSortable({
    id: task.id,
    index,
    type: "task",
    accept: "task",
    group: columnId,
  });

  return (
    <div ref={ref} className="bg-white p-2 flex flex-col gap-2 border rounded-lg">
      <div className="flex items-start justify-between gap-2">
        <div className="self-start">{task.text}</div>
        <button
          type="button"
          aria-label="Edit task"
          onClick={() => setDialogOpen(true)}
          className="shrink-0 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <Pencil size={14} />
        </button>
      </div>

      <KanbanTaskPriorityLabel priority={priority} />

      <EditTaskDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        task={task}
        onUpdated={onTaskUpdated}
      />
    </div>
  );
};

export default KanbanTaskCard;
