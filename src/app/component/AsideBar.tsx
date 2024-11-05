"use client"
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Menu,
  LayoutDashboard,
  Lightbulb,
  DollarSign,
  UserCircle,
  LogOut,
  CloudLightning,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import User from "@/app/component/User";
import { useUser } from "@clerk/nextjs";

export function SheetDemo() {
  const { isSignedIn } = useUser();

  return (
    <Sheet>
      <SheetTrigger asChild className="fixed m-5 left-5 z-10">
        <Button variant="outline">
          <Menu /> Menu
        </Button>
      </SheetTrigger>
      <SheetContent className="p-5 w-64 bg-gray-900 text-white">
        <SheetHeader>
          <SheetTitle>
            <User />
          </SheetTitle>
          <Separator className="my-4" />
        </SheetHeader>

        {/* Sidebar Menu */}
        <div className="flex flex-col gap-4 mt-4">
          <Link href="/">
            <Button
              variant="ghost"
              className="w-full flex items-center gap-2  text-white hover:bg-gray-700 justify-start "
            >
              <LayoutDashboard size={18} /> Dashboard
            </Button>
          </Link>
          <Link href={isSignedIn? "/ideas" : "/sign-up"}>
            <Button
              variant="ghost"
              className="w-full flex items-center gap-2 text-left text-white hover:bg-gray-700 justify-start "
            >
              <Lightbulb size={18} /> Your Ideas
            </Button>
          </Link>
          <Link href="/calendar">
            <Button
              variant="ghost"
              className="w-full flex items-center gap-2 text-left text-white hover:bg-gray-700 justify-start "
            >
              <DollarSign size={18} /> Manage Subscription
            </Button>
          </Link>
          <Link href="/ideaHunt">
            <Button
              variant="ghost"
              className="w-full flex items-center gap-2 text-left text-white hover:bg-gray-700 justify-start "
            >
              <CloudLightning size={18} /> Validate Idea
            </Button>
          </Link>
          <Link href="/profile">
            <Button
              variant="ghost"
              className="w-full flex items-center gap-2 text-left text-white hover:bg-gray-700 justify-start "
            >
              <UserCircle size={18} /> Edit profile
            </Button>
          </Link>
          <Link href="/settings">
            <Button
              variant="ghost"
              className="w-full flex items-center gap-2 text-left text-white hover:bg-gray-700 justify-start "
            >
              <LogOut size={18} /> Logout
            </Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
