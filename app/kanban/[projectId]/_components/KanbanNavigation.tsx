"use client";

import Link from "next/link";
import { ArrowLeft, FolderKanban, Save } from "lucide-react";
import type { Project } from "../action";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type KanbanNavigationProps = {
  project: Project;
};

const KanbanNavigation = ({ project }: KanbanNavigationProps) => {
  return (
    <header className="sticky top-0 z-10 border-b bg-card/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex h-14 items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <Link
              href="/kanban"
              aria-label="Back to projects"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon-sm" }),
                "shrink-0 text-muted-foreground hover:text-foreground",
              )}
            >
              <ArrowLeft />
            </Link>

            <div
              aria-hidden="true"
              className="h-6 w-px shrink-0 bg-border"
            />

            <div className="flex min-w-0 items-center gap-2.5">
              <div className="flex shrink-0 items-center justify-center rounded-lg bg-violet-400/10 p-1.5">
                <FolderKanban className="h-5 w-5 text-violet-400" />
              </div>
              <div className="min-w-0 leading-tight">
                <p className="text-xs text-muted-foreground">Kanban project</p>
                <h1
                  title={project.name}
                  className="truncate text-base font-medium tracking-tight"
                >
                  {project.name}
                </h1>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Button
              size="sm"
              onClick={() => {}}
              className="cursor-pointer gap-1.5"
            >
              <Save />
              Save
              <span className="hidden sm:inline">changes</span>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default KanbanNavigation;
