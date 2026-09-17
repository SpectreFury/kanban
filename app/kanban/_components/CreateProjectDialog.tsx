"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { toast } from "@/components/ui/toast";
import { Loader2 } from "lucide-react";
import { createProject } from "../actions";
import { ProjectSummary } from "@/types/project";

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name should be at least 2 characters")
    .max(50, "Name should be at most 50 characters"),
});

type FormSchema = z.infer<typeof formSchema>;

type CreateProjectDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: (project: ProjectSummary) => void;
};

const CreateProjectDialog = ({
  open,
  onOpenChange,
  onCreated,
}: CreateProjectDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      form.reset();
    }
    onOpenChange(next);
  };

  async function onSubmit(data: FormSchema) {
    setIsLoading(true);

    const result = await createProject({ name: data.name });

    setIsLoading(false);

    if (result.error || !result.project) {
      toast.add({
        title: result.error ?? "Unable to create project",
      });
      return;
    }

    toast.add({
      title: "Project created",
    });

    onCreated(result.project);
    form.reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New project</DialogTitle>
          <DialogDescription>
            Give your project a name to get started.
          </DialogDescription>
        </DialogHeader>

        <form
          id="create-project-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col"
        >
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="create-project-form-name">
                  Name
                </FieldLabel>
                <Input
                  {...field}
                  id="create-project-form-name"
                  className="h-10"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  placeholder="My project"
                />

                {fieldState.error && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </form>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="create-project-form"
            className="cursor-pointer"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectDialog;