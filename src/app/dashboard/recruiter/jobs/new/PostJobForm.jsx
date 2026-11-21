
"use client";

import React, { useState } from "react";
import { Button, Input, TextArea } from "@heroui/react";
import { Briefcase, MapPin } from "@gravity-ui/icons";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createJob } from "@/lib/actions/jobs";
import {  useRouter } from "next/navigation";

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return <p className="text-sm text-red-500">{message}</p>;
};

const PostJobForm = ({company}) => {
   
const companyStatusConfig = {
  pending: {
    title: "Company Pending Review",
    description:
      "Your company registration has been submitted successfully. Our admin team is reviewing your company. You can post jobs after approval.",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/20",
  },

  underReview: {
    title: "Company Under Review",
    description:
      "You recently updated your company profile. Our admin team is reviewing the changes. Job posting will be available after approval.",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
  },

  rejected: {
    title: "Company Registration Rejected",
    description:
      "Your company registration was rejected. Please contact our support team or update your company information.",
    color: "text-red-400",
    bg: "bg-red-400/10",
    border: "border-red-400/20",
  },
};
  

const companyId = company?._id;
const companyName = company?.companyName;
const logo = company?.logo;
const isCompanyApproved =
  Boolean(company?._id) && company?.status === "approved";

const companyStatus = company?.status;
const statusInfo = companyStatusConfig[companyStatus];
  const [isRemote, setIsRemote] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter()
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      category: "",
      jobType: "",
      experienceLevel: "",
      vacancies: 1,
      salaryMin: "",
      salaryMax: "",
      currency: "BDT",
      city: "",
      country: "",
      deadline: "",
      responsibilities: "",
      requirements: "",
      benefits: "",
      applicationEmail: "",
      applicationUrl: "",
    },
  });

  const inputClass = "w-full";

  // Reusable section heading
  const SectionHeading = ({ children }) => (
    <div className="flex items-center gap-2 border-b border-[#353535] pb-4">
      <Briefcase className="size-5 text-gray-300" />
      <h2 className="text-lg font-semibold text-white">{children}</h2>
    </div>
  );

  // Submit handler
  const onSubmit = async (data) => {

   if (!company?._id) {
  toast.error("Please register your company first.");
  return;
}

if (company.status !== "approved") {
  toast.error(
    "Your company must be approved before you can post jobs."
  );
  return;
}

    const salaryMin = Number(data.salaryMin);
    const salaryMax = Number(data.salaryMax);

    if (salaryMin > salaryMax) {
      toast.error("Minimum salary cannot exceed maximum salary!");
      return;
    }

    const jobData = {
      companyId:companyId,
      companyName:companyName,
      companyLogo:logo,
      status:"active",
      title: data.title.trim(),
      category: data.category,
      jobType: data.jobType,
      experienceLevel: data.experienceLevel,
      vacancies: Number(data.vacancies),
      

      salary: {
        min: salaryMin,
        max: salaryMax,
        currency: data.currency,
      },

      location: {
        city: isRemote ? "" : data.city.trim(),
        country: isRemote ? "" : data.country.trim(),
        isRemote,
      },

      deadline: data.deadline,

      responsibilities: data.responsibilities.trim(),
      requirements: data.requirements.trim(),
      benefits: data.benefits.trim(),

      applicationEmail: data.applicationEmail.trim(),
      applicationUrl: data.applicationUrl.trim(),
    };

    try {
      setIsSubmitting(true);

      const res = await createJob(jobData);

      if (res?.insertedId) {
        toast.success("Job posted successfully!");
        
        reset();
        setIsRemote(false);
        router.push("/dashboard/recruiter/jobs");
      } else {
        toast.error(res?.message || "Failed to post job.");
      }
    } catch (error) {
      console.error("Job submission error:", error);
      toast.error(error.message || "Failed to post job. Please try again!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    reset();
    setIsRemote(false);
    toast.info("Form has been reset.");
  };

  if (!isCompanyApproved) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="rounded-2xl border border-[#353535] bg-[#1c1c1c] p-6 text-center sm:p-10">

        <div
          className={`mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl ${
            statusInfo?.bg || "bg-amber-400/10"
          }`}
        >
          <Briefcase
            size={30}
            className={statusInfo?.color || "text-amber-400"}
          />
        </div>

        <h1 className="text-xl font-semibold text-white sm:text-2xl">
          {!company?._id
            ? "Company Registration Required"
            : statusInfo?.title || "Company Verification Required"}
        </h1>

        <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-gray-400">
          {!company?._id
            ? "You need to register your company before posting jobs. Please create your company profile first."
            : statusInfo?.description ||
              "Your company must be approved by our admin team before you can publish job openings."}
        </p>

        {company?._id && (
          <div
            className={`mx-auto mt-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium ${
              statusInfo
                ? `${statusInfo.bg} ${statusInfo.color} ${statusInfo.border}`
                : "border-amber-400/20 bg-amber-400/10 text-amber-400"
            }`}
          >
            <span className="size-2 rounded-full bg-current" />

            {statusInfo?.title || "Verification Required"}
          </div>
        )}

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            onPress={() =>
              router.push("/dashboard/recruiter/company")
            }
            className="bg-white text-black"
          >
            {!company?._id
              ? "Register Company"
              : "Manage Company Profile"}
          </Button>

          <Button
            variant="bordered"
            onPress={() => router.push("/dashboard/recruiter")}
            className="border-white/20 text-white"
          >
            Back to Dashboard
          </Button>
        </div>

        <p className="mt-6 text-xs text-gray-600">
          HireLoop · Company Verification
        </p>
      </div>
    </div>
  );
}

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Post a New Job</h1>
        <p className="mt-1 text-sm text-gray-400">
          Create a job opening and find the right candidate.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Job Information */}
        <section className="space-y-5 rounded-xl border border-[#353535] bg-[#1c1c1c] p-5 sm:p-6">
          <SectionHeading>Job Information</SectionHeading>

          {/* Job Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              Job Title *
            </label>

            <Input
              {...register("title", {
                required: "Job title is required",
                minLength: {
                  value: 3,
                  message: "Title must be at least 3 characters",
                },
                maxLength: {
                  value: 100,
                  message: "Title cannot exceed 100 characters",
                },
              })}
              placeholder="e.g. Senior Frontend Developer"
              className={inputClass}
            />

            <ErrorMessage message={errors.title?.message} />
          </div>

          {/* Category and Job Type */}
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Job Category *
              </label>

              <select
                {...register("category", {
                  required: "Please select a category",
                })}
                className="h-10 w-full rounded-lg border border-[#444] bg-[#242424] px-3 text-sm text-white outline-none focus:border-white"
              >
                <option value="">Select category</option>
                <option value="technology">Technology</option>
                <option value="design">Design</option>
                <option value="marketing">Marketing</option>
                <option value="business">Business</option>
                <option value="finance">Finance</option>
                <option value="education">Education</option>
                <option value="healthcare">Healthcare</option>
                <option value="other">Other</option>
              </select>

              <ErrorMessage message={errors.category?.message} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Employment Type *
              </label>

              <select
                {...register("jobType", {
                  required: "Please select an employment type",
                })}
                className="h-10 w-full rounded-lg border border-[#444] bg-[#242424] px-3 text-sm text-white outline-none focus:border-white"
              >
                <option value="">Select employment type</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
                <option value="freelance">Freelance</option>
              </select>

              <ErrorMessage message={errors.jobType?.message} />
            </div>
          </div>

          {/* Experience and Vacancies */}
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Experience Level *
              </label>

              <select
                {...register("experienceLevel", {
                  required: "Please select experience level",
                })}
                className="h-10 w-full rounded-lg border border-[#444] bg-[#242424] px-3 text-sm text-white outline-none focus:border-white"
              >
                <option value="">Select experience level</option>
                <option value="entry">Entry Level</option>
                <option value="junior">Junior</option>
                <option value="mid">Mid Level</option>
                <option value="senior">Senior</option>
                <option value="lead">Lead</option>
                <option value="any">Any Experience</option>
              </select>

              <ErrorMessage message={errors.experienceLevel?.message} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Number of Vacancies *
              </label>

              <Input
                {...register("vacancies", {
                  required: "Number of vacancies is required",
                  valueAsNumber: true,
                  min: {
                    value: 1,
                    message: "At least 1 vacancy is required",
                  },
                  max: {
                    value: 1000,
                    message: "Maximum 1000 vacancies allowed",
                  },
                })}
                type="number"
                min="1"
                placeholder="e.g. 3"
              />

              <ErrorMessage message={errors.vacancies?.message} />
            </div>
          </div>

          {/* Salary */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              Salary Range *
            </label>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="space-y-2">
                <Controller
                  name="salaryMin"
                  control={control}
                  rules={{
                    required: "Minimum salary is required",
                    validate: (value) =>
                      (value !== "" && Number(value) >= 0) ||
                      "Salary cannot be negative",
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      min="0"
                      placeholder="Minimum salary"
                    />
                  )}
                />

                <ErrorMessage message={errors.salaryMin?.message} />
              </div>

              <div className="space-y-2">
                <Controller
                  name="salaryMax"
                  control={control}
                  rules={{
                    required: "Maximum salary is required",
                    validate: (value) =>
                      (value !== "" && Number(value) > 0) ||
                      "Maximum salary must be greater than zero",
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      min="1"
                      placeholder="Maximum salary"
                    />
                  )}
                />

                <ErrorMessage message={errors.salaryMax?.message} />
              </div>

              <select
                {...register("currency")}
                className="h-10 rounded-lg border border-[#444] bg-[#242424] px-3 text-sm text-white outline-none focus:border-white"
              >
                <option value="BDT">BDT (৳)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="INR">INR (₹)</option>
              </select>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
              <MapPin className="size-4" />
              Job Location
            </label>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <Input
                  {...register("city", {
                    validate: (value) =>
                      isRemote ||
                      value.trim() !== "" ||
                      "City is required",
                  })}
                  placeholder="City"
                  disabled={isRemote}
                />

                {!isRemote && (
                  <ErrorMessage message={errors.city?.message} />
                )}
              </div>

              <div className="space-y-2">
                <Input
                  {...register("country", {
                    validate: (value) =>
                      isRemote ||
                      value.trim() !== "" ||
                      "Country is required",
                  })}
                  placeholder="Country"
                  disabled={isRemote}
                />

                {!isRemote && (
                  <ErrorMessage message={errors.country?.message} />
                )}
              </div>
            </div>

            <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-300">
              <input
                type="checkbox"
                checked={isRemote}
                onChange={(e) => setIsRemote(e.target.checked)}
                className="size-4 accent-white"
              />
              This is a remote position
            </label>
          </div>

          {/* Application Deadline */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              Application Deadline *
            </label>

            <Controller
              name="deadline"
              control={control}
              rules={{
                required: "Application deadline is required",
                validate: (value) => {
                  if (!value) return "Application deadline is required";

                  const today = new Date();
                  today.setHours(0, 0, 0, 0);

                  return (
                    new Date(`${value}T00:00:00`) >= today ||
                    "Deadline cannot be in the past"
                  );
                },
              }}
              render={({ field }) => (
                <Input {...field} type="date" className={inputClass} />
              )}
            />

            <ErrorMessage message={errors.deadline?.message} />
          </div>
        </section>

        {/* Job Description */}
        <section className="space-y-5 rounded-xl border border-[#353535] bg-[#1c1c1c] p-5 sm:p-6">
          <SectionHeading>Job Description</SectionHeading>

          {/* Responsibilities */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              Responsibilities *
            </label>

            <Controller
              name="responsibilities"
              control={control}
              rules={{
                required: "Responsibilities are required",
                minLength: {
                  value: 20,
                  message: "Please write at least 20 characters",
                },
              }}
              render={({ field }) => (
                <TextArea
                  {...field}
                  placeholder="Describe the responsibilities of this position..."
                  minRows={5}
                />
              )}
            />

            <ErrorMessage message={errors.responsibilities?.message} />
          </div>

          {/* Requirements */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              Requirements *
            </label>

            <Controller
              name="requirements"
              control={control}
              rules={{
                required: "Requirements are required",
                minLength: {
                  value: 20,
                  message: "Please write at least 20 characters",
                },
              }}
              render={({ field }) => (
                <TextArea
                  {...field}
                  placeholder="List required skills, qualifications and experience..."
                  minRows={5}
                />
              )}
            />

            <ErrorMessage message={errors.requirements?.message} />
          </div>

          {/* Benefits */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              Benefits (Optional)
            </label>

            <Controller
              name="benefits"
              control={control}
              render={({ field }) => (
                <TextArea
                  {...field}
                  placeholder="Describe bonuses, holidays, health insurance, etc..."
                  minRows={4}
                />
              )}
            />
          </div>
        </section>

        {/* Application Settings */}
        <section className="space-y-5 rounded-xl border border-[#353535] bg-[#1c1c1c] p-5 sm:p-6">
          <SectionHeading>Application Settings</SectionHeading>

          <p className="text-sm text-gray-400">
            Candidates can use these details to apply for this position.
            You can leave these fields empty if you want to use the platform's
            application system.
          </p>

          {/* Application Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              Application Email (Optional)
            </label>

            <Input
              {...register("applicationEmail", {
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
              type="email"
              placeholder="careers@company.com"
            />

            <ErrorMessage message={errors.applicationEmail?.message} />
          </div>

          {/* Application URL */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              External Application URL (Optional)
            </label>

            <Input
              {...register("applicationUrl", {
                validate: (value) => {
                  if (!value) return true;

                  try {
                    const url = new URL(value);

                    return (
                      ["http:", "https:"].includes(url.protocol) ||
                      "URL must start with http:// or https://"
                    );
                  } catch {
                    return "Please enter a valid URL";
                  }
                },
              })}
              type="url"
              placeholder="https://company.com/apply"
            />

            <ErrorMessage message={errors.applicationUrl?.message} />
          </div>
        </section>

        {/* Company Information */}
        <section className="space-y-4 rounded-xl border border-[#353535] bg-[#1c1c1c] p-5 sm:p-6">
          <SectionHeading>Company Information</SectionHeading>

          <div className="rounded-lg border border-[#383838] bg-[#242424] p-4">
            <h3 className="text-sm font-semibold text-white">
              Your Registered Company
            </h3>

            <p className="mt-1 text-xs text-gray-400">
              Your registered company information will be associated with
              this job automatically.
            </p>
          </div>

          <p className="text-xs text-gray-500">
            Only approved companies can publish job openings. Your company
            approval will be verified by the server.
          </p>
        </section>

        {/* Posting Limit */}
        <section className="space-y-3 rounded-xl border border-[#353535] bg-[#1c1c1c] p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-white">
            Job Posting Limit
          </h2>

          <p className="text-sm text-gray-400">
            Your current plan and available job posting limit will be checked
            automatically when you publish a job.
          </p>

          <p className="text-xs text-gray-500">
            Free: 3 jobs · Growth: 10 jobs · Enterprise: 50 jobs
          </p>
        </section>

        {/* Submit Buttons */}
        <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
          <Button
            type="button"
            variant="secondary"
            onPress={handleReset}
            isDisabled={isSubmitting}
            className="sm:min-w-32"
          >
            Reset
          </Button>

          <Button
            type="submit"
            isDisabled={isSubmitting}
            className="sm:min-w-40"
          >
            {isSubmitting ? "Publishing..." : "Publish Job"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostJobForm;
