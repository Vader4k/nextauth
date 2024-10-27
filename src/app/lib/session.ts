import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function generateSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  const session = await createSession({userId, expiresAt})

  ;(await cookies()).set("session", session ,{
    path: "/",
    expires: expiresAt,
    sameSite: "strict",
    secure: true,
    httpOnly: true,
  })
}

type SessionPayload = {
  userId: string;
  expiresAt: Date;
};

export async function createSession(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function verifySession(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log(error, "failed to verify session");
  }
}

export async function destroySession() {
  ;(await cookies()).delete("session");
}