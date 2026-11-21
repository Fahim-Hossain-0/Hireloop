
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, X, ArrowRight, Sparkles, Zap, Crown, HelpCircle, ChevronDown } from "lucide-react";

const seekerPlans = [
  {
    name: "Free",
    id:"seeker_Free",
    price: 0,
    description: "Everything you need to start your job search.",
    icon: Zap,
    features: [
      "Browse up to 10 jobs",
      "Save up to 10 jobs",
      "Apply to 3 jobs per month",
      "Basic candidate profile",
      "Email job alerts",
    ],
    popular: false,
    button: "Get Started",
  },
  {
    name: "Pro",
    id:"seeker_Pro",
    price: 19,
    description: "Take your job search to the next level.",
    icon: Sparkles,
    features: [
      "Apply to 30 jobs per month",
      "Unlimited saved jobs",
      "Application tracking",
      "Salary insights",
      "Advanced job search",
    ],
    popular: true,
    button: "Upgrade to Pro",
  },
  {
    name: "Premium",
    id:"seeker_Premium",
    price: 39,
    description: "Get every advantage in your career journey.",
    icon: Crown,
    features: [
      "Everything in Pro",
      "Unlimited applications",
      "Profile boost to recruiters",
      "Early access to new jobs",
      "Priority customer support",
    ],
    popular: false,
    button: "Get Premium",
  },
];

const recruiterPlans = [
  {
    name: "Free",
    id:"recruiter_Free",
    price: 0,
    description: "A simple way to start hiring great talent.",
    icon: Zap,
    features: [
      "Up to 3 active job posts",
      "Basic applicant management",
      "Standard listing visibility",
      "Basic company profile",
      "Standard hiring tools",
    ],
    popular: false,
    button: "Get Started",
  },
  {
    name: "Growth",
     id:"recruiter_Growth",
    price: 49,
    description: "Grow your team with smarter hiring tools.",
    icon: Sparkles,
    features: [
      "Up to 10 active job posts",
      "Applicant tracking",
      "Basic analytics",
      "Email support",
      "Manage hiring efficiently",
    ],
    popular: true,
    button: "Choose Growth",
  },
  {
    name: "Enterprise",
     id:"recruiter_Enterprise",
    price: 149,
    description: "Powerful hiring solutions for growing teams.",
    icon: Crown,
    features: [
      "Up to 50 active job posts",
      "Advanced analytics dashboard",
      "Featured job listings",
      "Team collaboration",
      "Custom branding",
      "Priority support",
    ],
    popular: false,
    button: "Choose Enterprise",
  },
];

const faqs = [
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes! You can cancel your subscription anytime. Your current plan remains active until the end of your billing period.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Refund eligibility depends on our refund policy. Please contact our support team for assistance with a billing issue.",
  },
  {
    question: "What payment methods are supported?",
    answer:
      "You can pay using the payment methods supported by our secure checkout provider.",
  },
  {
    question: "Can I switch my plan later?",
    answer:
      "Absolutely! You can upgrade or switch your subscription plan whenever your hiring or job-search needs change.",
  },
  {
    question: "Is there a free plan?",
    answer:
      "Yes. Both job seekers and recruiters can start with a free plan without paying a subscription fee.",
  },
];

