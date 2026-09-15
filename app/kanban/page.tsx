"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import ProjectCard from "./_components/ProjectCard";

const KanbanDashboard = () => {
  const router = useRouter();

  const signOut = async () => {
    await authClient.signOut();

    router.push("/login");
  };

  return (
    <main>
      <div className="border-b">
        <div className="py-2 mx-auto container">
          <nav className="flex items-center justify-between">
            <div className="text-lg">Kanban</div>

            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>KB</AvatarFallback>
              </Avatar>

              <Button
                variant="ghost"
                onClick={signOut}
                className="cursor-pointer"
              >
                Log out
              </Button>
            </div>
          </nav>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Card className="w-96">
          <CardHeader>
            <div className="text-lg font-medium font-sans">Your projects</div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <ProjectCard />
              <ProjectCard />
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default KanbanDashboard;
