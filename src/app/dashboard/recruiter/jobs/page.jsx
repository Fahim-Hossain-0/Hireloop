import { Suspense } from "react";
import { getCompanyJobs } from "@/lib/api/jobs";
import JobsTable from "@/components/deshboard/JobsTable";
import { getLoggedInRecruiterCompany } from "@/lib/api/companies";

const JobsContent = async () => {
  const company = await getLoggedInRecruiterCompany();

  if (!company) {
    return (
      <p className="text-gray-400">
        Please register your company before managing jobs.
      </p>
    );
  }

  const jobs = await getCompanyJobs(company._id);

  return <JobsTable jobs={jobs} />;
};

const RecruiterJobs = () => {
  return (
    <div className="p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Manage Jobs
      </h2>

      <Suspense
        fallback={<p className="text-gray-400">Loading jobs...</p>}
      >
        <JobsContent />
      </Suspense>
    </div>
  );
};

export default RecruiterJobs;