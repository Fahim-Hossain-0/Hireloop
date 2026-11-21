"use client";

import { useEffect, useRef, useState } from "react";
import {
  createCompany,
  updateRecruiterCompany,
} from "@/lib/actions/companies";
import { toast } from "react-toastify";

const initialFormData = {
  companyName: "",
  industry: "Technology",
  website: "",
  location: "",
  employeeCount: "1-10 employees",
  description: "",
};

const CompanyProfileModal = ({
  isOpen,
  onClose,
  onSuccess,
  recruiter,
  recruiterCompany,
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [removeLogo, setRemoveLogo] = useState(false);

  const fileInputRef = useRef(null);

  const isEditing = Boolean(recruiterCompany?._id);

  // Load existing company information when editing.
  useEffect(() => {
    if (!isOpen) return;

    if (isEditing) {
      setFormData({
        companyName: recruiterCompany.companyName || "",
        industry: recruiterCompany.industry || "Technology",
        website: recruiterCompany.website || "",
        location: recruiterCompany.location || "",
        employeeCount:
          recruiterCompany.employeeCount || "1-10 employees",
        description: recruiterCompany.description || "",
      });

      setLogoPreview(recruiterCompany.logo || "");
    } else {
      setFormData(initialFormData);
      setLogoPreview("");
    }

    setLogo(null);
    setRemoveLogo(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [isOpen, isEditing, recruiterCompany]);

  // Create a temporary preview for a newly selected image.
  useEffect(() => {
    if (!logo) return;

    const objectUrl = URL.createObjectURL(logo);
    setLogoPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [logo]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = ["image/png", "image/jpeg"];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only PNG and JPG images are allowed.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5MB.");
      e.target.value = "";
      return;
    }

    setLogo(file);
    setRemoveLogo(false);
  };

  // Upload selected logo to ImgBB.
  const uploadImage = async () => {
    if (!logo) return null;

    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

    if (!apiKey) {
      throw new Error("ImgBB API key is missing.");
    }

    const imageData = new FormData();
    imageData.append("image", logo);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        method: "POST",
        body: imageData,
      }
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      throw new Error(
        result.error?.message || "Company logo upload failed."
      );
    }

    return result.data.display_url;
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setLogo(null);
    setLogoPreview("");
    setRemoveLogo(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClose = () => {
    if (loading) return;

    resetForm();
    onClose?.();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.companyName.trim()) {
      toast.error("Company name is required.");
      return;
    }

    if (!recruiter?.id) {
      toast.error("Please login first.");
      return;
    }

    try {
      setLoading(true);

      // Upload a new logo only when the user selects one.
      const uploadedLogo = await uploadImage();

      const companyData = {
        companyName: formData.companyName.trim(),
        industry: formData.industry,
        website: formData.website.trim(),
        location: formData.location.trim(),
        employeeCount: formData.employeeCount,
        description: formData.description.trim(),

        // Keep the previous logo unless a new one is selected
        // or the user explicitly removes it.
        logo: uploadedLogo
          ? uploadedLogo
          : removeLogo
            ? ""
            : recruiterCompany?.logo || "",
      };

      let result;

      if (isEditing) {
        // Existing company: update and send for review again.
        result = await updateRecruiterCompany(companyData);
      } else {
        // First-time company creation: initial status is pending.
        result = await createCompany({
          ...companyData,
          recruiterId: recruiter.id,
        });
      }

      if (!result?.ok) {
        throw new Error(
          result?.message ||
            `Company profile ${isEditing ? "update" : "creation"} failed.`
        );
      }

      // Build the updated company object for immediate UI update.
      const updatedCompany = {
        ...(recruiterCompany || {}),
        ...companyData,
        recruiterId: recruiter.id,
        status: isEditing ? "underReview" : "pending",
        ...(isEditing
          ? { updatedAt: new Date().toISOString() }
          : { createdAt: new Date().toISOString() }),
      };

      // Use the inserted ID for a newly created company.
      if (!isEditing && result.insertedId) {
        updatedCompany._id = result.insertedId;
      }

      onSuccess?.({
        ...result,
        ok: true,
        company: updatedCompany,
        message: isEditing
          ? "Company profile updated and submitted for review."
          : "Company profile created successfully.",
      });

      resetForm();
    } catch (error) {
      console.error("COMPANY PROFILE ERROR:", error);
      toast.error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const inputClass =
    "mt-2 w-full rounded-md border border-[#303030] bg-[#202020] px-4 py-2.5 text-xs text-white outline-none placeholder:text-gray-500 focus:border-gray-500 transition";

  const labelClass = "text-xs font-medium text-gray-200";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div className="max-h-[90vh] w-full max-w-[510px] overflow-y-auto rounded-lg border border-[#383838] bg-[#151515] shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#303030] bg-[#1e1e1e] px-6 py-5">
          <div>
            <h2 className="text-base font-semibold text-white">
              {isEditing
                ? "Update Company Profile"
                : "Create Company Profile"}
            </h2>

            <p className="mt-1 text-[11px] text-gray-400">
              {isEditing
                ? "Update your company information."
                : "Add your company details to start hiring on HireLoop."}
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="text-xl text-gray-400 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-x-5 gap-y-5 px-6 py-6 sm:grid-cols-2">
            {/* Company Name */}
            <div className="sm:col-span-2">
              <label className={labelClass}>
                Company Name <span className="text-red-400">*</span>
              </label>

              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="e.g. HireLoop Technologies"
                required
                maxLength={100}
                className={inputClass}
              />
            </div>

            {/* Industry */}
            <div>
              <label className={labelClass}>Industry</label>

              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="Technology">Technology</option>
                <option value="Software">Software</option>
                <option value="Education">Education</option>
                <option value="Finance">Finance</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Marketing">Marketing</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Employee Count */}
            <div>
              <label className={labelClass}>Company Size</label>

              <select
                name="employeeCount"
                value={formData.employeeCount}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="1-10 employees">1-10 employees</option>
                <option value="11-50 employees">11-50 employees</option>
                <option value="51-200 employees">51-200 employees</option>
                <option value="201-500 employees">201-500 employees</option>
                <option value="501-1000 employees">501-1000 employees</option>
                <option value="1000+ employees">1000+ employees</option>
              </select>
            </div>

            {/* Website */}
            <div>
              <label className={labelClass}>Company Website</label>

              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://example.com"
                className={inputClass}
              />
            </div>

            {/* Location */}
            <div>
              <label className={labelClass}>Location</label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Dhaka, Bangladesh"
                className={inputClass}
              />
            </div>

            {/* Company Logo */}
            <div className="sm:col-span-2">
              <label className={labelClass}>Company Logo</label>

              <div className="mt-2 flex items-center gap-4 rounded-md border border-dashed border-[#383838] bg-[#202020] p-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-md border border-[#383838] bg-[#292929]">
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="Company logo preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl text-gray-500">+</span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-white">
                    Upload company logo
                  </p>

                  <p className="mt-1 text-[10px] text-gray-500">
                    PNG or JPG, maximum 5MB
                  </p>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg"
                    onChange={handleLogoChange}
                    className="hidden"
                  />

                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-2 text-xs font-medium text-blue-400 hover:text-blue-300 disabled:opacity-50"
                  >
                    {logoPreview ? "Change image" : "Choose image"}
                  </button>

                  {logoPreview && (
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => {
                        setLogo(null);
                        setLogoPreview("");
                        setRemoveLogo(true);

                        if (fileInputRef.current) {
                          fileInputRef.current.value = "";
                        }
                      }}
                      className="ml-3 text-xs text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label className={labelClass}>Company Description</label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Tell candidates about your company..."
                rows={4}
                maxLength={1000}
                className={`${inputClass} resize-none`}
              />

              <p className="mt-1 text-right text-[10px] text-gray-500">
                {formData.description.length}/1000
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-[#303030] bg-[#1e1e1e] px-6 py-5">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="rounded-md border border-[#383838] px-4 py-2.5 text-xs font-medium text-gray-300 transition hover:bg-[#292929] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-white px-5 py-2.5 text-xs font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : isEditing
                  ? "Update Company Profile"
                  : "Save Company Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyProfileModal;