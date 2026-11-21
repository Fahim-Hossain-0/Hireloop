import { serverMutation } from "../core/server"

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
export const createJob = async (jobData)=>{
    return serverMutation("/api/jobs",jobData)
}