import { Separator } from "@/components/ui/separator";

const KanbanColumnCard = () => {
  return (
    <div className="p-2 min-h-24 min-w-96 bg-gray-100 rounded">
      <div className="text-sm">Not started</div>
      <Separator className="text-gray-200 mt-2"/>
    </div>
  );
};

export default KanbanColumnCard;
