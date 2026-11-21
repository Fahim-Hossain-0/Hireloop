import React, { Suspense } from "react";

import CompanyProfile from "./CompanyProfile";
import { getUserSession } from "@/lib/core/session";
import { getRecruiterCompany } from "@/lib/api/companies";

async function CompanyPageContent() {
  const user = await getUserSession();

  if (!user?.id) {
    return (
      <div className="min-h-screen bg-[#111111] p-10 text-center text-gray-400">
        Please login to access your company profile.
      </div>
    );
  }

  const company = await getRecruiterCompany(user.id);

  return (
    <CompanyProfile
      recruiter={user}
      recruiterCompany={company}
    />
  );
}

export default function CompanyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#111111] p-10 text-center text-gray-400">
          Loading company profile...
        </div>
      }
    >
      <CompanyPageContent />
    </Suspense>
  );
}