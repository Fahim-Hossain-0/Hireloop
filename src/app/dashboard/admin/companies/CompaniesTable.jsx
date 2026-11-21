
"use client";

import React, { useState } from "react";
import {
  Building2,
  Search,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { updateCompanyStatus } from "@/lib/actions/companies";


const statusStyles = {
  pending: "bg-amber-500/10 text-amber-400",
  underReview: "bg-blue-500/10 text-blue-400",
  approved: "bg-green-500/10 text-green-400",
  rejected: "bg-red-500/10 text-red-400",
};

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "underReview", label: "Under Review" },
  { value: "approved", label: "Approve" },
  { value: "rejected", label: "Reject" },
];

const CompaniesTable = ({ companies = [] }) => {
  const [companyList, setCompanyList] = useState(companies);
  const [updatingId, setUpdatingId] = useState(null);

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const getInitials = (name) =>
    name?.split(" ").slice(0, 2).map((word) => word[0]).join("").toUpperCase() || "CO";

  // Update company status
  const handleStatusChange = async (companyId, newStatus) => {
    const previousCompanies = companyList;

    try {
      setUpdatingId(companyId);

      const result = await updateCompanyStatus(companyId, newStatus);

      if (!result || result.success === false) {
        throw new Error(result?.message || "Failed to update company status");
      }

      setCompanyList((prev) =>
        prev.map((company) =>
          company._id === companyId
            ? { ...company, status: newStatus }
            : company
        )
      );
    } catch (error) {
      console.error("Company status update error:", error);
      setCompanyList(previousCompanies);
      alert(error.message || "Something went wrong!");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-[#303030] bg-[#191919]">
      {companyList.length > 0 ? (
        <>
          <div className="border-b border-[#303030] px-5 py-5">
            <h2 className="font-medium">Registered Companies</h2>
            <p className="mt-1 text-xs text-gray-500">
              {companyList.length} companies registered on HireLoop
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left">
              <thead className="bg-[#252525]">
                <tr className="text-xs text-gray-400">
                  <th className="px-5 py-4 font-medium">Company Name</th>
                  <th className="px-5 py-4 font-medium">Recruiter Email</th>
                  <th className="px-5 py-4 font-medium">Industry</th>
                  <th className="px-5 py-4 font-medium">Status</th>
                  <th className="px-5 py-4 font-medium">Date Submitted</th>
                  <th className="px-5 py-4 font-medium">Update Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#292929]">
                {companyList.map((company) => {
                  const status = company.status || "pending";
                  const isUpdating = updatingId === company._id;

                  return (
                    <tr
                      key={company._id}
                      className="transition hover:bg-[#202020]"
                    >
                      <td className="px-5 py-5">
                        <div className="flex items-center gap-3">
                          {company.logo ? (
                            <img
                              src={company.logo}
                              alt={company.companyName}
                              className="size-9 rounded-lg bg-[#252525] object-cover"
                            />
                          ) : (
                            <div className="flex size-9 items-center justify-center rounded-lg bg-[#292929] text-xs font-semibold">
                              {getInitials(company.companyName)}
                            </div>
                          )}

                          <span className="text-sm font-medium">
                            {company.companyName}
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-5 text-sm text-gray-400">
                        {company.recruiterEmail || "Not available"}
                      </td>

                      <td className="px-5 py-5">
                        <span className="rounded-full bg-[#252525] px-3 py-1 text-xs text-gray-300">
                          {company.industry || "N/A"}
                        </span>
                      </td>

                      <td className="px-5 py-5">
                        <span
                          className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs ${
                            statusStyles[status] ||
                            "bg-gray-500/10 text-gray-400"
                          }`}
                        >
                          <span className="size-1.5 rounded-full bg-current" />
                          {status === "underReview"
                            ? "Under Review"
                            : status.charAt(0).toUpperCase() +
                              status.slice(1)}
                        </span>
                      </td>

                      <td className="px-5 py-5 text-sm text-gray-400">
                        {formatDate(company.createdAt)}
                      </td>

                      {/* Status Update */}
                      <td className="px-5 py-5">
                        <div className="flex items-center gap-2">
                          <select
                            value={status}
                            disabled={isUpdating}
                            onChange={(e) =>
                              handleStatusChange(
                                company._id,
                                e.target.value
                              )
                            }
                            className="rounded-lg border border-[#383838] bg-[#252525] px-3 py-2 text-xs text-white outline-none transition focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {statusOptions.map((option) => (
                              <option
                                key={option.value}
                                value={option.value}
                                className="bg-[#252525]"
                              >
                                {option.label}
                              </option>
                            ))}
                          </select>

                          {isUpdating && (
                            <Loader2
                              size={16}
                              className="animate-spin text-blue-400"
                            />
                          )}

                          {!isUpdating && (
                            <CheckCircle2
                              size={16}
                              className="text-gray-600"
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="border-t border-[#292929] px-5 py-4">
            <p className="text-xs text-gray-500">
              Showing {companyList.length} companies
            </p>
          </div>
        </>
      ) : (
        <div className="flex min-h-[380px] flex-col items-center justify-center px-6 py-12 text-center">
          <div className="mb-5 flex size-20 items-center justify-center rounded-2xl border border-[#353535] bg-[#252525]">
            <Building2 size={36} className="text-gray-500" />
          </div>

          <h2 className="text-xl font-semibold">No Companies Found</h2>

          <p className="mt-3 max-w-md text-sm leading-6 text-gray-400">
            There are no registered companies yet. When recruiters
            create their company profiles, they will appear here
            for your review and management.
          </p>

          <div className="mt-6 flex items-center gap-2 rounded-lg border border-[#353535] bg-[#222222] px-4 py-3 text-xs text-gray-400">
            <Search size={15} />
            Waiting for company registrations
          </div>
        </div>
      )}
    </div>
  );
};

export default CompaniesTable;