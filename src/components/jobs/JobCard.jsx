
"use client";

import { useState } from "react";
import {
  Bookmark,
  BookmarkCheck,
  Banknote,
  BriefcaseBusiness,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";

const JobCard = ({ job }) => {
  const [isSaved, setIsSaved] = useState(false);
  const router = useRouter();

  const {
    companyLogo,
    companyName,
    title,
    salary,
    jobType,
    experienceLevel,
    location,
    applicationEmail,
    applicationUrl,
  } = job;

  const formatSalary = (amount, currency) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
      maximumFractionDigits: 0,
    }).format(amount);

  const locationText = [
    location?.city,
    location?.country,
  ].filter(Boolean).join(", ");

  const jobLocation = location?.isRemote
    ? locationText
      ? `${locationText} (Remote)`
      : "Remote"
    : locationText || "Location not specified";

  const capitalize = (value = "") =>
    value.charAt(0).toUpperCase() + value.slice(1);

  const isEasyApply = Boolean(applicationEmail || applicationUrl);

  return (
    <article
      onClick={() => router.push(`/jobs/${job._id}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          router.push(`/jobs/${job._id}`);
        }
      }}
      role="link"
      tabIndex={0}
      className="group cursor-pointer rounded-xl border border-white/[0.06] bg-[#1c1c1c] p-5 transition duration-300 hover:border-white/15 hover:bg-[#202020] sm:p-6"
    >
      <div className="flex items-start gap-4">

        {/* Company Logo */}
        <div className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-[#292929] p-1.5">
          {companyLogo ? (
            <img
              src={companyLogo}
              alt={`${companyName} logo`}
              className="size-full rounded object-contain"
            />
          ) : (
            <BriefcaseBusiness size={22} className="text-gray-500" />
          )}
        </div>

        {/* Job Information */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-base font-medium text-gray-100 transition group-hover:text-white sm:text-lg">
                {title}
              </h3>

              <p className="mt-1 text-xs text-gray-400">
                {companyName} <span className="mx-1">•</span> {jobLocation}
              </p>
            </div>

            {/* Bookmark */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsSaved(!isSaved);
              }}
              aria-label={isSaved ? "Remove saved job" : "Save job"}
              className="shrink-0 rounded-md p-1 text-gray-400 transition hover:bg-white/10 hover:text-white"
            >
              {isSaved ? (
                <BookmarkCheck size={19} className="text-indigo-400" />
              ) : (
                <Bookmark size={19} />
              )}
            </button>
          </div>

          {/* Badges */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {salary && (
              <span className="inline-flex items-center gap-1.5 rounded bg-[#353535] px-2.5 py-1.5 text-[11px] text-gray-200">
                <Banknote size={12} />
                {formatSalary(salary.min, salary.currency)}
                {" - "}
                {formatSalary(salary.max, salary.currency)}
              </span>
            )}

            {jobType && (
              <span className="inline-flex items-center gap-1.5 rounded bg-[#353535] px-2.5 py-1.5 text-[11px] text-gray-200">
                <BriefcaseBusiness size={12} />
                {capitalize(jobType)}
              </span>
            )}

            {experienceLevel && (
              <span className="rounded bg-[#353535] px-2.5 py-1.5 text-[11px] text-gray-200">
                {capitalize(experienceLevel)}
              </span>
            )}

            {isEasyApply && (
              <span className="inline-flex items-center gap-1.5 rounded border border-emerald-500/30 bg-emerald-500/[0.08] px-2.5 py-1.5 text-[11px] font-medium text-emerald-400">
                <Zap size={12} />
                Easy Apply
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default JobCard;
