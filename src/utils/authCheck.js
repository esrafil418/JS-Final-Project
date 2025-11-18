import { router } from "../utils/router";
import { probeToken } from "../api/authProbe";

export async function checkAuthAndMaybeRedirect(
  probeEndpoint = "/sneaker?page=1&limit=1"
) {
  const token = localStorage.getItem("token");
  if (!token) return false;

  const { ok } = await probeToken(token, probeEndpoint);

  if (ok) {
    router.navigate("/");
    return true;
  } else {
    localStorage.removeItem("token");
    return false;
  }
}
