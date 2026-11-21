// import RoleBasedSidebar from "@/components/dashboard/RoleBasedSidebar";

import RoleBasedSidebar from "@/components/deshboard/RoleBasedSidebar";

export default function RecruiterLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#111111]">
      <RoleBasedSidebar />

      <main className="min-w-0 flex-1 p-6">
        {children}
      </main>
    </div>
  );
}