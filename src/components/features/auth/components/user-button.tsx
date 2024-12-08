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
import { Loader, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import UseCurrentUser from "../api/use-current-user";
import { coder_avatar } from "../../../../../public/images";
import Image from "next/image";

const UserButton = () => {
  const [isPending, setIsPending] = useState(false);
  const { currentUser, isLoading: userLoading } = UseCurrentUser();
  const { signOut } = useAuthActions();
  const router = useRouter();

  const handleSignOut = useCallback(async () => {
    setIsPending(true);
    try {
      await signOut();
      router.push("/auth");
    } catch (error) {
      console.error("Sign out failed:", error);
    } finally {
      setIsPending(false);
    }
  }, [signOut, router]);

  return (
    <DropdownMenu>
      {/* Avatar Button */}
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full p-0 hover:bg-primary/10 focus-visible:ring-0"
        >
          {userLoading ? (
            <div className="size-10 rounded-full bg-gray-800 ">
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
        className="w-60 p-2 bg-white shadow-md rounded-lg border border-gray-200"
        align="center"
        side="bottom"
      >
        {/* User Info */}
        <div className="flex items-center space-x-3 px-3 py-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src={currentUser?.image} alt={currentUser?.name} />
            <AvatarFallback className="bg-zinc-600 text-white font-bold">
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
        <div className="border-t border-gray-200 my-2" />

        <DropdownMenuItem className="hover:bg-gray-100 rounded-md">
          <span className="text-sm">Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-gray-100 rounded-md">
          <span className="text-sm">Settings</span>
        </DropdownMenuItem>

        <div className="border-t border-gray-200 my-2" />

        {/* Sign Out Button */}
        <DropdownMenuItem className="focus:bg-none dark:focus:bg-none">
          <Button
            onClick={handleSignOut}
            variant="outline"
            size="sm"
            className="w-full"
            disabled={userLoading || isPending}
          >
            {isPending ? (
              <Loader className="animate-spin h-4 w-4" />
            ) : (
              <LogOut className="h-4 w-4" />
            )}
            <span className="ml-2 text-sm">Sign Out</span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserButton;
