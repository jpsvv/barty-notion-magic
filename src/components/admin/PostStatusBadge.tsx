import { Badge } from "@/components/ui/badge";
import type { PostStatus } from "@/lib/blog";

const map: Record<PostStatus, { label: string; cls: string }> = {
  draft: { label: "Rascunho", cls: "bg-muted text-muted-foreground" },
  scheduled: { label: "Agendado", cls: "bg-amber-500/15 text-amber-600 border border-amber-500/30" },
  published: { label: "Publicado", cls: "bg-emerald-500/15 text-emerald-600 border border-emerald-500/30" },
};

const PostStatusBadge = ({ status }: { status: PostStatus }) => {
  const v = map[status];
  return <Badge className={v.cls + " hover:" + v.cls}>{v.label}</Badge>;
};

export default PostStatusBadge;
