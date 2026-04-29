import { supabase } from "@/integrations/supabase/client";

export type PageSlug = "home" | "fichas" | "eventos" | "food" | "ingressos" | "planos";

/** Fetch a single block of content for a page. Returns the JSON object or null. */
export async function getBlock<T = Record<string, unknown>>(
  page: PageSlug,
  block: string,
): Promise<T | null> {
  const { data, error } = await supabase
    .from("site_content")
    .select("content")
    .eq("page_slug", page)
    .eq("block_key", block)
    .maybeSingle();
  if (error || !data) return null;
  return data.content as T;
}

/** Upsert a block of content for a page. */
export async function saveBlock(
  page: PageSlug,
  block: string,
  content: Record<string, unknown>,
) {
  const { data: { user } } = await supabase.auth.getUser();
  return supabase.from("site_content").upsert(
    [{ page_slug: page, block_key: block, content: content as never, updated_by: user?.id }],
    { onConflict: "page_slug,block_key" },
  );
}

export async function getAllBlocks(page: PageSlug) {
  const { data } = await supabase
    .from("site_content")
    .select("block_key, content, updated_at")
    .eq("page_slug", page);
  return data ?? [];
}

/** Upload a file to the cms-media bucket and return its public URL. */
export async function uploadMedia(file: File, folder = "uploads"): Promise<string> {
  const ext = file.name.split(".").pop() ?? "bin";
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from("cms-media").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;
  const { data } = supabase.storage.from("cms-media").getPublicUrl(path);
  return data.publicUrl;
}