"use client";


import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { toast } from "@/components/ui/toast";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const formSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name should be at least 2 characters")
      .max(50, "Name should be at most 50 characters"),
    email: z.email(),
    password: z
      .string()
      .min(8, "Password should be at least 8 characters")
      .max(32, "Password should be at most 32 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormSchema = z.infer<typeof formSchema>;

const SignupPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: FormSchema) {
    const { error } = await authClient.signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      {
        onRequest: (ctx) => {
          // Loading
          setIsLoading(true);
        },

        onSuccess: (ctx) => {
          toast.add({
            title: "Logged in",
          });

          setIsLoading(false);
          router.replace("/kanban");
        },

        onError: (ctx) => {
          toast.add({
            title: "Error occurred while signing up",
          });

          setIsLoading(false);
        },
      },
    );
  }

  return (
    <main className="flex min-h-svh items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Get started with your Kanban workspace
          </p>
        </div>

        <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
          <form
            id="signup-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col"
          >
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="signup-form-name">Name</FieldLabel>
                    <Input
                      {...field}
                      id="signup-form-name"
                      className="h-10"
                      aria-invalid={fieldState.invalid}
                      autoComplete="name"
                      placeholder="Jane Doe"
                    />

                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="signup-form-email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="signup-form-email"
                      className="h-10"
                      aria-invalid={fieldState.invalid}
                      autoComplete="email"
                      placeholder="you@example.com"
                      type="email"
                    />

                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="signup-form-password">
                      Password
                    </FieldLabel>
                    <Input
                      {...field}
                      type="password"
                      id="signup-form-password"
                      className="h-10"
                      aria-invalid={fieldState.invalid}
                      autoComplete="new-password"
                    />

                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="signup-form-confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      {...field}
                      type="password"
                      id="signup-form-confirm-password"
                      className="h-10"
                      aria-invalid={fieldState.invalid}
                      autoComplete="new-password"
                    />

                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Button type="submit" size="lg" className="w-full">
                Sign Up
                {isLoading ? <Loader2 className="animate-spin" /> : "Sign Up"}
              </Button>
            </FieldGroup>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-violet-400 hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
};

export default SignupPage;
