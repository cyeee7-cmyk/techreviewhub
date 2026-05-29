import { NextResponse } from "next/server";

import {
  clearSessionCookie,
  isValidEmail,
  normalizeEmail,
  setSessionCookie,
  verifyEmailCode,
} from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      code?: string;
    };

    if (!body.email || !isValidEmail(body.email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    if (!body.code || body.code.trim().length !== 6) {
      return NextResponse.json(
        { error: "Please enter the 6-digit verification code." },
        { status: 400 },
      );
    }

    const result = await verifyEmailCode(normalizeEmail(body.email), body.code);

    if (!result.ok) {
      const response = NextResponse.json({ error: result.message }, { status: 400 });
      clearSessionCookie(response);
      return response;
    }

    const response = NextResponse.json({
      ok: true,
      user: result.user,
    });

    setSessionCookie(response, result.token, result.expiresAt);

    return response;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to verify the code.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
