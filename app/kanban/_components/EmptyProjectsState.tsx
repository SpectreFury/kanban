import { FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

type EmptyProjectsStateProps = {
  onNew: () => void;
};

const EmptyProjectsState = ({ onNew }: EmptyProjectsStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-border bg-muted/20 px-6 py-14 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-400/10 shadow-sm">
        <FolderOpen className="h-5 w-5 text-violet-400" />
      </div>

      <div className="space-y-1.5">
        <div className="text-base font-semibold tracking-tight">
          No projects yet
        </div>
        <p className="mx-auto max-w-xs text-sm text-muted-foreground">
          Create your first project to start organizing your tasks with
          kanban boards.
        </p>
      </div>

      <Button size="sm" onClick={onNew} className="cursor-pointer gap-1">
        <span className="text-lg leading-none">+</span>
        New project
      </Button>
    </div>
  );
};

export default EmptyProjectsState;