
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";

import {
  House,
  Person,
  Magnifier,
  Envelope,
  Gear,
  Bookmark,
  CreditCard,
  Briefcase,
} from "@gravity-ui/icons";

const sidebarLinks = {
  seeker: [
    {
      icon: House,
      label: "Dashboard",
      href: "/dashboard/seeker",
    },
    {
      icon: Magnifier,
      label: "Browse Jobs",
      href: "/dashboard/seeker/jobs",
    },
    {
      icon: Bookmark,
      label: "Saved Jobs",
      href: "/dashboard/seeker/saved-jobs",
    },
    {
      icon: Envelope,
      label: "Applications",
      href: "/dashboard/seeker/applications",
    },
    {
      icon: CreditCard,
      label: "Billing",
      href: "/dashboard/seeker/billing",
    },
    {
      icon: Gear,
      label: "Settings",
      href: "/dashboard/seeker/settings",
    },
  ],

  recruiter: [
    {
      icon: House,
      label: "Dashboard",
      href: "/dashboard/recruiter",
    },
    {
      icon: Briefcase,
      label: "Jobs",
      href: "/dashboard/recruiter/jobs",
    },
    {
      icon: PlusIcon,
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
  ],

  admin: [
    {
      icon: House,
      label: "Dashboard",
      href: "/dashboard/admin",
    },
    {
      icon: Person,
      label: "Users",
      href: "/dashboard/admin/users",
    },
    {
      icon: Building2Icon,
      label: "Companies",
      href: "/dashboard/admin/companies",
    },
    {
      icon: Briefcase,
      label: "Jobs",
      href: "/dashboard/admin/jobs",
    },
    {
      icon: CreditCard,
      label: "Payments",
      href: "/dashboard/admin/payments",
    },
    {
      icon: Gear,
      label: "Settings",
      href: "/dashboard/admin/settings",
    },
  ],
};

// Small icon components using existing Gravity UI icons.
function PlusIcon(props) {
  return <Briefcase {...props} />;
}

function Building2Icon(props) {
  return <Person {...props} />;
}

const RoleBasedSidebar = () => {
  const pathname = usePathname();

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;
  const role = user?.role;

  if (isPending) {
    return (
      <aside className="w-64 rounded-xl border border-white/10 bg-[#222222] p-5">
        <p className="text-sm text-gray-400">
          Loading sidebar...
        </p>
      </aside>
    );
  }

  if (!user || !sidebarLinks[role]) {
    return null;
  }

  const navItems = sidebarLinks[role];

  const isActiveLink = (href) => {
    // Exact dashboard route.
    if (href === `/dashboard/${role}`) {
      return pathname === href;
    }

    // Exact route or nested route.
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <aside className="flex min-h-screen w-64 shrink-0 flex-col border-r border-white/10 bg-[#1b1b1b] px-5 py-5">

      {/* Sidebar Header */}
      <div className="mb-6">
        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <p className="truncate text-sm font-semibold text-white">
            {user.name || "User"}
          </p>

          <p className="mt-1 truncate text-xs text-gray-400">
            {user.email}
          </p>

          <p className="mt-2 text-xs capitalize text-gray-500">
            {role} Panel
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = isActiveLink(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`group flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm transition-all duration-200 ${
                isActive
                  ? "bg-indigo-500/15 font-medium text-indigo-400"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={18} />

              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="mt-auto border-t border-white/10 pt-5">
        <p className="text-xs text-gray-500">
          Logged in as
        </p>

        <p className="mt-1 truncate text-sm text-white">
          {user.name || user.email}
        </p>

        <p className="mt-1 text-[11px] capitalize text-gray-500">
          {role}
        </p>
      </div>
    </aside>
  );
};

export default RoleBasedSidebar;
