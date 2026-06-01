import { NextResponse } from "next/server";

import {
  canSendNewCode,
  createVerificationCode,
  deleteVerificationCodeById,
  getLoginCodeTtlMinutes,
  isValidEmail,
  normalizeEmail,
} from "@/lib/auth";
import { sendLoginCodeEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string };
    const rawEmail = body.email;

    if (!rawEmail || !isValidEmail(rawEmail)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    const email = normalizeEmail(rawEmail);
    const canSend = await canSendNewCode(email);

    if (!canSend) {
      return NextResponse.json(
        { error: "Please wait at least 60 seconds before requesting a new code." },
        { status: 429 },
      );
    }

    const verificationCode = await createVerificationCode(email);

    try {
      await sendLoginCodeEmail({
        email,
        code: verificationCode.code,
        expiresInMinutes: getLoginCodeTtlMinutes(),
      });
    } catch (error) {
      await deleteVerificationCodeById(verificationCode.insertedId);
      throw error;
    }

    return NextResponse.json({
      ok: true,
      message: "Verification code sent successfully.",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to send verification code.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
