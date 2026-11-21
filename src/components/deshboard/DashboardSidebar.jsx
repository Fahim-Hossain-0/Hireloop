
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";

import {
  Bars,
  Bell,
  Envelope,
  Gear,
  House,
  Magnifier,
  Person,
} from "@gravity-ui/icons";

import { Button, Drawer } from "@heroui/react";


const navItems = [
  {
    icon: House,
    label: "Dashboard",
    href: "/dashboard/recruiter",
  },
  {
    icon: Person,
    label: "Jobs",
    href: "/dashboard/recruiter/jobs",
  },
  {
    icon: Magnifier,
    label: "Post A Job",
    href: "/dashboard/recruiter/jobs/new",
  },
  {
    icon: Person,
    label: "Company Profile",
    href: "/dashboard/recruiter/company",
  },
  
  {
    icon: Envelope,
    label: "Applications",
    href: "/recruiter/applications",
  },
 
  {
    icon: Gear,
    label: "Settings",
    href: "/recruiter/settings",
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const user = session?.user;

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-[#141414] text-white">

      {/* Logo */}
      <div className="flex h-[73px] items-center px-3">
        <Link href="/recruiter/dashboard" className="text-xl font-extrabold">
          HireLoop
        </Link>
      </div>

      {/* User Profile */}
      <div className="px-3 pb-8">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center overflow-hidden rounded-full bg-[#303030]">
            {user?.image ? (
              <img
                src={user.image}
                alt="Profile"
                className="size-full object-cover"
              />
            ) : (
              <Person className="size-4 text-gray-300" />
            )}
          </div>

          <div className="min-w-0">
            <p className="truncate text-[10px] font-semibold">
              {user?.name || "Recruiter"}
            </p>
            <p className="text-[9px] text-gray-500">
              Recruiter
            </p>
          </div>
        </div>

        <div className="mt-1 inline-block border border-[#444] px-1 py-0.5 text-[7px] font-semibold text-gray-400">
          PREMIUM ACCOUNT
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex h-[42px] items-center gap-3 border-r-2 px-4 text-[11px] transition-colors ${
                active
                  ? "border-white bg-[#292929] text-white"
                  : "border-transparent text-gray-400 hover:bg-[#242424] hover:text-white"
              }`}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[250px] border-r border-[#353535] lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      <div className="lg:hidden">
        <Drawer>
          <Button isIconOnly variant="ghost" aria-label="Open menu">
            <Bars className="size-5" />
          </Button>

          <Drawer.Backdrop>
            <Drawer.Content placement="left">
              <Drawer.Dialog className="h-full p-0">
                <Drawer.CloseTrigger />
                <Drawer.Body className="p-0">
                  <SidebarContent />
                </Drawer.Body>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
      </div>
    </>
  );
}
