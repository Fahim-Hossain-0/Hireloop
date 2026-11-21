
import Link from "next/link";
import { getApplicationByApplicant } from "@/lib/api/application";
import { getUserSession } from "@/lib/core/session";

const statusStyles = {
  pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  reviewed: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  accepted: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  rejected: "bg-red-500/10 text-red-400 border-red-500/20",
};

const ApplicationPage = async () => {
  const user = await getUserSession();

  const applications = await getApplicationByApplicant(user.id);

  const jobs = Array.isArray(applications)
    ? applications
    : applications
      ? [applications]
      : [];

  const pendingCount = jobs.filter(
    (job) => job.status === "pending"
  ).length;

  const reviewedCount = jobs.filter(
    (job) => job.status === "reviewed"
  ).length;

  const acceptedCount = jobs.filter(
    (job) => job.status === "accepted"
  ).length;

  return (
    <div className="min-h-screen bg-[#111111] p-4 text-white sm:p-6 lg:p-8">

      {/* Header */}
      <div className="mb-8">
        <p className="mb-2 text-sm text-indigo-400">
          Seeker Dashboard / Applications
        </p>

        <h1 className="text-3xl font-bold">
          My Applications
        </h1>

        <p className="mt-2 text-sm text-gray-400">
          Track your job applications and stay updated on your progress.
        </p>
      </div>

      {/* Statistics */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Applications"
          value={jobs.length}
          color="text-white"
        />

        <StatCard
          title="Pending"
          value={pendingCount}
          color="text-amber-400"
        />

        <StatCard
          title="Reviewed"
          value={reviewedCount}
          color="text-blue-400"
        />

        <StatCard
          title="Accepted"
          value={acceptedCount}
          color="text-emerald-400"
        />
      </div>

      {/* Applications */}
      <div className="rounded-2xl border border-white/10 bg-[#1b1b1b]">

        <div className="flex flex-col justify-between gap-3 border-b border-white/10 p-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-semibold">
              Recent Applications
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Your submitted job applications
            </p>
          </div>

          <Link
            href="/jobs"
            className="inline-flex items-center justify-center rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-600"
          >
            Browse Jobs
          </Link>
        </div>

        {jobs.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-3xl">
              💼
            </div>

            <h3 className="text-lg font-semibold">
              No applications yet
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm text-gray-400">
              You haven't applied to any jobs yet.
              Explore available opportunities and submit your first application.
            </p>

            <Link
              href="/jobs"
              className="mt-6 inline-flex rounded-lg bg-indigo-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-600"
            >
              Explore Jobs
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-white/10">
            {jobs.map((application) => {
              const status = application.status?.toLowerCase() || "pending";

              const statusClass =
                statusStyles[status] ||
                "bg-white/5 text-gray-400 border-white/10";

              return (
                <div
                  key={application._id}
                  className="p-5 transition hover:bg-white/[0.02] sm:p-6"
                >
                  {/* Job Information */}
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">

                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-lg font-bold text-indigo-400">
                        {application.companyName?.charAt(0) || "C"}
                      </div>

                      <div>
                        <h3 className="text-base font-semibold text-white">
                          {application.jobTitle}
                        </h3>

                        <p className="mt-1 text-sm text-gray-400">
                          {application.companyName}
                        </p>

                        <p className="mt-2 text-xs text-gray-500">
                          Applied on{" "}
                          {new Date(
                            application.appliedAt || application.createdAt
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Status */}
                    <span
                      className={`inline-flex w-fit items-center rounded-full border px-3 py-1.5 text-xs font-medium capitalize ${statusClass}`}
                    >
                      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-current" />
                      {status}
                    </span>
                  </div>

                  {/* Applicant Information */}
                  <div className="mt-5 grid grid-cols-1 gap-4 rounded-xl bg-white/[0.03] p-4 sm:grid-cols-2 lg:grid-cols-3">

                    <InfoItem
                      label="Applicant"
                      value={application.applicantName}
                    />

                    <InfoItem
                      label="Email"
                      value={application.applicantEmail}
                    />

                    <InfoItem
                      label="Phone"
                      value={application.applicantPhone}
                    />

                  </div>

                  {/* Application Details */}
                  <div className="mt-5 space-y-4">

                    <div>
                      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-500">
                        Cover Letter
                      </p>

                      <p className="line-clamp-3 text-sm leading-6 text-gray-300">
                        {application.coverLetter || "No cover letter provided."}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">

                      {application.resume && (
                        <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-gray-300">
                          📄 Resume Submitted
                        </div>
                      )}

                      {application.linkedin && (
                        <a
                          href={
                            Array.isArray(application.linkedin)
                              ? application.linkedin[0]
                              : application.linkedin
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-indigo-400 transition hover:bg-white/10"
                        >
                          LinkedIn Profile ↗
                        </a>
                      )}

                      {application.portfolio && (
                        <a
                          href={
                            Array.isArray(application.portfolio)
                              ? application.portfolio[0]
                              : application.portfolio
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-indigo-400 transition hover:bg-white/10"
                        >
                          Portfolio ↗
                        </a>
                      )}

                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">

                    <p className="text-xs text-gray-500">
                      Application ID: {application._id}
                    </p>

                    <Link
                      href={`/jobs/${application.jobId}`}
                      className="text-sm font-medium text-indigo-400 transition hover:text-indigo-300"
                    >
                      View Job Details →
                    </Link>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color }) => {
  return (
    <div className="rounded-xl border border-white/10 bg-[#1b1b1b] p-5">
      <p className="text-sm text-gray-400">
        {title}
      </p>

      <h3 className={`mt-3 text-3xl font-bold ${color}`}>
        {value}
      </h3>
    </div>
  );
};

const InfoItem = ({ label, value }) => {
  return (
    <div className="min-w-0">
      <p className="text-xs text-gray-500">
        {label}
      </p>

      <p className="mt-1 truncate text-sm font-medium text-gray-200">
        {value || "Not provided"}
      </p>
    </div>
  );
};

export default ApplicationPage;
