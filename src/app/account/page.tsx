import { createClient, isConfigured } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AccountClient from "./AccountClient";

export default async function AccountPage() {
  if (!isConfigured) {
    redirect("/");
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const { data: bookmarks } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const { data: subscription } = await supabase
    .from("subscribers")
    .select("*")
    .eq("email", user.email!)
    .single();

  return (
    <AccountClient
      user={user}
      profile={profile}
      bookmarks={bookmarks || []}
      subscription={subscription}
    />
  );
}
