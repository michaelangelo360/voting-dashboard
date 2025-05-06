// src/components/layout/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  ChartBarIcon,
  CheckCircleIcon,
  CogIcon,
  HomeIcon,
  GroupIcon,
  UserIcon,
  VoteIcon,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
}

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

const sidebarItems: SidebarItem[] = [
  {
    title: "Overview",
    href: "/overview",
    icon: HomeIcon,
  },
  {
    title: "Votes",
    href: "/votes",
    icon: VoteIcon,
  },
  {
    title: "Candidates",
    href: "/candidates",
    icon: CheckCircleIcon,
  },
  {
    title: "Results",
    href: "/results",
    icon: ChartBarIcon,
  },
  {
    title: "Users",
    href: "/users",
    icon: GroupIcon,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: CogIcon,
  },
];

export function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-background border-r transform transition-transform duration-200 ease-in-out md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center p-4 h-16 border-b">
          <Link href="/overview" className="flex items-center gap-2">
            <span className="font-bold text-xl">VoteDash</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center py-2 px-3 rounded-md text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              <UserIcon className="h-4 w-4" />
            </div>
            <div>
              <div className="font-medium text-sm">Admin User</div>
              <div className="text-xs text-muted-foreground">admin@example.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}