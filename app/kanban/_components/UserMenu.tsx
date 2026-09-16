"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

const UserMenu = () => {
  const router = useRouter();

  const signOut = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-8 w-8">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback className="text-xs">KB</AvatarFallback>
      </Avatar>

      <Button
        variant="outline"
        size="sm"
        onClick={signOut}
        className="cursor-pointer gap-1.5 text-muted-foreground hover:text-foreground"
      >
        <LogOut className="h-4 w-4" />
        Log out
      </Button>
    </div>
  );
};

export default UserMenu;
