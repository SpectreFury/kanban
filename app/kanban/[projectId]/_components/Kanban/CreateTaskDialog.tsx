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
import { createTask } from "../../action";
import { Task } from "@/types/project";

const formSchema = z.object({
  text: z
    .string()
    .trim()
    .min(1, "Task cannot be empty")
    .max(500, "Task should be at most 500 characters"),
});

type FormSchema = z.infer<typeof formSchema>;

type CreateTaskDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  columnId: number;
  columnName: string;
  onCreated: (task: Task) => void;
};

const CreateTaskDialog = ({
  open,
  onOpenChange,
  columnId,
  columnName,
  onCreated,
}: CreateTaskDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
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

    const result = await createTask({ kanbanColumnId: columnId, text: data.text });

    setIsLoading(false);

    if (result.error || !result.task) {
      toast.add({
        title: result.error ?? "Unable to create task",
      });
      return;
    }

    toast.add({
      title: "Task created",
    });

    onCreated(result.task);
    form.reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New task</DialogTitle>
          <DialogDescription>
            Add a task to &ldquo;{columnName}&rdquo;.
          </DialogDescription>
        </DialogHeader>

        <form
          id="create-task-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col"
        >
          <Controller
            name="text"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="create-task-form-text">
                  Task
                </FieldLabel>
                <Input
                  {...field}
                  id="create-task-form-text"
                  className="h-10"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  placeholder="What needs to be done?"
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
            form="create-task-form"
            className="cursor-pointer"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskDialog;
