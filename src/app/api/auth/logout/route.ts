import { NextResponse } from "next/server";

import {
  clearSessionCookie,
  deleteSessionByToken,
  SESSION_COOKIE_NAME,
} from "@/lib/auth";

function getSessionTokenFromCookieHeader(cookieHeader: string) {
  return cookieHeader
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${SESSION_COOKIE_NAME}=`))
    ?.split("=")[1];
}

export async function POST(request: Request) {
  try {
    const sessionToken = getSessionTokenFromCookieHeader(request.headers.get("cookie") || "");

    await deleteSessionByToken(sessionToken);

    const response = NextResponse.json({ ok: true });
    clearSessionCookie(response);

    return response;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to sign out.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
