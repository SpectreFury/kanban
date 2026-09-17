import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  FolderKanban,
  Columns3,
  GripVertical,
  ShieldCheck,
  Layers,
  Zap,
  Save,
  ArrowRight,
  Check,
  CircleDashed,
  Loader,
  CircleCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Layers,
    title: "Unlimited projects",
    description:
      "Create a dedicated workspace for every idea. Name a project and get a fresh board in seconds — all listed on your personal dashboard.",
  },
  {
    icon: Columns3,
    title: "Flexible columns",
    description:
      "Model any workflow with custom columns. To Do, In Progress, Done — or your own stages, ordered exactly how you work.",
  },
  {
    icon: GripVertical,
    title: "Drag & drop tasks",
    description:
      "Move tasks between columns as work progresses. Reorder inside a column or across the board.",
  },
  {
    icon: Zap,
    title: "Priority labels",
    description:
      "Scan what matters at a glance. Every task carries a visual priority label so urgent work never hides in the pile.",
  },
  {
    icon: Save,
    title: "Always saved",
    description:
      "Your boards persist to Postgres. Hit save and pick up exactly where you left off — on any device, any time.",
  },
  {
    icon: ShieldCheck,
    title: "Private & secure",
    description:
      "Email authentication with session management. Only you can see your projects — every board is scoped to your account.",
  },
];

const steps = [
  {
    step: "01",
    title: "Create your account",
    description: "Sign up with email and password in under a minute.",
  },
  {
    step: "02",
    title: "Start a project",
    description: "Name it, open it, and your board is ready to go.",
  },
  {
    step: "03",
    title: "Drag, drop, done",
    description: "Add tasks, move them across columns, and save.",
  },
];

