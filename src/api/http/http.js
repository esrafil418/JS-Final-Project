import { authHelper } from "../../utils/auth";

export function getAuthHeaders() {
  const token = authHelper.getToken();

  return {
    Authorization: `Bearer ${token}`,
    Accept: "*/*",
    "Content-Type": "application/json",
  };
}
