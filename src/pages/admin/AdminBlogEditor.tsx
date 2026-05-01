import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ChevronLeft, Save, Send, Calendar as CalIcon, Eye, Upload, Image as ImgIcon } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import RichTextEditor from "@/components/admin/RichTextEditor";
import SeoPanel from "@/components/admin/SeoPanel";
import PostStatusBadge from "@/components/admin/PostStatusBadge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { uploadMedia } from "@/lib/siteContent";
import { calcReadingTime, getPostById, listAllCategories, slugify, type BlogCategory, type BlogPost, type PostStatus } from "@/lib/blog";
import { toast } from "sonner";

type Form = {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image_url: string;
  category_id: string | null;
  author_name: string;
  status: PostStatus;
  published_at: string | null;
  scheduled_for: string | null;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string | null;
  og_image_url: string | null;
  canonical_url: string | null;
  noindex: boolean;
};

const empty: Form = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  cover_image_url: "",
  category_id: null,
  author_name: "Equipe Barty",
  status: "draft",
  published_at: null,
  scheduled_for: null,
  seo_title: "",
  seo_description: "",
  seo_keywords: "",
  og_image_url: "",
  canonical_url: "",
  noindex: false,
};

const toLocalInput = (iso: string | null) => {
  if (!iso) return "";
  const d = new Date(iso);
  const off = d.getTimezoneOffset();
  return new Date(d.getTime() - off * 60000).toISOString().slice(0, 16);
};

