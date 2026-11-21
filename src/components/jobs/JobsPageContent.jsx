
"use client";

import { useState } from "react";
import JobCard from "@/components/jobs/JobCard";
import {
  SearchX,
  SlidersHorizontal,
  ChevronDown,
  X,
  Search,
} from "lucide-react";

const categories = [
  "technology",
  "design",
  "marketing",
  "business",
  "finance",
  "education",
  "healthcare",
  "other",
];

const jobTypes = [
  "full-time",
  "part-time",
  "contract",
  "internship",
  "freelance",
];

const experienceLevels = [
  "entry",
  "junior",
  "mid",
  "senior",
  "lead",
  "any",
];

const initialFilters = {
  search: "",
  category: [],
  jobType: [],
  experienceLevel: [],
  workplace: "",
  salaryMin: "",
  salaryMax: "",
  currency: "",
  sort: "recent",
};

// Convert text or arrays into searchable text
const getSearchableText = (value) => {
  if (Array.isArray(value)) {
    return value.join(" ").toLowerCase();
  }

  return String(value || "").toLowerCase();
};

const JobsPageContent = ({ jobs = [] }) => {
  const [filterOpen, setFilterOpen] = useState(false);

  // Filter values currently selected in the UI
  const [filters, setFilters] = useState({ ...initialFilters });

  // Filters applied to the jobs list
  const [appliedFilters, setAppliedFilters] = useState({
    ...initialFilters,
  });

  // Update a single filter
  const updateFilter = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Toggle checkbox filters
  const toggleArrayFilter = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter((item) => item !== value)
        : [...prev[name], value],
    }));
  };

  // Apply selected filters
  const applyFilters = (e) => {
    e?.preventDefault();

    if (
      filters.salaryMin !== "" &&
      filters.salaryMax !== "" &&
      Number(filters.salaryMin) > Number(filters.salaryMax)
    ) {
      alert("Minimum salary cannot exceed maximum salary.");
      return;
    }

    setAppliedFilters({ ...filters });
    setFilterOpen(false);
  };

  // Reset filters
  const resetFilters = () => {
    const reset = { ...initialFilters };

    setFilters(reset);
    setAppliedFilters(reset);
    setFilterOpen(false);
  };

  // Sort jobs locally
  const handleSortChange = (value) => {
    const updatedFilters = {
      ...filters,
      sort: value,
    };

    setFilters(updatedFilters);

    setAppliedFilters((prev) => ({
      ...prev,
      sort: value,
    }));
  };

  // Filter jobs locally using props
  const filteredJobs = jobs.filter((job) => {
    const search = appliedFilters.search.trim().toLowerCase();

    // Search
    const searchableFields = [
      job.title,
      job.companyName,
      job.category,
      job.responsibilities,
      job.requirements,
    ];

    const searchMatch =
      !search ||
      searchableFields.some((field) =>
        getSearchableText(field).includes(search)
      );

    // Category
    const categoryMatch =
      appliedFilters.category.length === 0 ||
      appliedFilters.category.includes(job.category);

    // Job Type
    const jobTypeMatch =
      appliedFilters.jobType.length === 0 ||
      appliedFilters.jobType.includes(job.jobType);

    // Experience Level
    const experienceMatch =
      appliedFilters.experienceLevel.length === 0 ||
      appliedFilters.experienceLevel.includes(job.experienceLevel);

    // Workplace
    const workplaceMatch =
      !appliedFilters.workplace ||
      (appliedFilters.workplace === "remote"
        ? job.location?.isRemote === true
        : job.location?.isRemote === false);

    // Currency
    const currencyMatch =
      !appliedFilters.currency ||
      job.salary?.currency === appliedFilters.currency;

    // Salary range
    const salaryMatch =
      (appliedFilters.salaryMin === "" ||
        Number(job.salary?.max || 0) >=
          Number(appliedFilters.salaryMin)) &&
      (appliedFilters.salaryMax === "" ||
        Number(job.salary?.min || 0) <=
          Number(appliedFilters.salaryMax));

    return (
      searchMatch &&
      categoryMatch &&
      jobTypeMatch &&
      experienceMatch &&
      workplaceMatch &&
      currencyMatch &&
      salaryMatch
    );
  });

  // Sort filtered jobs
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (appliedFilters.sort === "oldest") {
      return (
        new Date(a.createdAt || 0).getTime() -
        new Date(b.createdAt || 0).getTime()
      );
    }

    if (appliedFilters.sort === "salary-high") {
      return Number(b.salary?.max || 0) -
        Number(a.salary?.max || 0);
    }

    if (appliedFilters.sort === "salary-low") {
      return Number(a.salary?.min || 0) -
        Number(b.salary?.min || 0);
    }

    return (
      new Date(b.createdAt || 0).getTime() -
      new Date(a.createdAt || 0).getTime()
    );
  });

  // Filter UI
  const FilterContent = () => (
    <>
      {/* Category */}
      <div className="mb-7">
        <h3 className="mb-4 text-xs font-medium text-gray-300">
          Category
        </h3>

        <div className="space-y-3 text-sm text-gray-400">
          {categories.map((category) => (
            <label
              key={category}
              className="flex cursor-pointer items-center gap-3 capitalize"
            >
              <input
                type="checkbox"
                checked={filters.category.includes(category)}
                onChange={() =>
                  toggleArrayFilter("category", category)
                }
                className="size-4 accent-indigo-500"
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      {/* Job Type */}
      <div className="mb-7 border-t border-white/[0.07] pt-6">
        <h3 className="mb-4 text-xs font-medium text-gray-300">
          Job Type
        </h3>

        <div className="space-y-3 text-sm text-gray-400">
          {jobTypes.map((type) => (
            <label
              key={type}
              className="flex cursor-pointer items-center gap-3 capitalize"
            >
              <input
                type="checkbox"
                checked={filters.jobType.includes(type)}
                onChange={() => toggleArrayFilter("jobType", type)}
                className="size-4 accent-indigo-500"
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="mb-7 border-t border-white/[0.07] pt-6">
        <h3 className="mb-4 text-xs font-medium text-gray-300">
          Experience Level
        </h3>

        <div className="space-y-3 text-sm text-gray-400">
          {experienceLevels.map((level) => (
            <label
              key={level}
              className="flex cursor-pointer items-center gap-3 capitalize"
            >
              <input
                type="checkbox"
                checked={filters.experienceLevel.includes(level)}
                onChange={() =>
                  toggleArrayFilter("experienceLevel", level)
                }
                className="size-4 accent-indigo-500"
              />
              {level === "any" ? "Any Experience" : level}
            </label>
          ))}
        </div>
      </div>

      {/* Workplace */}
      <div className="mb-7 border-t border-white/[0.07] pt-6">
        <h3 className="mb-4 text-xs font-medium text-gray-300">
          Workplace
        </h3>

        <div className="space-y-3 text-sm text-gray-400">
          {["remote", "on-site"].map((type) => (
            <label
              key={type}
              className="flex cursor-pointer items-center gap-3 capitalize"
            >
              <input
                type="radio"
                name="workplace"
                checked={filters.workplace === type}
                onChange={() => updateFilter("workplace", type)}
                className="size-4 accent-indigo-500"
              />
              {type}
            </label>
          ))}

          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="radio"
              name="workplace"
              checked={filters.workplace === ""}
              onChange={() => updateFilter("workplace", "")}
              className="size-4 accent-indigo-500"
            />
            All workplaces
          </label>
        </div>
      </div>

      {/* Salary */}
      <div className="border-t border-white/[0.07] pt-6">
        <h3 className="mb-4 text-xs font-medium text-gray-300">
          Salary Range
        </h3>

        <div className="space-y-3">
          <input
            type="number"
            min="0"
            placeholder="Minimum salary"
            value={filters.salaryMin}
            onChange={(e) =>
              updateFilter("salaryMin", e.target.value)
            }
            className="w-full rounded-lg border border-white/10 bg-[#242424] px-3 py-2 text-sm text-white outline-none focus:border-indigo-500"
          />

          <input
            type="number"
            min="0"
            placeholder="Maximum salary"
            value={filters.salaryMax}
            onChange={(e) =>
              updateFilter("salaryMax", e.target.value)
            }
            className="w-full rounded-lg border border-white/10 bg-[#242424] px-3 py-2 text-sm text-white outline-none focus:border-indigo-500"
          />

          <select
            value={filters.currency}
            onChange={(e) =>
              updateFilter("currency", e.target.value)
            }
            className="w-full rounded-lg border border-white/10 bg-[#242424] px-3 py-2 text-sm text-white outline-none"
          >
            <option value="">All currencies</option>
            <option value="BDT">BDT (৳)</option>
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="INR">INR (₹)</option>
          </select>
        </div>
      </div>

      {/* Filter Actions */}
      <div className="mt-7 flex gap-2 border-t border-white/[0.07] pt-5">
        <button
          type="submit"
          className="flex-1 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500"
        >
          Apply Filters
        </button>

        <button
          type="button"
          onClick={resetFilters}
          className="rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-300 hover:bg-white/5"
        >
          Reset
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#111111] px-4 py-8 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm text-indigo-400">
            Explore opportunities
          </p>

          <h1 className="text-3xl font-semibold tracking-tight">
            Find your next job
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Discover opportunities that match your skills and career goals.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">

          {/* Desktop Sidebar */}
          <aside className="hidden h-fit rounded-xl border border-white/[0.07] bg-[#1a1a1a] p-5 lg:block">
            <form onSubmit={applyFilters}>
              <div className="mb-6 flex items-center gap-2">
                <SlidersHorizontal
                  size={17}
                  className="text-gray-400"
                />
                <h2 className="font-semibold">Filters</h2>
              </div>

              <FilterContent />
            </form>
          </aside>

          {/* Jobs Section */}
          <main className="min-w-0">

            {/* Search */}
            <div className="mb-5 space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex flex-1 items-center gap-3 rounded-lg border border-white/10 bg-[#1c1c1c] px-4">
                  <Search size={18} className="text-gray-500" />

                  <input
                    type="search"
                    value={filters.search}
                    onChange={(e) =>
                      updateFilter("search", e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        applyFilters(e);
                      }
                    }}
                    placeholder="Search jobs, companies, or skills..."
                    className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-gray-500"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => applyFilters()}
                  className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium hover:bg-indigo-500"
                >
                  Search
                </button>
              </div>

              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-medium">
                    Found {sortedJobs.length} Jobs
                  </h2>

                  <p className="mt-1 text-xs text-gray-500">
                    Browse the latest opportunities
                  </p>
                </div>

                <div className="flex items-center gap-2">

                  {/* Mobile Filters */}
                  <div className="relative lg:hidden">
                    <button
                      type="button"
                      onClick={() => setFilterOpen(!filterOpen)}
                      className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#1c1c1c] px-3 py-2 text-xs text-gray-200 hover:bg-[#252525]"
                    >
                      <SlidersHorizontal size={14} />
                      Filters

                      <ChevronDown
                        size={14}
                        className={`transition-transform ${
                          filterOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {filterOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-30"
                          onClick={() => setFilterOpen(false)}
                        />

                        <div className="absolute right-0 top-12 z-40 max-h-[75vh] w-72 overflow-y-auto rounded-xl border border-white/10 bg-[#1c1c1c] p-5 shadow-2xl">
                          <div className="mb-5 flex items-center justify-between">
                            <h3 className="font-semibold">Filters</h3>

                            <button
                              type="button"
                              onClick={() => setFilterOpen(false)}
                            >
                              <X
                                size={17}
                                className="text-gray-400"
                              />
                            </button>
                          </div>

                          <form onSubmit={applyFilters}>
                            <FilterContent />
                          </form>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Sort */}
                  <select
                    value={filters.sort}
                    onChange={(e) =>
                      handleSortChange(e.target.value)
                    }
                    className="rounded-lg border border-white/10 bg-[#1c1c1c] px-3 py-2 text-xs text-gray-200 outline-none"
                  >
                    <option value="recent">Most Recent</option>
                    <option value="oldest">Oldest</option>
                    <option value="salary-high">Salary: High to Low</option>
                    <option value="salary-low">Salary: Low to High</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Jobs */}
            {sortedJobs.length === 0 ? (
              <div className="flex min-h-[350px] flex-col items-center justify-center rounded-xl border border-white/[0.06] bg-[#1c1c1c] px-5 text-center">
                <SearchX size={35} className="mb-4 text-gray-500" />

                <h3 className="text-lg font-semibold">
                  No Jobs Found
                </h3>

                <p className="mt-2 max-w-sm text-sm text-gray-400">
                  No jobs match your search or selected filters.
                  Try changing your filters.
                </p>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-5 rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium hover:bg-indigo-500"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {sortedJobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default JobsPageContent;
