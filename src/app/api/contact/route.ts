import { NextResponse } from "next/server";

import { sendContactNotificationEmail } from "@/lib/email";
import { getCollections } from "@/lib/mongodb";

function isBlank(value: unknown) {
  return typeof value !== "string" || value.trim().length === 0;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim().toLowerCase());
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
    };

    if (
      isBlank(body.name) ||
      isBlank(body.email) ||
      isBlank(body.subject) ||
      isBlank(body.message)
    ) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 },
      );
    }

    const name = body.name!.trim();
    const email = body.email!.trim().toLowerCase();
    const subject = body.subject!.trim();
    const message = body.message!.trim();

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    if (name.length > 120 || subject.length > 200 || message.length > 5000) {
      return NextResponse.json(
        { error: "One or more fields exceed the allowed length." },
        { status: 400 },
      );
    }

    const { contactMessages } = await getCollections();
    const createdAt = new Date();

    const insertResult = await contactMessages.insertOne({
      name,
      email,
      subject,
      message,
      createdAt,
      notificationStatus: "pending",
    });

    try {
      await sendContactNotificationEmail({
        name,
        email,
        subject,
        message,
        createdAt,
      });

      await contactMessages.updateOne(
        { _id: insertResult.insertedId },
        {
          $set: {
            notificationStatus: "sent",
            emailedAt: new Date(),
          },
        },
      );
    } catch (error) {
      const notificationError =
        error instanceof Error ? error.message : "Unknown email delivery error.";

      await contactMessages.updateOne(
        { _id: insertResult.insertedId },
        {
          $set: {
            notificationStatus: "failed",
            notificationError,
          },
        },
      );

      throw error;
    }

    return NextResponse.json({
      ok: true,
      message: "Your message has been sent successfully.",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to send your message right now.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
