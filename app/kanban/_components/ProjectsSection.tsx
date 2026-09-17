"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProjectCard from "./ProjectCard";
import EmptyProjectsState from "./EmptyProjectsState";
import CreateProjectDialog from "./CreateProjectDialog";
import { ProjectSummary } from "@/types/project";

type ProjectsSectionProps = {
  initialProjects: ProjectSummary[];
};

const ProjectsSection = ({ initialProjects }: ProjectsSectionProps) => {
  const [projects, setProjects] = useState<ProjectSummary[]>(initialProjects);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCreated = (project: ProjectSummary) => {
    setProjects((prev) => [project, ...prev]);
  };

  return (
    <>
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Your projects</CardTitle>
          {projects.length > 0 && (
            <CardAction>
              <Button
                size="sm"
                onClick={() => setDialogOpen(true)}
                className="cursor-pointer gap-1"
              >
                <span className="text-lg leading-none">+</span>
                New
              </Button>
            </CardAction>
          )}
        </CardHeader>
        <CardContent>
          {projects.length > 0 ? (
            <div className="flex flex-col gap-2">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  name={project.name}
                  date={project.date}
                />
              ))}
            </div>
          ) : (
            <EmptyProjectsState onNew={() => setDialogOpen(true)} />
          )}
        </CardContent>
      </Card>

      <CreateProjectDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onCreated={handleCreated}
      />
    </>
  );
};

export default ProjectsSection;
