
import React from "react";
import { getCompanies } from "@/lib/api/companies";
import { Building2, Clock } from "lucide-react";
import CompaniesTable from "./CompaniesTable";
import { getUserSession } from "@/lib/core/session";

const CompaniesPage = async () => {
  const user = getUserSession()
  const result = await getCompanies();
  const companies = Array.isArray(result) ? result : [];

  const pendingCompanies = companies.filter(
    (company) => company.status === "pending"
  ).length;

  const underReviewCompanies = companies.filter(
  (company) => company.status === "underReview"
).length;

const rejectedCompanies = companies.filter(
  (company) => company.status === "rejected"
).length;

  return (
    <div className="space-y-7 text-white">

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold">
          Company Management
        </h1>

        <p className="mt-2 text-sm text-gray-400">
          Manage, review, and monitor registered companies.
        </p>
      </div>

      {/* Statistics */}
     {/* Statistics */}
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

  {/* Total Companies */}
  <div className="rounded-xl border border-[#303030] bg-[#191919] p-5">
    <div className="flex items-center justify-between">
      <p className="text-sm text-gray-400">Total Companies</p>
      <Building2 size={20} className="text-blue-400" />
    </div>

    <h2 className="mt-3 text-3xl font-semibold">
      {companies.length}
    </h2>
  </div>

  {/* Pending Reviews */}
  <div className="rounded-xl border border-[#303030] bg-[#191919] p-5">
    <div className="flex items-center justify-between">
      <p className="text-sm text-gray-400">Pending Reviews</p>
      <Clock size={20} className="text-amber-400" />
    </div>

    <h2 className="mt-3 text-3xl font-semibold">
      {pendingCompanies}
    </h2>
  </div>

  {/* Under Review */}
  <div className="rounded-xl border border-[#303030] bg-[#191919] p-5">
    <div className="flex items-center justify-between">
      <p className="text-sm text-gray-400">Under Review</p>
      <Clock size={20} className="text-blue-400" />
    </div>

    <h2 className="mt-3 text-3xl font-semibold">
      {underReviewCompanies}
    </h2>
  </div>

  {/* Rejected */}
  <div className="rounded-xl border border-[#303030] bg-[#191919] p-5">
    <div className="flex items-center justify-between">
      <p className="text-sm text-gray-400">Rejected Companies</p>
      <Building2 size={20} className="text-red-400" />
    </div>

    <h2 className="mt-3 text-3xl font-semibold">
      {rejectedCompanies}
    </h2>
  </div>

</div>

      {/* Companies Table */}
      <CompaniesTable companies={companies} />

    </div>
  );
};

export default CompaniesPage;
