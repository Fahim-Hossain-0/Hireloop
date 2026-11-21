import JobsPageContent from "@/components/jobs/JobsPageContent";
import { getJobs } from "@/lib/api/jobs";
// import JobsPageContent from "./JobsPageContent";

const JobsPage = async () => {
  const jobs = await getJobs();

  return <JobsPageContent jobs={jobs || []} />;
};

export default JobsPage;