const previewColumns = [
  {
    name: "To do",
    icon: CircleDashed,
    tasks: [
      { text: "Design landing page", tag: "High", tagClass: "bg-red-500/10 text-red-600 dark:text-red-400" },
      { text: "Write project brief", tag: "Medium", tagClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
    ],
  },
  {
    name: "In progress",
    icon: Loader,
    tasks: [
      { text: "Build kanban board", tag: "High", tagClass: "bg-red-500/10 text-red-600 dark:text-red-400" },
      { text: "Wire up auth", tag: "Done", tagClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
    ],
  },
  {
    name: "Done",
    icon: CircleCheck,
    tasks: [{ text: "Create project", tag: "Low", tagClass: "bg-sky-500/10 text-sky-600 dark:text-sky-400" }],
  },
];

const Home = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) {
    return redirect("/kanban");
  }

  return (
    <main className="flex min-h-svh flex-col bg-background text-foreground">
      {/* Nav */}
      <div className="sticky top-0 z-10 border-b bg-card/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center rounded-lg bg-violet-400/10 p-1.5">
              <FolderKanban className="h-5 w-5 text-violet-400" />
            </div>
            <span className="text-lg font-semibold tracking-tight">Kanban</span>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#features" className="transition-colors hover:text-foreground">
              Features
            </a>
            <a href="#how-it-works" className="transition-colors hover:text-foreground">
              How it works
            </a>
            <a href="#preview" className="transition-colors hover:text-foreground">
              Preview
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className={cn(buttonVariants({ size: "sm" }), "gap-1.5")}
            >
              Get started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-0"
        >
          <div className="absolute left-1/2 top-[-320px] h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-muted/70 blur-3xl dark:bg-muted/40" />
          <div className="absolute inset-x-0 top-0 mx-auto h-px max-w-7xl bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-4 pb-14 pt-16 text-center sm:px-6 sm:pt-24 lg:px-8">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Projects · Columns · Drag &amp; drop tasks
          </div>

          <h1 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            Manage your work with ease.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
            A minimal kanban workspace for personal projects. Create boards,
            drag tasks across columns, and keep every idea moving forward.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/signup" className={cn(buttonVariants({ size: "lg" }), "w-full gap-2 sm:w-auto")}>
              Start for free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/login"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-auto")}
            >
              Log in to your boards
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-500" /> No credit card
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-500" /> Email auth included
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-500" /> Auto-saved boards
            </span>
          </div>

          {/* Board preview */}
          <div id="preview" className="mx-auto mt-12 max-w-5xl scroll-mt-20 text-left sm:mt-16">
            <div className="overflow-hidden rounded-2xl border bg-card shadow-xl shadow-foreground/[0.04]">
              <div className="flex items-center justify-between border-b bg-muted/50 px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-border" />
                    <span className="h-2.5 w-2.5 rounded-full bg-border" />
                    <span className="h-2.5 w-2.5 rounded-full bg-border" />
                  </div>
                  <span className="ml-2 hidden text-xs text-muted-foreground sm:inline">
                    kanban / Website redesign
                  </span>
                </div>
                <Button size="xs" variant="secondary" className="pointer-events-none gap-1.5">
                  <Save className="h-3 w-3" />
                  Save changes
                </Button>
              </div>

              <div className="grid gap-3 bg-background p-4 sm:grid-cols-3 sm:p-5">
                {previewColumns.map((col) => (
                  <div
                    key={col.name}
                    className="rounded-xl border bg-muted/40 p-2.5"
                  >
                    <div className="flex items-center justify-between px-1.5 pb-2 pt-1">
                      <span className="inline-flex items-center gap-1.5 text-[13px] font-medium">
                        <col.icon className="h-3.5 w-3.5 text-muted-foreground" />
                        {col.name}
                      </span>
                      <span className="rounded-md bg-background px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground ring-1 ring-border">
                        {col.tasks.length}
                      </span>
                    </div>
                    <Separator />
                    <div className="mt-2.5 flex flex-col gap-2">
                      {col.tasks.map((task) => (
                        <div
                          key={task.text}
                          className="group rounded-lg border bg-card p-3 shadow-sm"
                        >
                          <p className="text-[13px] font-medium leading-snug">
                            {task.text}
                          </p>
                          <div className="mt-2.5 flex items-center justify-between">
                            <span
                              className={cn(
                                "rounded-full px-2 py-0.5 text-[11px] font-medium",
                                task.tagClass
                              )}
                            >
                              {task.tag}
                            </span>
                            <GripVertical className="h-3.5 w-3.5 text-muted-foreground/50" />
                          </div>
                        </div>
                      ))}
                      <div className="rounded-lg border border-dashed bg-transparent p-2.5 text-center text-xs text-muted-foreground">
                        + Add task
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              A glimpse of the real board — columns, tasks, priorities and drag-and-drop.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="scroll-mt-16 border-t bg-card/40">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Features
            </p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Everything you need, nothing you don&apos;t
            </h2>
            <p className="mt-3 text-balance text-sm leading-relaxed text-muted-foreground sm:text-base">
              Built around the core loop of real kanban apps in this codebase —
              projects, columns, tasks and secure access.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Card key={f.title} className="transition-colors hover:border-foreground/20">
                <CardHeader>
                  <div className="mb-1 flex h-9 w-9 items-center justify-center rounded-lg border bg-background shadow-sm">
                    <f.icon className="h-4 w-4" />
                  </div>
                  <CardTitle className="text-[15px]">{f.title}</CardTitle>
                  <CardDescription className="leading-relaxed">
                    {f.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="scroll-mt-16 border-t">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                How it works
              </p>
              <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                From signup to shipped in three steps
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                The whole app is designed around one fast flow: authenticate,
                open your dashboard, and organize work visually.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href="/signup" className={cn(buttonVariants({ size: "lg" }), "gap-2")}>
                  Create account
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/login" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
                  Explore demo
                </Link>
              </div>
            </div>

            <Card>
              <CardContent className="flex flex-col divide-y p-0">
                {steps.map((s) => (
                  <div key={s.step} className="flex gap-4 p-5 sm:p-6">
                    <span className="font-mono text-sm font-semibold text-muted-foreground">
                      {s.step}
                    </span>
                    <div>
                      <h3 className="text-[15px] font-semibold tracking-tight">
                        {s.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {s.description}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border bg-primary px-6 py-12 text-center text-primary-foreground sm:px-12 sm:py-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 30%, white 1px, transparent 1px), radial-gradient(circle at 40% 80%, white 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />
            <div className="relative">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-primary-foreground/10 ring-1 ring-primary-foreground/20">
                <FolderKanban className="h-5 w-5" />
              </div>
              <h2 className="mx-auto mt-5 max-w-xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Ready to organize your next project?
              </h2>
              <p className="mx-auto mt-3 max-w-md text-balance text-sm opacity-70 sm:text-base">
                Join Kanban, create your first board, and move your first task
                to done today.
              </p>
              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/signup"
                  className={cn(
                    buttonVariants({ size: "lg", variant: "secondary" }),
                    "w-full gap-2 sm:w-auto"
                  )}
                >
                  Get started free
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex h-9 items-center justify-center rounded-lg px-4 text-sm font-medium underline-offset-4 hover:underline"
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center rounded-md bg-violet-400/10 p-1">
              <FolderKanban className="h-3.5 w-3.5 text-violet-400" />
            </div>
            <span className="font-medium text-foreground">Kanban</span>
            <span>· Manage your work with ease</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="transition-colors hover:text-foreground">
              Log in
            </Link>
            <Link href="/signup" className="transition-colors hover:text-foreground">
              Sign up
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Home;
