import { createServiceClient, isConfigured } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (!isConfigured) {
    return NextResponse.json({ error: "Service not configured" }, { status: 503 });
  }

  const { email } = await request.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  }

  const supabase = await createServiceClient();

  const { error } = await supabase
    .from("subscribers")
    .upsert(
      { email, is_active: true, source: "website" },
      { onConflict: "email" }
    );

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ success: true, message: "Already subscribed" });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, message: "Subscribed successfully" });
}
