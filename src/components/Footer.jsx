
"use client";
import Link from "next/link";
import { Button } from "@gravity-ui/uikit";

const Footer = () => {
  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Job discovery", href: "/jobs" },
        { name: "Worker AI", href: "/worker-ai" },
        { name: "Companies", href: "/companies" },
        { name: "Salary data", href: "/salary-data" },
      ],
    },
    {
      title: "Navigations",
      links: [
        { name: "Help center", href: "/help" },
        { name: "Career library", href: "/career-library" },
        { name: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Brand Guideline", href: "/brand-guideline" },
        { name: "Newsroom", href: "/newsroom" },
      ],
    },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://facebook.com",
      letter: "f",
    },
    {
      name: "Pinterest",
      href: "https://pinterest.com",
      letter: "p",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      letter: "in",
    },
  ];

  return (
    <footer className="border-t border-white/10 bg-black px-5 py-10 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-flex text-2xl font-bold tracking-tight"
            >
              <span className="text-sky-500">hirel</span>
              <span className="text-orange-500">oop</span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-gray-500">
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>
          </div>

          {/* Footer Link Columns */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="mb-5 text-sm font-medium text-indigo-400">
                {section.title}
              </h3>

              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 transition-colors duration-200 hover:text-white"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 flex flex-col gap-6 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Social Links */}
          <div className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <Button
                key={social.name}
                view="flat"
                size="l"
                className="!h-9 !min-w-9 !rounded-md !bg-white/[0.06] !p-0 !text-sm !font-bold !text-gray-400 hover:!bg-indigo-500/20 hover:!text-indigo-400"
                onClick={() => window.open(social.href, "_blank", "noopener,noreferrer")}
                aria-label={social.name}
              >
                {social.letter}
              </Button>
            ))}
          </div>

          {/* Copyright and Legal Links */}
          <div className="flex flex-col gap-3 text-xs text-gray-500 sm:flex-row sm:items-center sm:gap-5">
            <p>Copyright 2024 — Programming Hero</p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/terms"
                className="transition-colors hover:text-white"
              >
                Terms &amp; Policy
              </Link>

              <span className="hidden sm:inline">·</span>

              <Link
                href="/privacy"
                className="transition-colors hover:text-white"
              >
                Privacy Guideline
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;