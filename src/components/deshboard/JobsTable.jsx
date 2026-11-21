
"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";

import {
  Magnifier,
  Pencil,
  TrashBin,
  Eye,
} from "@gravity-ui/icons";

import { Input, Button } from "@heroui/react";

const JobsTable = ({ jobs = [] }) => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  // Search and filter jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        job.title?.toLowerCase().includes(searchValue) ||
        job.category?.toLowerCase().includes(searchValue);

      const matchesStatus =
        status === "all" || job.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [jobs, search, status]);

  // Format salary
  const formatSalary = (salary) => {
    if (!salary) return "Negotiable";

    const currency = salary.currency || "";
    const min = Number(salary.min || 0).toLocaleString();
    const max = Number(salary.max || 0).toLocaleString();

    return `${currency} ${min} - ${max}`;
  };

  // Format location
  const formatLocation = (location) => {
    if (location?.isRemote) return "Remote";

    return (
      [location?.city, location?.country]
        .filter(Boolean)
        .join(", ") || "Not specified"
    );
  };

  // Status styles
  const getStatusStyle = (jobStatus) => {
    switch (jobStatus) {
      case "active":
        return "bg-green-500/10 text-green-400";

      case "draft":
        return "bg-yellow-500/10 text-yellow-400";

      case "closed":
        return "bg-red-500/10 text-red-400";

      default:
        return "bg-gray-500/10 text-gray-400";
    }
  };

  // Delete job
  const handleDelete = (jobId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmed) return;

    console.log("Delete job:", jobId);

    // TODO: Connect your delete API here
  };

  return (
    <div className="space-y-5">

      {/* Search and Filter */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

        <div className="w-full sm:max-w-sm">
          <Input
            placeholder="Search by job title or category..."
            value={search}
            onChange={setSearch}
            className="w-full"
            startContent={
              <Magnifier className="size-4 text-gray-400" />
            }
          />
        </div>

        <div className="w-full sm:w-48">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-10 w-full rounded-lg border border-[#444] bg-[#242424] px-3 text-sm text-white outline-none focus:border-white"
          >
            <option value="all">All Jobs</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Jobs Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">
          Showing{" "}
          <span className="font-semibold text-white">
            {filteredJobs.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-white">
            {jobs.length}
          </span>{" "}
          jobs
        </p>
      </div>

      {/* Jobs Table */}
      <div className="overflow-x-auto rounded-xl border border-[#353535] bg-[#1c1c1c]">

        <table className="w-full min-w-[1050px] text-left">

          {/* Table Header */}
          <thead className="border-b border-[#353535] bg-[#242424]">
            <tr className="text-xs font-semibold tracking-wider text-gray-400">

              <th className="px-5 py-4">JOB TITLE</th>
              <th className="px-5 py-4">CATEGORY</th>
              <th className="px-5 py-4">JOB TYPE</th>
              <th className="px-5 py-4">VACANCIES</th>
              <th className="px-5 py-4">SALARY</th>
              <th className="px-5 py-4">LOCATION</th>
              <th className="px-5 py-4">DEADLINE</th>
              <th className="px-5 py-4">STATUS</th>
              <th className="px-5 py-4">ACTIONS</th>

            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-[#353535]">

            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (

                <tr
                  key={job._id}
                  className="transition-colors hover:bg-[#252525]"
                >

                  {/* Job Title */}
                  <td className="px-5 py-4">
                    <div className="min-w-40">
                      <p className="font-semibold text-white">
                        {job.title}
                      </p>

                      <p className="mt-1 text-xs capitalize text-gray-500">
                        {job.experienceLevel || "Not specified"}
                      </p>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-5 py-4">
                    <span className="capitalize text-gray-300">
                      {job.category || "N/A"}
                    </span>
                  </td>

                  {/* Job Type */}
                  <td className="px-5 py-4">
                    <span className="whitespace-nowrap capitalize text-gray-300">
                      {job.jobType?.replaceAll("-", " ") || "N/A"}
                    </span>
                  </td>

                  {/* Vacancies */}
                  <td className="px-5 py-4 text-gray-300">
                    {job.vacancies ?? "N/A"}
                  </td>

                  {/* Salary */}
                  <td className="whitespace-nowrap px-5 py-4 text-gray-300">
                    {formatSalary(job.salary)}
                  </td>

                  {/* Location */}
                  <td className="whitespace-nowrap px-5 py-4 text-gray-300">
                    {formatLocation(job.location)}
                  </td>

                  {/* Deadline */}
                  <td className="whitespace-nowrap px-5 py-4 text-gray-300">
                    {job.deadline
                      ? new Date(
                          `${job.deadline}T00:00:00`
                        ).toLocaleDateString()
                      : "Not specified"}
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${getStatusStyle(
                        job.status
                      )}`}
                    >
                      {job.status || "Unknown"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">

                      {/* View */}
                      <Link
                        href={`/dashboard/recruiter/jobs/${job._id}`}
                      >
                        <Button
                          isIconOnly
                          size="sm"
                          variant="secondary"
                          aria-label="View job"
                        >
                          <Eye className="size-4" />
                        </Button>
                      </Link>

                      {/* Edit */}
                      <Link
                        href={`/dashboard/recruiter/jobs/edit/${job._id}`}
                      >
                        <Button
                          isIconOnly
                          size="sm"
                          variant="secondary"
                          aria-label="Edit job"
                        >
                          <Pencil className="size-4" />
                        </Button>
                      </Link>

                      {/* Delete */}
                      <Button
                        isIconOnly
                        size="sm"
                        variant="danger"
                        aria-label="Delete job"
                        onPress={() => handleDelete(job._id)}
                      >
                        <TrashBin className="size-4" />
                      </Button>

                    </div>
                  </td>

                </tr>
              ))
            ) : (

              <tr>
                <td
                  colSpan={9}
                  className="px-5 py-12 text-center text-sm text-gray-500"
                >
                  No jobs found.
                </td>
              </tr>

            )}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobsTable;
