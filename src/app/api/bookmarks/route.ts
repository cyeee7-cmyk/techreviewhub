import { createClient, isConfigured } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  if (!isConfigured) {
    return NextResponse.json({ error: "Service not configured" }, { status: 503 });
  }
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { data, error } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ bookmarks: data });
}

export async function POST(request: Request) {
  if (!isConfigured) {
    return NextResponse.json({ error: "Service not configured" }, { status: 503 });
  }
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { article_slug, article_type } = await request.json();
  if (!article_slug || !article_type) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const { error } = await supabase
    .from("bookmarks")
    .insert({ user_id: user.id, article_slug, article_type });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request) {
  if (!isConfigured) {
    return NextResponse.json({ error: "Service not configured" }, { status: 503 });
  }
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { article_slug, article_type } = await request.json();
  const { error } = await supabase
    .from("bookmarks")
    .delete()
    .eq("user_id", user.id)
    .eq("article_slug", article_slug)
    .eq("article_type", article_type);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
