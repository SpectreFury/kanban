"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";

const KanbanDashboard = () => {
  const router = useRouter();

  const signOut = async () => {
    await authClient.signOut();

    router.push("/login");
  };

  return (
    <main>
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

        <div className="flex items-center justify-center">
          <Card className="w-96">
            <CardHeader>
              <div className="text-lg font-sans">Add a new project</div>
            </CardHeader>
            <CardContent>
              <div>
                <div>Twitter Clone</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default KanbanDashboard;
