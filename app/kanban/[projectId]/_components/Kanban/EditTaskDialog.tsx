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
import { updateTask } from "../../action";
import { Task } from "@/types/project";

const formSchema = z.object({
  text: z
    .string()
    .trim()
    .min(1, "Task cannot be empty")
    .max(500, "Task should be at most 500 characters"),
});

type FormSchema = z.infer<typeof formSchema>;

type EditTaskDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: Task;
  onUpdated: (task: Task) => void;
};

const EditTaskDialog = ({
  open,
  onOpenChange,
  task,
  onUpdated,
}: EditTaskDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: task.text,
    },
  });

  const handleOpenChange = (next: boolean) => {
    if (next) {
      form.reset({ text: task.text });
    }
    onOpenChange(next);
  };

  async function onSubmit(data: FormSchema) {
    setIsLoading(true);

    const result = await updateTask({ id: task.id, text: data.text });

    setIsLoading(false);

    if (result.error || !result.task) {
      toast.add({
        title: result.error ?? "Unable to update task",
      });
      return;
    }

    toast.add({
      title: "Task updated",
    });

    onUpdated(result.task);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit task</DialogTitle>
          <DialogDescription>
            Update the task text below.
          </DialogDescription>
        </DialogHeader>

        <form
          id={`edit-task-form-${task.id}`}
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col"
        >
          <Controller
            name="text"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={`edit-task-form-text-${task.id}`}>
                  Task
                </FieldLabel>
                <Input
                  {...field}
                  id={`edit-task-form-text-${task.id}`}
                  className="h-10"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
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
            form={`edit-task-form-${task.id}`}
            className="cursor-pointer"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskDialog;