const AdminBlogEditor = () => {
  const { id } = useParams<{ id: string }>();
  const isNew = !id || id === "new";
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState<Form>(empty);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [slugTouched, setSlugTouched] = useState(false);

  useEffect(() => {
    listAllCategories().then(setCategories);
    if (!isNew && id) {
      getPostById(id).then((p) => {
        if (!p) { toast.error("Post não encontrado"); navigate("/admin/blog"); return; }
        setForm({
          id: p.id, slug: p.slug, title: p.title,
          excerpt: p.excerpt ?? "", content: p.content ?? "",
          cover_image_url: p.cover_image_url ?? "",
          category_id: p.category_id, author_name: p.author_name,
          status: p.status, published_at: p.published_at, scheduled_for: p.scheduled_for,
          seo_title: p.seo_title, seo_description: p.seo_description, seo_keywords: p.seo_keywords,
          og_image_url: p.og_image_url, canonical_url: p.canonical_url, noindex: p.noindex,
        });
        setSlugTouched(true);
        setLoading(false);
      });
    }
  }, [id, isNew, navigate]);

  // auto-slug from title until user edits slug
  useEffect(() => {
    if (!slugTouched && form.title) {
      setForm((f) => ({ ...f, slug: slugify(f.title) }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.title]);

  const readingTime = useMemo(() => calcReadingTime(form.content || ""), [form.content]);

  const update = (patch: Partial<Form>) => setForm((f) => ({ ...f, ...patch }));

  const persist = async (status: PostStatus, opts: { schedule?: string | null } = {}) => {
    if (!form.title.trim()) { toast.error("Adicione um título"); return; }
    if (!form.slug.trim()) { toast.error("Slug inválido"); return; }
    setSaving(true);

    let publishedAt = form.published_at;
    let scheduledFor = form.scheduled_for;
    if (status === "published" && !publishedAt) publishedAt = new Date().toISOString();
    if (status === "scheduled") {
      scheduledFor = opts.schedule ?? form.scheduled_for;
      publishedAt = scheduledFor;
      if (!scheduledFor || new Date(scheduledFor) <= new Date()) {
        toast.error("Escolha uma data futura para agendar");
        setSaving(false);
        return;
      }
    }

    const payload = {
      slug: form.slug,
      title: form.title,
      excerpt: form.excerpt || null,
      content: form.content || null,
      cover_image_url: form.cover_image_url || null,
      category_id: form.category_id,
      author_name: form.author_name || "Equipe Barty",
      author_id: user?.id ?? null,
      status,
      published_at: publishedAt,
      scheduled_for: scheduledFor,
      seo_title: form.seo_title || null,
      seo_description: form.seo_description || null,
      seo_keywords: form.seo_keywords || null,
      og_image_url: form.og_image_url || null,
      canonical_url: form.canonical_url || null,
      noindex: form.noindex,
      reading_time_min: readingTime,
    };

    const q = isNew
      ? supabase.from("blog_posts").insert(payload).select("id").single()
      : supabase.from("blog_posts").update(payload).eq("id", form.id!).select("id").single();
    const { data, error } = await q;
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success(status === "published" ? "Publicado!" : status === "scheduled" ? "Agendado" : "Rascunho salvo");
    update({ status, published_at: publishedAt, scheduled_for: scheduledFor });
    if (isNew && data) navigate(`/admin/blog/${data.id}`, { replace: true });
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    try {
      const url = await uploadMedia(f, "blog-covers");
      update({ cover_image_url: url });
      toast.success("Capa enviada");
    } catch (err) { toast.error((err as Error).message); }
    e.target.value = "";
  };

  if (loading) return <AdminLayout><p className="text-muted-foreground">Carregando...</p></AdminLayout>;

  return (
    <AdminLayout>
      <Link to="/admin/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
        <ChevronLeft className="w-4 h-4" /> Voltar
      </Link>

      <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <h1 className="font-display text-3xl font-bold">{isNew ? "Novo post" : "Editar post"}</h1>
          <PostStatusBadge status={form.status} />
        </div>
        <div className="flex gap-2">
          {form.slug && form.status === "published" && (
            <a href={`/blog/${form.slug}`} target="_blank" rel="noreferrer">
              <Button variant="outline"><Eye className="w-4 h-4" /> Visualizar</Button>
            </a>
          )}
          <Button variant="outline" onClick={() => persist("draft")} disabled={saving}>
            <Save className="w-4 h-4" /> Salvar rascunho
          </Button>
          <Button onClick={() => persist("published")} disabled={saving}>
            <Send className="w-4 h-4" /> {form.status === "published" ? "Atualizar" : "Publicar"}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-4 space-y-4">
            <div className="space-y-1.5">
              <Label>Título</Label>
              <Input value={form.title} onChange={(e) => update({ title: e.target.value })} placeholder="Como vender mais com..." className="text-lg" />
            </div>
            <div className="space-y-1.5">
              <Label>Slug (URL)</Label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">/blog/</span>
                <Input value={form.slug} onChange={(e) => { setSlugTouched(true); update({ slug: slugify(e.target.value) }); }} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Resumo</Label>
              <Textarea rows={2} value={form.excerpt} onChange={(e) => update({ excerpt: e.target.value })} placeholder="Aparece nos cards e em compartilhamentos..." />
            </div>
          </Card>

          <Card className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <Label>Imagem de capa</Label>
              <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-border text-xs cursor-pointer hover:bg-muted">
                <Upload className="w-3.5 h-3.5" /> Enviar
                <input type="file" accept="image/*" hidden onChange={handleCoverUpload} />
              </label>
            </div>
            {form.cover_image_url ? (
              <img src={form.cover_image_url} alt="capa" className="w-full max-h-72 object-cover rounded-md border border-border" />
            ) : (
              <div className="flex items-center justify-center h-40 rounded-md border border-dashed border-border text-muted-foreground text-sm">
                <ImgIcon className="w-5 h-5 mr-2" /> Sem imagem
              </div>
            )}
            <Input value={form.cover_image_url} onChange={(e) => update({ cover_image_url: e.target.value })} placeholder="URL da imagem" />
          </Card>

          <Card className="p-2">
            <div className="px-2 pt-2 flex items-center justify-between">
              <Label>Conteúdo</Label>
              <span className="text-xs text-muted-foreground">{readingTime} min de leitura</span>
            </div>
            <div className="p-2">
              <RichTextEditor value={form.content} onChange={(html) => update({ content: html })} />
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card className="p-4 space-y-3">
            <h3 className="font-display text-sm font-semibold">Publicação</h3>
            <div className="space-y-1.5">
              <Label className="text-xs">Categoria</Label>
              <Select value={form.category_id ?? "none"} onValueChange={(v) => update({ category_id: v === "none" ? null : v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Sem categoria</SelectItem>
                  {categories.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Autor</Label>
              <Input value={form.author_name} onChange={(e) => update({ author_name: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs flex items-center gap-1.5"><CalIcon className="w-3.5 h-3.5" /> Agendar publicação</Label>
              <div className="flex gap-2">
                <Input
                  type="datetime-local"
                  value={toLocalInput(form.scheduled_for)}
                  onChange={(e) => update({ scheduled_for: e.target.value ? new Date(e.target.value).toISOString() : null })}
                />
                <Button variant="outline" size="sm" onClick={() => persist("scheduled", { schedule: form.scheduled_for })} disabled={saving || !form.scheduled_for}>
                  Agendar
                </Button>
              </div>
            </div>
            {form.published_at && (
              <p className="text-[11px] text-muted-foreground">
                {form.status === "scheduled" ? "Agendado para: " : "Publicado em: "}
                {new Date(form.published_at).toLocaleString("pt-BR")}
              </p>
            )}
          </Card>

          <SeoPanel
            title={form.title}
            values={{
              seo_title: form.seo_title, seo_description: form.seo_description, seo_keywords: form.seo_keywords,
              og_image_url: form.og_image_url, canonical_url: form.canonical_url, noindex: form.noindex,
            }}
            onChange={(patch) => update(patch as Partial<Form>)}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminBlogEditor;
