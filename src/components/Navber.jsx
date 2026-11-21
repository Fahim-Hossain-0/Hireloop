"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

const Navber = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const router = useRouter();

  // Better Auth session
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const navLinks = [
    { name: "Browse Jobs", href: "/jobs" },
    { name: "Company", href: "/company" },
    { name: "Pricing", href: "/plans" },
  ];

  const dashboardRoutes = {
  admin: "/dashboard/admin",
  recruiter: "/dashboard/recruiter",
  seeker: "/dashboard/seeker",
};

const dashboardPath =
  dashboardRoutes[user?.role] || "/";

  // Logout function
  const handleLogout = async () => {
    try {
      setLoggingOut(true);

      await authClient.signOut();

      setIsOpen(false);
      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <header className="w-full bg-[#1b1b1b] px-4 py-4 sm:px-6">
      <nav className="relative mx-auto max-w-6xl rounded-xl bg-[#222222] px-4 py-3 sm:px-6">
        {/* Top Navbar */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight"
            onClick={() => setIsOpen(false)}
          >
            <span className="text-[#168bff]">hire</span>
            <span className="text-orange-500">l</span>
            <span className="text-orange-500">oo</span>
            <span className="text-[#168bff]">p</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs text-gray-300 transition hover:text-white"
              >
                {link.name}
              </Link>
            ))}

            <div className="h-5 w-px bg-gray-700" />

            {/* Session Loading */}
            {isPending ? (
              <span className="text-xs text-gray-400">
                Loading...
              </span>
            ) : user ? (
              <>
                {/* Logged In */}
                <Link
                  href="/"
                  className="text-sm text-gray-200 transition hover:text-white"
                >
                  {user.name || "My Account"}
                </Link>

               
                  <Link
                  
                  href={dashboardPath}
                  size="sm"
                  className="bg-white/10 text-xs p-2 rounded-lg text-white hover:bg-white/20"
                >
                  Dashboard
                </Link>
                

                <Button
                  size="sm"
                  isDisabled={loggingOut}
                  onPress={handleLogout}
                  className="bg-red-500/10 text-xs text-red-400 hover:bg-red-500/20"
                >
                  {loggingOut ? "Logging out..." : "Log Out"}
                </Button>
              </>
            ) : (
              <>
                {/* Logged Out */}
                <Link
                  href="/login"
                  className="text-xs text-indigo-400 hover:text-indigo-300"
                >
                  Log In
                </Link>

               <Link
  href="/signup"
  className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 text-xs font-medium text-white transition hover:opacity-90"
>
  Get Started
</Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-700 text-white md:hidden"
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6l12 12M18 6L6 18"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="mt-4 flex flex-col gap-4 border-t border-gray-700 pt-4 md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm text-gray-300 transition hover:text-white"
              >
                {link.name}
              </Link>
            ))}

            <div className="border-t border-gray-700 pt-4">
              {isPending ? (
                <p className="text-sm text-gray-400">
                  Loading session...
                </p>
              ) : user ? (
                <div className="flex flex-col gap-3">
                  <p className="text-sm text-gray-300">
                    Welcome, {user.name || "User"}
                  </p>

                  <Link
                    as={Link}
                    href={dashboardPath}
                    onPress={() => setIsOpen(false)}
                    className="w-full bg-white/10 text-white"
                  >
                    Dashboard
                  </Link>

                  <Button
                    isDisabled={loggingOut}
                    onPress={handleLogout}
                    className="w-full bg-red-500/10 text-red-400"
                  >
                    {loggingOut ? "Logging out..." : "Log Out"}
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="text-sm text-indigo-400 hover:text-indigo-300"
                  >
                    Log In
                  </Link>

                  <Link
  href="/signup"
  onClick={() => setIsOpen(false)}
  className="inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
>
  Get Started
</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navber;