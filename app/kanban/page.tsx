"use client";

import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import ProjectCard from "./_components/ProjectCard";
import EmptyProjectsState from "./_components/EmptyProjectsState";
import { LogOut, FolderKanban } from "lucide-react";
import { Project } from "@/types/project";

const KanbanDashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const router = useRouter();

  const signOut = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  return (
    <main className="flex flex-col min-h-svh">
      <div className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto flex h-14 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2.5">
            <div className="flex items-center justify-center rounded-lg bg-violet-400/10 p-1.5">
              <FolderKanban className="h-5 w-5 text-violet-400" />
            </div>
            <span className="text-lg font-semibold tracking-tight">Kanban</span>
          </nav>

          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="text-xs">KB</AvatarFallback>
            </Avatar>

            <Button
              variant="outline"
              size="sm"
              onClick={signOut}
              className="cursor-pointer gap-1.5 text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
              Log out
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-screen-xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center pt-20">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle>Your projects</CardTitle>
              <CardAction>
                <Button size="sm" className="cursor-pointer gap-1">
                  <span className="text-lg leading-none">+</span>
                  New
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              {projects.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {projects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      name={project.name}
                      date={project.date}
                    />
                  ))}
                </div>
              ) : (
                <EmptyProjectsState />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default KanbanDashboard;
