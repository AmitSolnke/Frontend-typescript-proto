import axiosTicketing from "./axiosTicketing"
 
interface LoginPayload {
  username: string
  password: string
}
 
interface LoginApiResponse {
  status: number
  message: string
  token: string
}
 
export const loginUser = async (
  payload: LoginPayload,
): Promise<LoginApiResponse> => {
  const res = await axiosTicketing.post<LoginApiResponse>("login", payload)
  console.log("sssssss", res)
  return res
}