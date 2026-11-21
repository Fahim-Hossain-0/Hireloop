"use server"

import { serverMutation, serverUpdate } from "../core/server"
import { getUserSession } from "../core/session"

export const createCompany =async(companyData)=>{
    return serverMutation("/api/companies",companyData)
}


export const updateRecruiterCompany = async(data)=>{
    const user = await getUserSession()

    if (!user?.id) {
    return {
      ok: false,
      message: "Please login first.",
    };
  }

  return serverUpdate(`/api/companies/${user.id}`,data)
}


export const updateCompanyStatus = async (companyId, status) => {
  return serverUpdate(`/api/companies/${companyId}/status`, {
    status,
  });
};