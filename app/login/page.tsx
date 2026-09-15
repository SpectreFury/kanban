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

const formSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, "Password should be at least 8 characters")
    .max(32, "Password should be at most 32 characters"),
});

type FormSchema = z.infer<typeof formSchema>;

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: FormSchema) {
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onRequest: () => {
          // Loading

          setIsLoading(true);
        },

        onSuccess: () => {
          toast.add({
            title: "Logged in",
          });


          setIsLoading(false);
          router.replace("/kanban");
        },

        onError: () => {
          toast.add({
            title: "Unable to log in",
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
            Welcome back
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Log in to your Kanban workspace
          </p>
        </div>

        <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
          <form
            id="login-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col"
          >
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="login-form-email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="login-form-email"
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
                    <FieldLabel htmlFor="login-form-password">
                      Password
                    </FieldLabel>
                    <Input
                      {...field}
                      type="password"
                      id="login-form-password"
                      className="h-10"
                      aria-invalid={fieldState.invalid}
                      autoComplete="current-password"
                    />

                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Button type="submit" size="lg" className="w-full">
                {isLoading ? <Loader2 className="animate-spin" /> : "Log In"}
              </Button>
            </FieldGroup>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-violet-400 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
