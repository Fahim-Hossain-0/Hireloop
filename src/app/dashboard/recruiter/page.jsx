
"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import {
  FileText,
  Person,
  Bell,
  House,
  Plus,
} from "@gravity-ui/icons";

const stats = [
  {
    title: "Total Job Posts",
    value: "48",
    icon: FileText,
  },
  {
    title: "Total Applicants",
    value: "1,284",
    icon: Person,
  },
  {
    title: "Active Jobs",
    value: "18",
    icon: Bell,
  },
  {
    title: "Jobs Closed",
    value: "32",
    icon: House,
  },
];

const applications = [
  {
    name: "Julianne Moore",
    role: "Senior Product Designer",
    date: "Oct 24, 2023",
    experience: "6 years",
    status: "Interviewing",
    initials: "JM",
  },
  {
    name: "Robert Downey",
    role: "Backend Engineer",
    date: "Oct 23, 2023",
    experience: "4 years",
    status: "New",
    initials: "RD",
  },
  {
    name: "Emma Stone",
    role: "Marketing Lead",
    date: "Oct 22, 2023",
    experience: "8 years",
    status: "Reviewing",
    initials: "ES",
  },
  {
    name: "Chris Pratt",
    role: "Product Manager",
    date: "Oct 21, 2023",
    experience: "5 years",
    status: "Rejected",
    initials: "CP",
  },
];

const companies = [
  {
    name: "Google Inc.",
    category: "Technology",
    location: "Mountain View",
    jobs: 24,
    icon: "G",
  },
  {
    name: "Meta Platforms",
    category: "Social Media",
    location: "Menlo Park",
    jobs: 18,
    icon: "M",
  },
  {
    name: "Stripe",
    category: "Fintech",
    location: "San Francisco",
    jobs: 12,
    icon: "S",
  },
  {
    name: "Tesla",
    category: "Automotive",
    location: "Austin",
    jobs: 31,
    icon: "T",
  },
];

const statusStyles = {
  Interviewing: "bg-green-500/15 text-green-400",
  New: "bg-gray-500/20 text-gray-300",
  Reviewing: "bg-amber-500/15 text-amber-400",
  Rejected: "bg-red-500/15 text-red-400",
};

const RecruiterDashboardHomePage = () => {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  if (isPending) {
    return (
      <div className="py-10 text-sm text-gray-400">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="relative space-y-9">

      {/* Welcome */}
      <section>
        <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
          Welcome back, {user?.name || "Recruiter"}
        </h1>
      </section>

      {/* Statistics Cards */}
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-lg border border-[#353535] bg-[#1c1c1c] p-4 transition hover:border-[#555]"
            >
              <div className="mb-4 flex size-9 items-center justify-center rounded-md bg-[#343434]">
                <Icon className="size-4 text-gray-200" />
              </div>

              <p className="text-[11px] text-gray-400">
                {stat.title}
              </p>

              <h2 className="mt-1 text-xl font-semibold text-white">
                {stat.value}
              </h2>
            </div>
          );
        })}
      </section>

      {/* Applications + Companies */}
      <section className="grid grid-cols-1 gap-3 xl:grid-cols-[minmax(0,1.8fr)_minmax(230px,0.9fr)]">

        {/* Recent Applications */}
        <div className="min-w-0">

          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">
              Recent Applications
            </h2>

            <Link
              href="/recruiter/applications"
              className="text-[10px] text-gray-300 transition hover:text-white"
            >
              View all
            </Link>
          </div>

          <div className="overflow-hidden rounded-lg border border-[#353535] bg-[#1c1c1c]">

            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px] text-left">
                <thead className="border-b border-[#353535] bg-[#222222]">
                  <tr className="text-[10px] text-gray-300">
                    <th className="px-3 py-4 font-medium">
                      Candidate Name
                    </th>
                    <th className="px-3 py-4 font-medium">
                      Role
                    </th>
                    <th className="px-3 py-4 font-medium">
                      Date Applied
                    </th>
                    <th className="px-3 py-4 font-medium">
                      Experience
                    </th>
                    <th className="px-3 py-4 font-medium">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {applications.map((application) => (
                    <tr
                      key={application.name}
                      className="border-b border-[#292929] last:border-0 transition hover:bg-[#252525]"
                    >
                      {/* Candidate */}
                      <td className="px-3 py-5">
                        <div className="flex items-center gap-2">
                          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#383838] text-[9px] font-semibold text-gray-200">
                            {application.initials}
                          </div>

                          <span className="whitespace-nowrap text-[10px] font-semibold text-gray-200">
                            {application.name}
                          </span>
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-3 py-5 text-[10px] text-gray-400">
                        {application.role}
                      </td>

                      <td className="whitespace-nowrap px-3 py-5 text-[10px] text-gray-400">
                        {application.date}
                      </td>

                      <td className="whitespace-nowrap px-3 py-5 text-[10px] text-gray-400">
                        {application.experience}
                      </td>

                      <td className="px-3 py-5">
                        <span
                          className={`whitespace-nowrap rounded-full px-2 py-1 text-[9px] font-medium ${
                            statusStyles[application.status]
                          }`}
                        >
                          {application.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Top Companies */}
        <div className="min-w-0">

          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">
              My Top Companies
            </h2>

            <Link
              href="/recruiter/company"
              className="text-[10px] text-gray-300 transition hover:text-white"
            >
              View all
            </Link>
          </div>

          <div className="rounded-lg border border-[#353535] bg-[#1c1c1c] p-3">

            <div className="space-y-2">
              {companies.map((company) => (
                <div
                  key={company.name}
                  className="flex items-center justify-between gap-2 rounded-md px-1 py-3 transition hover:bg-[#292929]"
                >
                  <div className="flex min-w-0 items-center gap-3">

                    <div className="flex size-9 shrink-0 items-center justify-center rounded-md border border-[#424242] bg-[#303030] text-sm font-bold text-gray-200">
                      {company.icon}
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-[10px] font-semibold text-gray-100">
                        {company.name}
                      </h3>

                      <p className="mt-1 truncate text-[8px] text-gray-500">
                        {company.category} · {company.location}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-[11px] font-semibold text-white">
                      {company.jobs}
                    </p>

                    <p className="mt-1 text-[7px] text-gray-400">
                      ACTIVE JOBS
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/recruiter/company"
              className="mt-2 flex h-9 w-full items-center justify-center rounded-md border border-[#393939] text-[10px] font-medium text-gray-300 transition hover:bg-[#303030] hover:text-white"
            >
              View All Companies
            </Link>
          </div>
        </div>
      </section>

      {/* Floating Add Button */}
      <Link
        href="/recruiter/jobs/new"
        aria-label="Create new job"
        className="fixed bottom-6 right-6 z-20 flex size-11 items-center justify-center rounded-full bg-white text-black shadow-lg transition hover:scale-110 hover:bg-gray-200"
      >
        <Plus className="size-5" />
      </Link>

    </div>
  );
};

export default RecruiterDashboardHomePage;
