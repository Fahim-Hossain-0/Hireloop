import { serverFetch } from "../core/server"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
export const getCompanyJobs = async(companyId,status = "active")=>{
    const res = await fetch(`${baseUrl}/api/jobs?companyId=${companyId}&status=${status}`)
    return res.json()
}

export const getJobs = async (params = {}) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      query.set(key, value.join(","));
    } else if (value !== "" && value !== undefined && value !== null) {
      query.set(key, value);
    }
  });

  return serverFetch(`/api/jobs?${query.toString()}`);
};

export const getJobById= async(jobsId)=>{
  return serverFetch(`/api/jobs/${jobsId}`)
}