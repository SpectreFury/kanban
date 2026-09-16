type KanbanTaskPriorityLabelProps = {
  priority: number;
};
const KanbanTaskPriorityLabel = ({
  priority,
}: KanbanTaskPriorityLabelProps) => {
  return (
    <div className="p-1 bg-violet-200 rounded self-start">#{priority}</div>
  );
};

export default KanbanTaskPriorityLabel;
