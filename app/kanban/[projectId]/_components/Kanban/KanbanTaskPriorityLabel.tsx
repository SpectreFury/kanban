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
    </div>
  );
};

export default KanbanTaskPriorityLabel;
