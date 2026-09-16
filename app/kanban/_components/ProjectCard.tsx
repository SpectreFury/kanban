import Link from "next/link";
import { FolderKanban } from "lucide-react";

type ProjectCardProps = {
  name: string;
  date?: string;
};

const ProjectCard = ({ name, date }: ProjectCardProps) => {
  return (
    <Link
      href="/"
      className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-4 py-3 transition-colors hover:bg-accent/60"
    >
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors group-hover:bg-violet-400/10 group-hover:text-violet-400">
          <FolderKanban className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <div className="truncate font-medium">{name}</div>
          {date && (
            <div className="text-xs text-muted-foreground">{date}</div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;