const PlanesPage = () => {
  const [activeTab, setActiveTab] = useState("seeker");
  const [openFaq, setOpenFaq] = useState(0);

  const plans = activeTab === "seeker" ? seekerPlans : recruiterPlans;

  return (
    <main className="min-h-screen bg-[#151515] text-white">

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="absolute w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full -top-40 left-1/2 -translate-x-1/2" />

        <div className="relative max-w-7xl mx-auto px-4 pt-20 pb-14 text-center">

          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-6">
            <Sparkles size={14} />
            SIMPLE & TRANSPARENT PRICING
          </span>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            Plans that move your
            <span className="block text-indigo-400 mt-2">
              career forward.
            </span>
          </h1>

          <p className="max-w-xl mx-auto text-gray-400 mt-6 leading-7 text-sm md:text-base">
            Whether you're looking for your next opportunity or building
            an amazing team, we have the right plan for you.
          </p>

          {/* Toggle */}
          <div className="mt-10 inline-flex p-1.5 rounded-xl bg-[#222] border border-[#383838]">

            <button
              onClick={() => setActiveTab("seeker")}
              className={`px-5 md:px-7 py-3 rounded-lg text-sm font-semibold transition ${
                activeTab === "seeker"
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              For Job Seekers
            </button>

            <button
              onClick={() => setActiveTab("recruiter")}
              className={`px-5 md:px-7 py-3 rounded-lg text-sm font-semibold transition ${
                activeTab === "recruiter"
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              For Recruiters
            </button>

          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-7xl mx-auto px-4 py-16">

        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold">
            Choose your perfect plan
          </h2>
          <p className="text-sm text-gray-500 mt-3">
            Flexible pricing designed around your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {plans.map((plan) => {
            const Icon = plan.icon;

            return (
              <div
                key={`${activeTab}-${plan.name}`}
                className={`relative flex flex-col p-7 rounded-2xl border transition duration-300 hover:-translate-y-1 ${
                  plan.popular
                    ? "bg-gradient-to-b from-indigo-950/70 to-[#1c1c1c] border-indigo-500/60 shadow-xl shadow-indigo-950/20"
                    : "bg-[#1c1c1c] border-[#353535] hover:border-indigo-500/40"
                }`}
              >

                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-indigo-600 text-white text-[10px] font-bold tracking-wider uppercase whitespace-nowrap">
                    Most Popular
                  </span>
                )}

                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6">
                  <Icon size={23} />
                </div>

                <h3 className="text-xl font-bold">{plan.name}</h3>

                <p className="text-sm text-gray-400 mt-2 min-h-10">
                  {plan.description}
                </p>

                <div className="flex items-end gap-1 mt-7 mb-2">
                  <span className="text-4xl font-bold">
                    ${plan.price}
                  </span>
                  <span className="text-gray-500 text-sm mb-1">
                    {plan.price === 0 ? "/ forever" : "/ month"}
                  </span>
                </div>

                <div className="border-t border-white/10 my-6" />

                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-5">
                  What's included
                </p>

                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-gray-300"
                    >
                      <span className="mt-0.5 text-indigo-400 shrink-0">
                        <Check size={17} />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                     

                 <form action="/api/checkout_sessions" method="POST">
  <input
    type="hidden"
    name="plan_id"
    value={plan.id}
  />

  <button
    type="submit"
    disabled={plan.price === 0}
    className={`w-full py-3.5 rounded-xl text-sm font-semibold transition ${
      plan.popular
        ? "bg-indigo-600 hover:bg-indigo-700 text-white"
        : "bg-[#292929] hover:bg-[#353535] border border-[#414141] text-white"
    } ${
      plan.price === 0
        ? "opacity-50 cursor-not-allowed"
        : ""
    }`}
  >
    {plan.price === 0 ? "Current Free Plan" : "Checkout"}
  </button>
</form>
                     
                

              </div>
            );
          })}

        </div>
      </section>

      {/* Benefits */}
      <section className="border-y border-white/5 bg-[#191919]">
        <div className="max-w-7xl mx-auto px-4 py-16">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">

            <div>
              <div className="text-indigo-400 text-3xl font-bold mb-3">
                01
              </div>
              <h3 className="font-semibold mb-2">No Hidden Fees</h3>
              <p className="text-sm text-gray-500">
                Transparent pricing with no unexpected charges.
              </p>
            </div>

            <div>
              <div className="text-indigo-400 text-3xl font-bold mb-3">
                02
              </div>
              <h3 className="font-semibold mb-2">Flexible Plans</h3>
              <p className="text-sm text-gray-500">
                Choose a plan that fits your current needs.
              </p>
            </div>

            <div>
              <div className="text-indigo-400 text-3xl font-bold mb-3">
                03
              </div>
              <h3 className="font-semibold mb-2">Easy Upgrades</h3>
              <p className="text-sm text-gray-500">
                Upgrade whenever you're ready for more.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 py-20">

        <div className="text-center mb-12">
          <span className="text-indigo-400 text-xs font-bold tracking-[3px] uppercase">
            FAQ
          </span>

          <h2 className="text-3xl font-bold mt-4">
            Frequently asked questions
          </h2>

          <p className="text-sm text-gray-400 mt-3">
            Everything you need to know about our plans.
          </p>
        </div>

        <div className="space-y-3">

          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="border border-[#353535] rounded-xl bg-[#1c1c1c] overflow-hidden"
            >

              <button
                onClick={() =>
                  setOpenFaq(openFaq === index ? -1 : index)
                }
                className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-white/[0.02] transition"
              >
                <span className="text-sm font-semibold">
                  {faq.question}
                </span>

                <ChevronDown
                  size={18}
                  className={`text-indigo-400 shrink-0 transition-transform ${
                    openFaq === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openFaq === index && (
                <div className="px-5 pb-5 text-sm text-gray-400 leading-7 border-t border-white/5 pt-4">
                  {faq.answer}
                </div>
              )}

            </div>
          ))}

        </div>

      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 pb-20">

        <div className="relative overflow-hidden rounded-2xl border border-indigo-500/20 bg-gradient-to-r from-indigo-950/80 to-[#242039] p-8 md:p-12 text-center">

          <h2 className="text-2xl md:text-3xl font-bold">
            Ready to take the next step?
          </h2>

          <p className="text-sm text-gray-400 mt-3 mb-7">
            Join HireLoop and discover better opportunities today.
          </p>

          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-sm font-semibold transition"
          >
            Explore Opportunities
            <ArrowRight size={17} />
          </Link>

        </div>

      </section>

    </main>
  );
};

export default PlanesPage;
