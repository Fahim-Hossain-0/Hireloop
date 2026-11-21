"use client";
import { submitApplication } from "@/lib/actions/application";
import Link from "next/link";
import { toast } from "react-toastify";

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

const JobApply = ({ job, user }) => {
  if (!job) {
    return (
      <div className="min-h-screen bg-[#151515] text-white flex items-center justify-center">
        Job information not found.
      </div>
    );
  }

  const {
    _id,
    title,
    companyName,
    companyLogo,
    salary,
    jobType,
    experienceLevel,
    location,
    deadline,
  } = job;

  const companyInitial = companyName?.charAt(0)?.toUpperCase() || "C";

  const salaryText =
    salary?.min != null && salary?.max != null
      ? `${salary.currency || "USD"} ${Number(salary.min).toLocaleString()} - ${Number(salary.max).toLocaleString()}`
      : "Negotiable";

  const locationText = location?.isRemote
    ? "Worldwide Remote"
    : `${location?.city || ""}, ${location?.country || ""}`.replace(
        /^, |, $/g,
        "",
      ) || "Not specified";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const applicationData = {
      // Applicant Information
      applicantId: user?.id,
      applicantName: formData.get("fullName"),
      applicantEmail: formData.get("email"),
      applicantPhone: formData.get("phone"),
      applicantLocation: formData.get("applicantLocation"),
      linkedin: formData.get("linkedin"),
      portfolio: formData.get("portfolio"),
      resume: formData.get("resume"),
      coverLetter: formData.get("coverLetter"),

      // Job Information
      jobId: _id,
      jobTitle: title,
      companyId: job.companyId,
      companyName: companyName,

      // Application Status
      status: "pending",
      appliedAt: new Date().toISOString(),
    };

    console.log("Application Data:", applicationData);

    const res = await submitApplication(applicationData);

    if (res.insertedId) {
      toast.success("Application submitted successfully!");
      form.reset();
    } else {
      toast.error("Failed to submit application.");
    }
  };

  return (
    <main className="min-h-screen bg-[#1d1d1d] text-white px-4 py-8 md:py-12">
      <div className="max-w-[1100px] mx-auto">
        {/* Page Heading */}
        <div className="mb-6">
          <Link
            href={`/jobs/${_id}`}
            className="text-sm text-gray-400 hover:text-white transition"
          >
            ← Back to Job Details
          </Link>

          <h1 className="text-2xl md:text-3xl font-bold mt-5">
            Submit Your Application
          </h1>

          <p className="text-sm text-gray-400 mt-2">
            Take the next step in your career. Complete the form below to apply.
          </p>
        </div>

        {/* Main Application Container */}
        <div className="bg-[#111111] border border-[#303030] rounded-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* LEFT SIDE - JOB SUMMARY */}
            <section className="p-6 md:p-9 lg:border-r border-[#303030]">
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-8">
                <span>01</span>
                <span className="w-8 h-px bg-gray-700"></span>
                <span className="text-gray-300">JOB INFORMATION</span>
              </div>

              {/* Company Logo */}
              <div className="flex items-center gap-4 mb-8">
                <div className="relative w-14 h-14 shrink-0 rounded-xl bg-[#202020] border border-[#383838] flex items-center justify-center overflow-hidden">
                  <span className="text-2xl font-bold text-indigo-400">
                    {companyInitial}
                  </span>

                  {companyLogo && (
                    <img
                      src={companyLogo}
                      alt={`${companyName || "Company"} logo`}
                      className="absolute inset-0 w-full h-full object-contain p-2 bg-[#202020]"
                    />
                  )}
                </div>

                <div className="min-w-0">
                  <h2 className="font-semibold text-white">{title}</h2>

                  <p className="text-sm text-gray-400 mt-1">
                    {companyName || "Company"}
                  </p>
                </div>
              </div>

              {/* Job Information */}
              <div className="space-y-6">
                <div>
                  <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">
                    Position
                  </p>
                  <p className="text-sm font-medium">{title}</p>
                </div>

                <div className="border-t border-[#303030]"></div>

                <div>
                  <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">
                    Salary Range
                  </p>
                  <p className="text-sm font-medium">{salaryText}</p>
                </div>

                <div className="border-t border-[#303030]"></div>

                <div>
                  <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">
                    Location
                  </p>
                  <p className="text-sm font-medium">{locationText}</p>
                </div>

                <div className="border-t border-[#303030]"></div>

                <div>
                  <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">
                    Employment Type
                  </p>
                  <p className="text-sm font-medium">{formatText(jobType)}</p>
                </div>

                <div className="border-t border-[#303030]"></div>

                <div>
                  <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">
                    Experience Level
                  </p>
                  <p className="text-sm font-medium">
                    {formatText(experienceLevel)}
                  </p>
                </div>

                <div className="border-t border-[#303030]"></div>

                <div>
                  <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">
                    Application Deadline
                  </p>
                  <p className="text-sm font-medium">{formatDate(deadline)}</p>
                </div>
              </div>

              {/* Information Box */}
              <div className="mt-10 p-5 bg-[#1b1b1b] border border-[#303030] rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-indigo-400">ⓘ</span>
                  <h3 className="text-sm font-semibold">Before You Apply</h3>
                </div>

                <ul className="text-xs text-gray-400 space-y-3 leading-5">
                  <li>• Make sure your contact information is correct.</li>
                  <li>• Upload an updated resume in PDF format.</li>
                  <li>• Write a clear and professional cover letter.</li>
                  <li>• Review your application before submitting.</li>
                </ul>
              </div>
            </section>

            {/* RIGHT SIDE - APPLICATION FORM */}
            <section className="p-6 md:p-9">
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-8">
                <span>02</span>
                <span className="w-8 h-px bg-gray-700"></span>
                <span className="text-gray-300">APPLICANT INFORMATION</span>
              </div>

              <div className="mb-7">
                <h2 className="text-xl font-semibold">Your Application</h2>

                <p className="text-xs text-gray-500 mt-2">
                  Please provide your information accurately.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-xs font-medium text-gray-400 mb-2"
                  >
                    Full Name <span className="text-red-400">*</span>
                  </label>

                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    defaultValue={user?.name || ""}
                    placeholder="Enter your full name"
                    className="w-full h-11 px-4 bg-[#1c1c1c] border border-[#353535] rounded-lg text-sm text-white placeholder:text-gray-600 outline-none focus:border-indigo-500 transition"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-medium text-gray-400 mb-2"
                  >
                    Email Address <span className="text-red-400">*</span>
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    defaultValue={user?.email || ""}
                    placeholder="email@example.com"
                    className="w-full h-11 px-4 bg-[#1c1c1c] border border-[#353535] rounded-lg text-sm text-white placeholder:text-gray-600 outline-none focus:border-indigo-500 transition"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs font-medium text-gray-400 mb-2"
                  >
                    Phone Number <span className="text-red-400">*</span>
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+880 1XXXXXXXXX"
                    className="w-full h-11 px-4 bg-[#1c1c1c] border border-[#353535] rounded-lg text-sm text-white placeholder:text-gray-600 outline-none focus:border-indigo-500 transition"
                  />
                </div>

                {/* Location */}
                <div>
                  <label
                    htmlFor="applicantLocation"
                    className="block text-xs font-medium text-gray-400 mb-2"
                  >
                    Your Location
                  </label>

                  <input
                    id="applicantLocation"
                    name="applicantLocation"
                    type="text"
                    placeholder="City, Country"
                    className="w-full h-11 px-4 bg-[#1c1c1c] border border-[#353535] rounded-lg text-sm text-white placeholder:text-gray-600 outline-none focus:border-indigo-500 transition"
                  />
                </div>

                {/* LinkedIn */}
                <div>
                  <label
                    htmlFor="linkedin"
                    className="block text-xs font-medium text-gray-400 mb-2"
                  >
                    LinkedIn Profile
                  </label>

                  <input
                    id="linkedin"
                    name="linkedin"
                    type="url"
                    placeholder="https://linkedin.com/in/your-profile"
                    className="w-full h-11 px-4 bg-[#1c1c1c] border border-[#353535] rounded-lg text-sm text-white placeholder:text-gray-600 outline-none focus:border-indigo-500 transition"
                  />
                </div>

                {/* Portfolio */}
                <div>
                  <label
                    htmlFor="portfolio"
                    className="block text-xs font-medium text-gray-400 mb-2"
                  >
                    Portfolio / Personal Website
                  </label>

                  <input
                    id="portfolio"
                    name="portfolio"
                    type="url"
                    placeholder="https://yourportfolio.com"
                    className="w-full h-11 px-4 bg-[#1c1c1c] border border-[#353535] rounded-lg text-sm text-white placeholder:text-gray-600 outline-none focus:border-indigo-500 transition"
                  />
                </div>

                {/* Resume Upload */}
                <div>
                  <label
                    htmlFor="resume"
                    className="block text-xs font-medium text-gray-400 mb-2"
                  >
                    Upload Resume / CV <span className="text-red-400">*</span>
                  </label>

                  <div className="relative border border-dashed border-[#454545] rounded-lg bg-[#1b1b1b] p-6 text-center hover:border-indigo-500 transition">
                    <div className="text-3xl text-gray-500 mb-3">↑</div>

                    <p className="text-sm text-gray-300 mb-2">
                      Choose your resume file
                    </p>

                    <p className="text-xs text-gray-500">PDF, DOC or DOCX</p>

                    <input
                      id="resume"
                      name="resume"
                      // type="file"
                      type="text"
                      required
                      accept=".pdf,.doc,.docx"
                      className="block w-full mt-4 text-xs text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-indigo-600 file:text-white file:font-medium hover:file:bg-indigo-700 file:cursor-pointer"
                    />
                  </div>
                </div>

                {/* Cover Letter */}
                <div>
                  <label
                    htmlFor="coverLetter"
                    className="block text-xs font-medium text-gray-400 mb-2"
                  >
                    Cover Letter <span className="text-red-400">*</span>
                  </label>

                  <textarea
                    id="coverLetter"
                    name="coverLetter"
                    required
                    rows={6}
                    placeholder="Tell the employer why you're a good fit for this position..."
                    className="w-full p-4 bg-[#1c1c1c] border border-[#353535] rounded-lg text-sm text-white placeholder:text-gray-600 outline-none focus:border-indigo-500 transition resize-y"
                  />
                </div>

                {/* Agreement */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 accent-indigo-500"
                  />

                  <span className="text-xs text-gray-400 leading-5">
                    I confirm that the information provided in this application
                    is accurate and complete.
                  </span>
                </label>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition shadow-lg shadow-blue-600/10"
                >
                  Submit Application →
                </button>

                <p className="text-center text-[11px] text-gray-600">
                  Your information will be shared with the hiring company.
                </p>
              </form>
            </section>
          </div>

          {/* Footer */}
          <div className="border-t border-[#303030] py-6 px-6 text-center">
            <p className="text-xs text-gray-500">
              Powered by{" "}
              <span className="text-white font-semibold">HireLoop</span>
            </p>

            <p className="text-[10px] text-gray-600 mt-2">
              Connecting talented people with great opportunities.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default JobApply;
