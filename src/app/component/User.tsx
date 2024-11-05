"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

function User() {
  const { user, isSignedIn } = useUser();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="w-full">
          <Button className="bg-gray-800 text-white hover:text-black py-8 mt-8 flex justify-between items-center w-full">
            Account
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={user?.imageUrl} alt="@shadcn" />
              </Avatar>
              <ChevronDown />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-full">
          {!isSignedIn ? (
            <div>
              <Link href="/sign-in">
                <DropdownMenuItem>Log in</DropdownMenuItem>
              </Link>
              <Link href="/sign-up">
                <DropdownMenuItem>Sign Up</DropdownMenuItem>
              </Link>
            </div>
          ) : (
            <div>
              <DropdownMenuItem>
                <Link href="/dashboard">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/profile">Change Profile</Link>
              </DropdownMenuItem>
              <Link href={"/profile"}>
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </Link>
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default User;
