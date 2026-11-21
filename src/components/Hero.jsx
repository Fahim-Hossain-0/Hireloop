

import React from "react";
import Link from "next/link";
import { Button } from "@gravity-ui/uikit";
import bgImage from "../../public/images/globe.png"
const Hero = () => {
  const trendingPositions = [
    "Product Designer",
    "AI Engineering",
    "Dev-ops Engineer",
  ];

  const stats = [
    {
      icon: "◉",
      value: "50K",
      label: "Active Jobs",
    },
    {
      icon: "♧",
      value: "12K",
      label: "Companies",
    },
    {
      icon: "◎",
      value: "2M",
      label: "Job Seekers",
    },
    {
      icon: "☆",
      value: "97%",
      label: "Satisfaction Rate",
    },
  ];

  return (
    <section className="relative isolate min-h-[850px] overflow-hidden bg-black text-white sm:min-h-[900px]">
      {/* Background Image */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/globe.png)',
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/30 to-black" />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 pt-24 text-center sm:px-6 sm:pt-28 lg:px-8 lg:pt-24">
        {/* Jobs Badge */}
        <div className="mb-6 flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 shadow-lg backdrop-blur-md">
          <span className="text-sm">💼</span>

          <span className="font-mono text-xs font-bold tracking-wide text-white sm:text-sm">
            50,000+
          </span>

          <span className="text-[10px] uppercase tracking-wider text-gray-400 sm:text-xs">
            New Jobs This Month
          </span>
        </div>

        {/* Heading */}
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          Find Your Dream Job{" "}
          <span className="bg-gradient-to-r from-indigo-300 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Today
          </span>
        </h1>

        <p className="mt-5 max-w-xl text-sm leading-6 text-gray-400 sm:text-base sm:leading-7">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* Job Search Form */}
        <form
          action="/jobs"
          method="GET"
          className="mt-8 flex w-full max-w-2xl flex-col gap-3 rounded-2xl border border-white/10 bg-[#111111]/90 p-2 shadow-2xl shadow-indigo-950/30 backdrop-blur-xl sm:flex-row sm:items-center sm:rounded-xl"
        >
          {/* Job Title */}
          <div className="flex min-w-0 flex-1 items-center gap-3 px-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              className="shrink-0 text-gray-400"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m16 16 4 4" />
            </svg>

            <input
              type="text"
              name="q"
              placeholder="Job title, skill or company"
              aria-label="Job title, skill or company"
              className="h-11 w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
            />
          </div>

          <div className="hidden h-7 w-px bg-white/10 sm:block" />

          {/* Location */}
          <div className="flex min-w-0 flex-1 items-center gap-3 px-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              className="shrink-0 text-gray-400"
            >
              <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>

            <input
              type="text"
              name="location"
              placeholder="Location or Remote"
              aria-label="Location or Remote"
              className="h-11 w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
            />
          </div>

          {/* Search Button */}
          <Button
            type="submit"
            view="action"
            size="xl"
            aria-label="Search jobs"
            className="!h-11 !min-w-12 !rounded-xl !bg-indigo-600 !px-4 !text-white transition hover:!bg-indigo-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m16 16 4 4" />
            </svg>
          </Button>
        </form>

        {/* Trending Positions */}
        <div className="mt-5 flex max-w-2xl flex-wrap items-center justify-center gap-2">
          <span className="mr-1 text-xs text-gray-500">
            Trending Positions
          </span>

          {trendingPositions.map((position) => (
            <Link
              key={position}
              href={`/jobs?q=${encodeURIComponent(position)}`}
              className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-[10px] text-gray-300 transition hover:border-indigo-400/50 hover:bg-indigo-500/15 hover:text-white sm:text-xs"
            >
              {position}
            </Link>
          ))}
        </div>
      </div>

      {/* Globe Section Text */}
      <div className="absolute left-1/2 top-[66%] z-10 w-full -translate-x-1/2 -translate-y-1/2 px-4 text-center sm:top-[68%]">
        <h2 className="mx-auto max-w-lg text-xl font-medium leading-relaxed text-white/80 sm:text-2xl sm:leading-9">
          Assisting over{" "}
          <span className="text-white">15,000 job seekers</span>
          <br className="hidden sm:block" /> find their dream positions.
        </h2>
      </div>

      {/* Statistics Cards */}
      <div className="absolute bottom-8 left-0 z-20 w-full px-4 sm:bottom-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group min-h-32 rounded-xl border border-white/[0.09] bg-gradient-to-br from-[#090909]/95 to-[#191919]/95 p-4 shadow-xl backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-indigo-500/40 sm:min-h-36 sm:p-5"
            >
              <div className="mb-5 text-lg text-gray-300 transition group-hover:text-indigo-400">
                {stat.icon}
              </div>

              <p className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {stat.value}
              </p>

              <p className="mt-2 text-xs text-gray-400 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;