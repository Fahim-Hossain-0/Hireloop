
import Link from "next/link";
import Image from "next/image";
import { getJobById } from "@/lib/api/jobs";
// import { getJobById } from "@/lib/api/jobs";

// Fix Next.js 16 Blocking Route error
export const instant = false;

const formatText = (value = "") => {
  if (typeof value !== "string") return value || "Not specified";

  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const formatDate = (date) => {
  if (!date) return "Not specified";

  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const JobDetailsPage = async ({ params }) => {
  const { id } = await params;

  const jobdata = await getJobById(id);

  if (!jobdata || jobdata.error) {
    return (
      <main className="min-h-screen bg-[#151515] text-white flex flex-col items-center justify-center gap-4 px-4">
        <h1 className="text-3xl font-bold">Job Not Found</h1>

        <p className="text-gray-400">
          This job may have been removed or is unavailable.
        </p>

        <Link
          href="/jobs"
          className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl transition"
        >
          Browse Jobs
        </Link>
      </main>
    );
  }

  const {
    _id,
    companyName,
    companyLogo,
    title,
    category,
    jobType,
    experienceLevel,
    vacancies,
    salary,
    location,
    deadline,
    description,
    responsibilities,
    requirements,
    benefits,
    applicationEmail,
    applicationUrl,
    createdAt,
    status,
    industry,
    website,
    employeeCount,
  } = jobdata;

  const logo =
    typeof companyLogo === "string" && companyLogo.trim()
      ? companyLogo.trim()
      : null;

  const companyInitial = companyName?.charAt(0)?.toUpperCase() || "C";

  const salaryText =
    salary?.min != null && salary?.max != null
      ? `${salary.currency || "USD"} ${Number(salary.min).toLocaleString()} - ${Number(salary.max).toLocaleString()}`
      : "Negotiable";

  const locationText = location?.isRemote
    ? "Worldwide Remote"
    : `${location?.city || ""}, ${location?.country || ""}`.replace(
        /^, |, $/g,
        ""
      ) || "Not specified";

  const applyUrl = Array.isArray(applicationUrl)
    ? applicationUrl[0]
    : applicationUrl;

  const companyWebsite =
    website && website.trim()
      ? website.startsWith("http")
        ? website
        : `https://${website}`
      : null;

  const isActive = status === "active";

  return (
    <main className="min-h-screen bg-[#151515] text-white px-4 py-8 md:py-10">
      <div className="max-w-[1100px] mx-auto">

        {/* Back Button */}
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-6 transition"
        >
          <span className="text-lg">←</span>
          Back to Jobs
        </Link>

        {/* Job Header */}
        <section className="bg-[#202020] rounded-xl p-6 md:p-8 mb-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

            <div className="flex items-center gap-4 min-w-0">

              {/* Company Logo */}
              <div className="relative w-16 h-16 shrink-0 rounded-xl border border-[#383838] bg-[#171717] flex items-center justify-center overflow-hidden">
                <span className="text-2xl font-bold text-indigo-400">
                  {companyInitial}
                </span>

                {logo && (
                  <Image
                    src={logo}
                    alt={`${companyName || "Company"} logo`}
                    width={64}
                    height={64}
                    unoptimized
                    className="absolute inset-0 w-full h-full object-contain bg-[#171717] p-2"
                  />
                )}
              </div>

              <div className="min-w-0">
                <h1 className="text-xl md:text-3xl font-bold text-white mb-1">
                  {title}
                </h1>

                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="text-gray-400">
                    {companyName || "Company"}
                  </span>

                  <span className="text-gray-600">•</span>

                  <span className="text-xs text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {jobdata.isVerified ? "Verified Employer" : "Job Opportunity"}
                  </span>
                </div>
              </div>
            </div>

            {/* Apply Button */}
            <div className="flex items-center gap-3 shrink-0">
              <span className="hidden sm:inline-block text-xs text-gray-500">
                {formatText(status)}
              </span>

              {isActive ? (
                <Link
                  href={`/jobs/${id}/apply`}
                  className="bg-white text-black hover:bg-gray-200 px-7 py-3 rounded-lg text-sm font-semibold transition text-center"
                >
                  Apply Now
                  <span className="ml-2">→</span>
                </Link>
              ) : (
                <button
                  disabled
                  className="bg-[#333] text-gray-500 px-7 py-3 rounded-lg text-sm font-semibold cursor-not-allowed"
                >
                  Applications Closed
                </button>
              )}
            </div>

          </div>
        </section>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Left Content */}
          <div className="lg:col-span-2 space-y-5">

            {/* Job Overview Cards */}
            <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">

              <OverviewCard
                icon="▣"
                label="Salary Range"
                value={salaryText}
              />

              <OverviewCard
                icon="⌖"
                label="Location"
                value={locationText}
              />

              <OverviewCard
                icon="◷"
                label="Job Type"
                value={formatText(jobType)}
              />

              <OverviewCard
                icon="▥"
                label="Experience"
                value={formatText(experienceLevel)}
              />

            </section>

            {/* Job Description */}
            <section className="bg-[#202020] rounded-xl p-6 md:p-8 space-y-8">

              {/* Description */}
              <div>
                <SectionTitle>Job Description</SectionTitle>

                <p className="text-sm text-gray-400 leading-7 whitespace-pre-line">
                  {description || "No job description provided."}
                </p>
              </div>

              {/* Responsibilities */}
              <ContentSection
                title="Responsibilities"
                content={responsibilities}
                type="list"
              />

              {/* Requirements */}
              <ContentSection
                title="Requirements"
                content={requirements}
                type="tags"
              />

              {/* Benefits */}
              <ContentSection
                title="Benefits"
                content={benefits}
                type="benefits"
              />

            </section>
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-5">

            {/* Company Overview */}
            <section className="bg-[#202020] rounded-xl p-5">

              <h2 className="text-lg font-semibold mb-5">
                Company Overview
              </h2>

              {/* Company Image / Logo */}
              <div className="w-full h-36 rounded-lg bg-[#111] border border-[#303030] flex items-center justify-center overflow-hidden mb-5">

                {logo ? (
                  <Image
                    src={logo}
                    alt={`${companyName || "Company"} logo`}
                    width={180}
                    height={120}
                    unoptimized
                    className="w-full h-full object-contain p-5"
                  />
                ) : (
                  <span className="text-5xl font-bold text-indigo-400">
                    {companyInitial}
                  </span>
                )}

              </div>

              {/* Company Name */}
              <h3 className="font-semibold text-white mb-5">
                {companyName || "Company"}
              </h3>

              <div className="space-y-5">

                <CompanyInfo
                  label="Industry"
                  value={formatText(industry || category)}
                />

                <CompanyInfo
                  label="Company Size"
                  value={employeeCount || "Not specified"}
                />

                <CompanyInfo
                  label="Vacancies"
                  value={vacancies}
                />

                <CompanyInfo
                  label="Posted On"
                  value={formatDate(createdAt)}
                />

              </div>

              {companyWebsite && (
                <a
                  href={companyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center text-sm text-gray-300 hover:text-white border border-[#383838] hover:border-gray-500 rounded-lg py-3 mt-6 transition"
                >
                  Visit Website ↗
                </a>
              )}

            </section>

            {/* Application Information */}
            <section className="bg-[#202020] rounded-xl p-5">

              <h2 className="text-lg font-semibold mb-4">
                Application Information
              </h2>

              <p className="text-sm text-gray-400 leading-6 mb-5">
                Interested in this position? Submit your application before
                the deadline.
              </p>

              <CompanyInfo
                label="Application Deadline"
                value={formatDate(deadline)}
              />

              {applicationEmail && (
                <div className="mt-5">
                  <p className="text-xs text-gray-500 mb-2">
                    Application Email
                  </p>

                  <a
                    href={`mailto:${applicationEmail}`}
                    className="text-sm text-indigo-400 hover:underline break-all"
                  >
                    {applicationEmail}
                  </a>
                </div>
              )}

              {isActive && (
                <Link
                  href={`/jobs/${id}/apply`}
                  className="block text-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm py-3 rounded-lg mt-6 transition"
                >
                  Apply for This Job →
                </Link>
              )}

            </section>

          </aside>
        </div>
      </div>
    </main>
  );
};

// Reusable Overview Card
const OverviewCard = ({ icon, label, value }) => (
  <div className="bg-[#202020] rounded-lg p-4 min-w-0">
    <div className="text-gray-400 text-lg mb-2">{icon}</div>

    <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">
      {label}
    </p>

    <p className="text-xs text-gray-200 font-medium leading-5 break-words">
      {value || "Not specified"}
    </p>
  </div>
);

// Reusable Section Title
const SectionTitle = ({ children }) => (
  <h2 className="text-lg font-semibold text-white mb-4">
    {children}
  </h2>
);

// Reusable Content Section
const ContentSection = ({ title, content, type }) => {
  const items = Array.isArray(content)
    ? content
    : typeof content === "string"
      ? content.split("\n").map((item) => item.replace(/^[•\-*]\s*/, "").trim()).filter(Boolean)
      : [];

  return (
    <div>
      <SectionTitle>{title}</SectionTitle>

      {items.length > 0 ? (
        type === "tags" ? (
          <div className="flex flex-wrap gap-2">
            {items.map((item, index) => (
              <span
                key={index}
                className="text-xs text-gray-300 bg-[#252525] border border-[#353535] rounded-full px-4 py-2"
              >
                {item}
              </span>
            ))}
          </div>
        ) : (
          <ul
            className={`grid ${
              type === "benefits" ? "grid-cols-1 sm:grid-cols-2 gap-4" : "grid-cols-1 gap-3"
            }`}
          >
            {items.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-sm text-gray-400 leading-6"
              >
                {type === "benefits" ? (
                  <span className="w-7 h-7 shrink-0 rounded-full bg-[#303030] flex items-center justify-center text-emerald-400">
                    ✓
                  </span>
                ) : (
                  <span className="text-white mt-0.5">•</span>
                )}

                <span>{item}</span>
              </li>
            ))}
          </ul>
        )
      ) : (
        <p className="text-sm text-gray-500">
          No information provided.
        </p>
      )}
    </div>
  );
};

// Reusable Company Information
const CompanyInfo = ({ label, value }) => (
  <div className="flex items-start justify-between gap-4">
    <p className="text-xs text-gray-500 shrink-0">{label}</p>

    <p className="text-xs text-gray-300 text-right break-words">
      {value || "Not specified"}
    </p>
  </div>
);

export default JobDetailsPage;
