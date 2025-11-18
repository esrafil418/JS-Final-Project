import { BASE_URL } from "../constants";

export async function probeToken(
  token,
  probeEndpoint = "/sneaker?page=1&limit=1"
) {
  if (!token) return { ok: false };

  try {
    const res = await fetch(`${BASE_URL}${probeEndpoint}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const body = await res.json().catch(() => null);
    return { ok: res.ok, status: res.status, body };
  } catch (err) {
    console.error("probeToken error:", err);
    return { ok: false, error: err };
  }
}
