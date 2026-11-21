
import Link from "next/link";

const UnauthorizedPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#111111] px-4">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#1b1b1b] p-8 text-center shadow-2xl">

        {/* Error Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-10 w-10 text-red-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m0 3h.008M10.29 3.86l-8.1 14.02A1.5 1.5 0 003.49 20.1h17.02a1.5 1.5 0 001.3-2.22l-8.1-14.02a1.5 1.5 0 00-2.6 0z"
            />
          </svg>
        </div>

        {/* Error Code */}
        <h1 className="text-6xl font-extrabold tracking-tight text-white">
          403
        </h1>

        <h2 className="mt-4 text-2xl font-bold text-white">
          Access Denied
        </h2>

        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-400">
          Sorry! You don't have permission to access this page.
          Your account may not have the required role or access privileges.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Back to Home
          </Link>

          <Link
            href="/dashboard"
            className="rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-gray-300 transition hover:bg-white/10 hover:text-white"
          >
            Dashboard
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-10 border-t border-white/10 pt-5">
          <p className="text-sm font-bold text-white">
            Hire<span className="text-orange-500">Loop</span>
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Connecting talent with opportunity.
          </p>
        </div>

      </div>
    </div>
  );
};

export default UnauthorizedPage;
