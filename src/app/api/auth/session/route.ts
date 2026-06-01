import { NextResponse } from "next/server";

import { getSessionUserFromToken, SESSION_COOKIE_NAME } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const cookieHeader = request.headers.get("cookie") || "";
    const sessionToken = cookieHeader
      .split(";")
      .map((item) => item.trim())
      .find((item) => item.startsWith(`${SESSION_COOKIE_NAME}=`))
      ?.split("=")[1];

    const user = await getSessionUserFromToken(sessionToken);

    return NextResponse.json({ user });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to load session.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
