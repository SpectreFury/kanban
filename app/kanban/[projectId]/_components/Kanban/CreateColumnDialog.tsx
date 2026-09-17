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
import { createColumn } from "../../action";
import { KanbanColumn } from "@/types/project";

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name cannot be empty")
    .max(50, "Name should be at most 50 characters"),
});

type FormSchema = z.infer<typeof formSchema>;

type CreateColumnDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: number;
  onCreated: (column: KanbanColumn) => void;
};

const CreateColumnDialog = ({
  open,
  onOpenChange,
  projectId,
  onCreated,
}: CreateColumnDialogProps) => {
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

    const result = await createColumn({ projectId, name: data.name });

    setIsLoading(false);

    if (result.error || !result.column) {
      toast.add({
        title: result.error ?? "Unable to create column",
      });
      return;
    }

    toast.add({
      title: "Column created",
    });

    onCreated(result.column);
    form.reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New column</DialogTitle>
          <DialogDescription>
            Give your column a name, e.g. &ldquo;To do&rdquo;.
          </DialogDescription>
        </DialogHeader>

        <form
          id="create-column-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col"
        >
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="create-column-form-name">
                  Name
                </FieldLabel>
                <Input
                  {...field}
                  id="create-column-form-name"
                  className="h-10"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  placeholder="To do"
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
            form="create-column-form"
            className="cursor-pointer"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateColumnDialog;
