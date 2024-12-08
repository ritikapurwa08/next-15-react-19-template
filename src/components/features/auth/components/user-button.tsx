"use client";

import React, { useState, useCallback } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Loader2Icon, LogOutIcon, UserIcon, SettingsIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import UseCurrentUser from "../api/use-current-user";
import { coder_avatar } from "../../../../../public/images";
import Image from "next/image";
import { toast } from "sonner";

const UserButton = () => {
  const [isPending, setIsPending] = useState(false);
  const { currentUser, isLoading: userLoading } = UseCurrentUser();
  const { signOut } = useAuthActions();
  const router = useRouter();

  const handleSignOut = useCallback(
    async (e: React.MouseEvent) => {
      // Prevent dropdown from closing
      e.preventDefault();
      e.stopPropagation();

      setIsPending(true);

      try {
        // Simulate a more realistic logout process with a delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        await signOut();

        // Success toast
        toast.success("Logged out successfully", {
          description: "We hope to see you again soon!",
          duration: 2000,
        });

        // Navigate after successful logout
        router.push("/auth");
      } catch (error) {
        // Error handling
        console.error("Sign out failed:", error);
        toast.error("Logout failed", {
          description: "Please try again or contact support.",
        });
      } finally {
        setIsPending(false);
      }
    },
    [signOut, router]
  );

  return (
    <DropdownMenu>
      {/* Avatar Button */}
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full p-0 hover:bg-primary/10 focus-visible:ring-0"
        >
          {userLoading ? (
            <div className="size-10 rounded-full bg-gray-800">
              <Image
                src={coder_avatar}
                alt="coder_avatar"
                height={40}
                width={40}
                className="overflow-hidden object-cover rounded-full size-auto"
              />
            </div>
          ) : (
            <Avatar className="h-10 w-10">
              <AvatarImage src={currentUser?.image} alt={currentUser?.name} />
              <AvatarFallback className="bg-zinc-600 text-white font-bold">
                {currentUser?.email?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
          )}
        </Button>
      </DropdownMenuTrigger>

      {/* Dropdown Menu */}
      <DropdownMenuContent
        className="w-64 p-2 bg-white shadow-lg rounded-xl border border-gray-200"
        align="end"
        side="bottom"
      >
        {/* User Info */}
        <div className="flex items-center space-x-3 px-3 py-3 border-b">
          <Avatar className="h-12 w-12">
            <AvatarImage src={currentUser?.image} alt={currentUser?.name} />
            <AvatarFallback className="bg-zinc-600 text-white font-bold text-lg">
              {currentUser?.email?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold">{currentUser?.name}</p>
            <p className="text-xs text-muted-foreground">
              {currentUser?.email}
            </p>
          </div>
        </div>

        {/* Dropdown Items */}
        <div className="py-1">
          <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 rounded-md px-3 py-2">
            <UserIcon className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 rounded-md px-3 py-2">
            <SettingsIcon className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Settings</span>
          </DropdownMenuItem>
        </div>

        {/* Sign Out Button */}
        <div className="border-t pt-1">
          <DropdownMenuItem
            className="focus:bg-none dark:focus:bg-none p-0"
            onSelect={(e) => e.preventDefault()}
          >
            <Button
              onClick={handleSignOut}
              variant="destructive"
              size="sm"
              className="w-full mt-2 mx-2"
              disabled={userLoading || isPending}
            >
              {isPending ? (
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <LogOutIcon className="mr-2 h-4 w-4" />
              )}
              {isPending ? "Logging out..." : "Sign Out"}
            </Button>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
