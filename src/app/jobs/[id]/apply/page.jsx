
import { getJobById } from "@/lib/api/jobs";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import JobApply from "./JobApply";
import { getApplicationByApplicant } from "@/lib/api/application";
import Link from "next/link";
import { getPlanById } from "@/lib/api/plans";

const ApplyPage = async ({ params }) => {
  const { id } = await params;
  console.log(id)

  const user = await getUserSession();
  console.log(user)

  // Authentication check
  if (!user) {
    redirect(`/login?redirect=/jobs/${id}/apply`);
  }

  // Role check
  if (user.role !== "seeker") {
    return (
      <main className="min-h-screen bg-[#151515] text-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center bg-[#1c1c1c] border border-[#333] rounded-2xl p-10">
          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-red-500/10 flex items-center justify-center text-3xl">
            !
          </div>

          <h1 className="text-2xl font-bold mb-3">
            Access Restricted
          </h1>

          <p className="text-gray-400 text-sm leading-6 mb-7">
            Only job seekers can submit applications. Please log in with a
            job seeker account to continue.
          </p>

          <Link
            href="/jobs"
            className="inline-flex px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm font-semibold transition"
          >
            Explore Jobs
          </Link>
        </div>
      </main>
    );
  }

  // Fetch application and job data
  const [applications, job] = await Promise.all([
    getApplicationByApplicant(user.id),
    getJobById(id),
  ]);

  // Job not found
  if (!job) {
    return (
      <main className="min-h-screen bg-[#151515] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-3">
            Job Not Found
          </h1>

          <Link
            href="/jobs"
            className="text-indigo-400 hover:underline"
          >
            Browse available jobs
          </Link>
        </div>
      </main>
    );
  }

  // Get user's current plan
  const planId = user.plan || "seeker_Free";
  const plan = await getPlanById(planId);
  console.log("planId", planId)
  console.log('plan', plan)

  // Application limit
  const maxApplications = Number(plan?.maxApplicationPerMonth) || 3;
  const planName = plan?.name || "Free";

  // Application count
  const applicationCount = applications?.length || 0;

  // Remaining applications
  const remaining = Math.max(
    0,
    maxApplications - applicationCount
  );

  // Progress
  const progress = Math.min(
    100,
    (applicationCount / maxApplications) * 100
  );

  // Check application limit
  const limitReached = applicationCount >= maxApplications;

  // Debug information
  console.log("User plan:", user.plan);
  console.log("Fetched plan:", plan);
  console.log("Maximum applications:", maxApplications);
  console.log("Current applications:", applicationCount);

  return (
    <main className="min-h-screen bg-[#151515] text-white px-4 py-10 md:py-14">
      <div className="max-w-[1100px] mx-auto">

        {/* Header */}
        <div className="mb-9">
          <Link
            href={`/jobs/${id}`}
            className="text-sm text-gray-500 hover:text-indigo-400 transition"
          >
            ← Back to Job Details
          </Link>

          <div className="mt-6">
            <p className="text-xs font-semibold tracking-[3px] text-indigo-400 uppercase mb-3">
              HireLoop / Application Center
            </p>

            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Application <span className="text-indigo-400">Overview</span>
            </h1>

            <p className="text-gray-400 mt-3 text-sm max-w-xl">
              Manage your application quota and continue your journey
              toward your next career opportunity.
            </p>
          </div>
        </div>

        {/* Application Usage Card */}
        <section className="mb-8 bg-gradient-to-br from-[#222044] via-[#1b1b2e] to-[#171717] border border-indigo-500/20 rounded-2xl p-6 md:p-8">

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

            {/* Usage */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-green-400"></span>

                <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                  Your Application Usage
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold">
                {applicationCount}

                <span className="text-gray-500 text-lg font-medium">
                  {" "} / {maxApplications} Applications
                </span>
              </h2>

              <p className="text-sm text-gray-400 mt-2">
                {remaining > 0
                  ? `You have ${remaining} application${remaining > 1 ? "s" : ""} remaining.`
                  : "You've reached your application limit."}
              </p>
            </div>

            {/* Current Plan */}
            <div className="md:text-right">
              <span className="text-xs text-gray-400 uppercase tracking-wider">
                Current Plan
              </span>

              <div className="mt-2 flex items-center md:justify-end gap-2">
                <span className="text-2xl font-bold text-white">
                  {planName}
                </span>

                <span className="text-xs px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Active Plan
                </span>
              </div>
            </div>

          </div>

          {/* Progress */}
          <div className="mt-8">
            <div className="flex justify-between text-xs mb-3">
              <span className="text-gray-400">
                Application quota
              </span>

              <span className="text-indigo-300 font-semibold">
                {Math.round(progress)}% Used
              </span>
            </div>

            <div className="w-full h-2.5 bg-[#111] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 pt-6 border-t border-white/10">

            <p className="text-xs text-gray-400">
              Upgrade your plan to unlock more job applications.
            </p>

            <Link
              href="/plans"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm font-semibold transition"
            >
              Explore Plans
              <span>→</span>
            </Link>

          </div>
        </section>

        {/* Application Form / Limit Warning */}
        {limitReached ? (

          <section className="bg-[#1c1c1c] border border-[#353535] rounded-2xl p-8 md:p-12 text-center">

            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-6 text-3xl">
              !
            </div>

            <h2 className="text-2xl font-bold mb-3">
              Application Limit Reached
            </h2>

            <p className="text-sm text-gray-400 max-w-md mx-auto leading-6 mb-7">
              You've used all {maxApplications} applications available on your
              current plan. Upgrade your membership to apply for more
              opportunities.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3">

              <Link
                href="/plans"
                className="px-7 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm font-semibold transition"
              >
                Upgrade My Plan →
              </Link>

              <Link
                href="/jobs"
                className="px-7 py-3 bg-[#292929] hover:bg-[#333] border border-[#414141] rounded-lg text-sm font-semibold transition"
              >
                Browse Jobs
              </Link>

            </div>
          </section>

        ) : (

          <section>
            <div className="mb-6">
              <p className="text-xs text-indigo-400 uppercase tracking-widest font-semibold mb-2">
                Step 02 / Application
              </p>

              <h2 className="text-2xl font-bold">
                Apply for this position
              </h2>

              <p className="text-sm text-gray-400 mt-2">
                Complete your information and submit your application.
              </p>
            </div>

            <JobApply
              user={user}
              job={job}
              applicationCount={applicationCount}
              maxApplications={maxApplications}
            />
          </section>

        )}

        {/* Bottom Note */}
        <div className="mt-10 text-center">
          <p className="text-xs text-gray-600">
            Need help? Contact HireLoop support.
          </p>
        </div>

      </div>
    </main>
  );
};

export default ApplyPage;
