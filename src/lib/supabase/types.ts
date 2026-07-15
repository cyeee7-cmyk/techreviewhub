export type Profile = {
  id: string;
  email: string;
  display_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

export type Subscriber = {
  id: string;
  email: string;
  user_id: string | null;
  subscribed_at: string;
  is_active: boolean;
  source: string;
};

export type Bookmark = {
  id: string;
  user_id: string;
  article_slug: string;
  article_type: "review" | "comparison" | "buying_guide";
  created_at: string;
};

export type Comment = {
  id: string;
  user_id: string;
  article_slug: string;
  article_type: "review" | "comparison" | "buying_guide";
  content: string;
  parent_id: string | null;
  created_at: string;
  updated_at: string;
  profiles?: Pick<Profile, "display_name" | "avatar_url">;
};
