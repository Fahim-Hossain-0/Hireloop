
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  Globe,
  MapPin,
  Users,
  BriefcaseBusiness,
  Plus,
  Pencil,
  ShieldCheck,
  Sparkles,
  CircleHelp,
  ExternalLink,
  Clock,
  XCircle,
} from "lucide-react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CompanyProfileModal from "@/components/deshboard/CompanyProfileModal";

const statusConfig = {
  pending: {
    label: "Pending Review",
    description:
      "Your company profile has been created and is waiting for admin review.",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    icon: Clock,
    progress: "w-2/3 bg-amber-400",
  },

  underReview: {
    label: "Under Review",
    description:
      "Your updated company profile has been submitted and is waiting for admin review.",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    icon: Clock,
    progress: "w-2/3 bg-blue-400",
  },

  approved: {
    label: "Verified",
    description: "Your company has been approved.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    icon: ShieldCheck,
    progress: "w-full bg-emerald-400",
  },

  rejected: {
    label: "Rejected",
    description: "Your company registration was rejected.",
    color: "text-red-400",
    bg: "bg-red-400/10",
    icon: XCircle,
    progress: "w-1/3 bg-red-400",
  },
};

const CompanyProfile = ({ recruiter, recruiterCompany }) => {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [company, setCompany] = useState(recruiterCompany || null);

  // Synchronize local company data with server data.
  useEffect(() => {
    setCompany(recruiterCompany || null);
  }, [recruiterCompany]);

  const handleSuccess = (result) => {
    const updatedCompany = result?.company;

    if (updatedCompany) {
      setCompany(updatedCompany);
    }

    setIsModalOpen(false);

    toast.success(
      result?.message || "Company profile saved successfully!"
    );

    router.refresh();
  };

  // An empty object must NOT count as an existing company.
  const hasCompany = Boolean(
    company?._id || company?.companyName
  );

  // Only existing companies should have a verification status.
  const currentStatus = hasCompany
    ? company.status || "pending"
    : null;

  const status = currentStatus
    ? statusConfig[currentStatus] || statusConfig.pending
    : null;

  const StatusIcon = status?.icon;

  return (
    <div className="min-h-screen bg-[#111111] px-4 py-8 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-5 border-b border-white/[0.07] pb-7 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs text-gray-500">
              <span>Dashboard</span>
              <span>/</span>
              <span className="text-gray-300">
                Company Profile
              </span>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Company Profile
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Manage your company identity and hiring presence.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-[#1c1c1c]">
              <Building2 size={18} className="text-gray-400" />
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Account type
              </p>
              <p className="text-sm font-medium">
                Recruiter
              </p>
            </div>
          </div>
        </div>

        {/* Welcome Banner */}
        <div className="relative mb-8 overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#202020] via-[#191919] to-[#151515] p-6 sm:p-9">
          <div className="absolute -right-20 -top-24 size-72 rounded-full bg-indigo-500/[0.08] blur-[90px]" />

          <div className="relative z-10 flex flex-col justify-between gap-7 md:flex-row md:items-center">
            <div className="max-w-xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/[0.08] px-3 py-1.5 text-[11px] font-medium text-indigo-300">
                <Sparkles size={13} />
                YOUR HIRING WORKSPACE
              </div>

              <h2 className="text-2xl font-semibold leading-tight sm:text-3xl">
                {hasCompany
                  ? `Welcome to ${company.companyName || "your company"}`
                  : "Build your company's presence."}
              </h2>

              <p className="mt-3 max-w-lg text-sm leading-6 text-gray-400">
                {hasCompany
                  ? "Your company profile is the foundation of your hiring journey. Keep your information updated to attract the right talent."
                  : "Create your company profile, establish your brand identity, and start connecting with talented professionals on HireLoop."}
              </p>
            </div>

            <div className="relative flex shrink-0 items-center justify-center">
              <div className="flex size-28 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl sm:size-36">
                <Building2
                  size={55}
                  strokeWidth={1}
                  className="text-gray-400"
                />
              </div>

              <div className="absolute -bottom-3 -right-3 flex size-11 items-center justify-center rounded-2xl border border-[#303030] bg-[#252525]">
                {hasCompany ? (
                  <StatusIcon
                    size={22}
                    className={status.color}
                  />
                ) : (
                  <Plus
                    size={22}
                    className="text-indigo-400"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">

          {/* Company Information */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#191919] p-6 sm:p-8 lg:col-span-2">
            <div className="mb-7 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold">
                  Company information
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Your public company identity.
                </p>
              </div>

              <span
                className={`shrink-0 rounded-full px-3 py-1.5 text-[10px] font-medium ${
                  hasCompany
                    ? `${status.bg} ${status.color}`
                    : "bg-amber-400/10 text-amber-400"
                }`}
              >
                {hasCompany
                  ? status.label
                  : "Setup Required"}
              </span>
            </div>

            {hasCompany ? (
              <>
                {/* Company Identity */}
                <div className="mb-8 flex flex-col gap-4 border-b border-white/[0.07] pb-7 sm:flex-row sm:items-center">
                  <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#252525]">
                    {company.logo ? (
                      <img
                        src={company.logo}
                        alt={company.companyName || "Company logo"}
                        className="size-full object-cover"
                      />
                    ) : (
                      <Building2
                        size={28}
                        className="text-gray-500"
                      />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="text-lg font-semibold">
                      {company.companyName}
                    </h4>

                    <p className="mt-1 text-sm text-gray-500">
                      {company.industry || "Industry not specified"}
                    </p>
                  </div>

                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-medium transition hover:bg-white/10"
                  >
                    <Pencil size={14} />
                    Manage Profile
                  </button>
                </div>

                {/* Company Details */}
                <div className="grid gap-6 sm:grid-cols-2">

                  {/* Website */}
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-white/[0.05] p-2.5">
                      <Globe
                        size={17}
                        className="text-gray-400"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs text-gray-500">
                        Website
                      </p>

                      {company.website ? (
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 flex items-center gap-1 break-all text-sm text-gray-200 hover:text-indigo-400"
                        >
                          {company.website}
                          <ExternalLink size={12} />
                        </a>
                      ) : (
                        <p className="mt-1 text-sm text-gray-400">
                          Not provided
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-white/[0.05] p-2.5">
                      <MapPin
                        size={17}
                        className="text-gray-400"
                      />
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">
                        Location
                      </p>

                      <p className="mt-1 text-sm text-gray-200">
                        {company.location || "Not provided"}
                      </p>
                    </div>
                  </div>

                  {/* Company Size */}
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-white/[0.05] p-2.5">
                      <Users
                        size={17}
                        className="text-gray-400"
                      />
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">
                        Company size
                      </p>

                      <p className="mt-1 text-sm text-gray-200">
                        {company.employeeCount || "Not specified"}
                      </p>
                    </div>
                  </div>

                  {/* Industry */}
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-white/[0.05] p-2.5">
                      <BriefcaseBusiness
                        size={17}
                        className="text-gray-400"
                      />
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">
                        Industry
                      </p>

                      <p className="mt-1 text-sm text-gray-200">
                        {company.industry || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                {company.description && (
                  <div className="mt-7 border-t border-white/[0.07] pt-6">
                    <h4 className="mb-2 text-sm font-medium">
                      About company
                    </h4>

                    <p className="text-sm leading-7 text-gray-400">
                      {company.description}
                    </p>
                  </div>
                )}
              </>
            ) : (
              /* No Company State */
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/[0.015] px-5 py-14 text-center">
                <div className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-[#252525]">
                  <Building2
                    size={30}
                    className="text-gray-500"
                  />
                </div>

                <h4 className="text-base font-medium">
                  No company profile yet
                </h4>

                <p className="mt-2 max-w-sm text-xs leading-6 text-gray-500">
                  You haven't registered a company. Set up your company
                  information to unlock your recruiter workspace.
                </p>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="mt-6 flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-semibold text-black transition hover:bg-gray-200"
                >
                  <Plus size={15} />
                  Register your company
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">

            {/* Status Card */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#191919] p-6">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-sm font-semibold">
                  Company verification
                </h3>

                {hasCompany ? (
                  <StatusIcon
                    size={18}
                    className={status.color}
                  />
                ) : (
                  <CircleHelp
                    size={18}
                    className="text-amber-400"
                  />
                )}
              </div>

              {hasCompany ? (
                <>
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className={`flex size-10 items-center justify-center rounded-xl ${status.bg}`}
                    >
                      <StatusIcon
                        size={20}
                        className={status.color}
                      />
                    </div>

                    <div>
                      <p
                        className={`text-sm font-medium ${status.color}`}
                      >
                        {status.label}
                      </p>

                      <p className="mt-1 text-[11px] text-gray-500">
                        Admin verification status
                      </p>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="h-1.5 overflow-hidden rounded-full bg-[#303030]">
                    <div
                      className={`h-full transition-all ${status.progress}`}
                    />
                  </div>

                  <p className="mt-3 text-[11px] leading-5 text-gray-500">
                    {status.description}
                  </p>

                  {/* Pending or Under Review Notice */}
                  {(currentStatus === "pending" ||
                    currentStatus === "underReview") && (
                    <div className="mt-4 rounded-xl border border-amber-400/10 bg-amber-400/[0.04] p-3">
                      <p className="text-xs leading-5 text-amber-300/80">
                        Our admin team is reviewing your company information.
                        Please wait for approval.
                      </p>
                    </div>
                  )}

                  {/* Approved Notice */}
                  {currentStatus === "approved" && (
                    <div className="mt-4 rounded-xl border border-emerald-400/10 bg-emerald-400/[0.04] p-3">
                      <p className="text-xs leading-5 text-emerald-300/80">
                        Your company is verified. You can now access approved
                        hiring features.
                      </p>
                    </div>
                  )}

                  {/* Rejected Notice */}
                  {currentStatus === "rejected" && (
                    <div className="mt-4 rounded-xl border border-red-400/10 bg-red-400/[0.04] p-3">
                      <p className="text-xs leading-5 text-red-300/80">
                        Your company registration was rejected. Please contact
                        support for further assistance.
                      </p>
                    </div>
                  )}
                </>
              ) : (
                /* No Company Verification State */
                <>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400">
                      <CircleHelp size={20} />
                    </div>

                    <div>
                      <p className="text-sm font-medium">
                        Setup incomplete
                      </p>

                      <p className="mt-1 text-[11px] text-gray-500">
                        Action required
                      </p>
                    </div>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-[#303030]">
                    <div className="h-full w-[10%] bg-amber-400" />
                  </div>

                  <p className="mt-3 text-[11px] text-gray-500">
                    Register your company to get started.
                  </p>
                </>
              )}
            </div>

            {/* Tips Card */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#191919] p-6">
              <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-indigo-400/10 text-indigo-400">
                <Sparkles size={19} />
              </div>

              <h3 className="text-sm font-semibold">
                Make your company stand out
              </h3>

              <p className="mt-2 text-xs leading-6 text-gray-500">
                A complete company profile helps candidates understand your
                organization and builds trust with potential applicants.
              </p>

              <div className="mt-5 space-y-3">
                {[
                  "Upload your company logo",
                  "Add your company website",
                  "Write a clear description",
                  "Keep your information updated",
                ].map((tip, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2.5"
                  >
                    <div className="size-1.5 rounded-full bg-indigo-400" />
                    <span className="text-xs text-gray-400">
                      {tip}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Help Card */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#191919] p-6">
              <div className="flex items-center gap-2">
                <CircleHelp
                  size={17}
                  className="text-gray-400"
                />

                <h3 className="text-sm font-semibold">
                  Need assistance?
                </h3>
              </div>

              <p className="mt-2 text-xs leading-6 text-gray-500">
                Having trouble setting up your company profile? Our support
                team can help you get started.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex flex-col justify-between gap-2 border-t border-white/[0.07] pt-6 text-[11px] text-gray-600 sm:flex-row">
          <p>© 2026 HireLoop. All rights reserved.</p>
          <p>Built for better hiring experiences.</p>
        </div>
      </div>

      {/* Only ONE modal instance */}
      <CompanyProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
        recruiter={recruiter}
        recruiterCompany={company}
      />

      {/* Only ONE ToastContainer */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
      />
    </div>
  );
};

export default CompanyProfile;
