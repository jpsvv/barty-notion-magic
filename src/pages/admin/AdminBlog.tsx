import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Pencil, Trash2, Copy, Tag, ExternalLink } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import PostStatusBadge from "@/components/admin/PostStatusBadge";
import { listAllPostsAdmin, listAllCategories, slugify, type BlogPost, type BlogCategory, type PostStatus } from "@/lib/blog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";

const AdminBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [newCatOpen, setNewCatOpen] = useState(false);
  const [newCatName, setNewCatName] = useState("");

  const reload = async () => {
    setLoading(true);
    const [p, c] = await Promise.all([listAllPostsAdmin(), listAllCategories()]);
    setPosts(p);
    setCategories(c);
    setLoading(false);
  };

  useEffect(() => { reload(); }, []);

  const filtered = posts.filter((p) => {
    const s = search.toLowerCase();
    const matchSearch = !s || p.title.toLowerCase().includes(s) || (p.slug ?? "").toLowerCase().includes(s);
    const matchStatus = filterStatus === "all" || p.status === filterStatus;
    const matchCat = filterCategory === "all" || p.category_id === filterCategory;
    return matchSearch && matchStatus && matchCat;
  });

  const catName = (id: string | null) => categories.find((c) => c.id === id)?.name ?? "—";

  const duplicatePost = async (p: BlogPost) => {
    const newSlug = `${p.slug}-copia-${Date.now().toString().slice(-5)}`;
    const { error } = await supabase.from("blog_posts").insert({
      title: `${p.title} (cópia)`,
      slug: newSlug,
      excerpt: p.excerpt,
      content: p.content,
      cover_image_url: p.cover_image_url,
      category_id: p.category_id,
      author_name: p.author_name,
      status: "draft",
      seo_title: p.seo_title,
      seo_description: p.seo_description,
      seo_keywords: p.seo_keywords,
      reading_time_min: p.reading_time_min,
    });
    if (error) toast.error(error.message);
    else { toast.success("Post duplicado"); reload(); }
  };

  const deletePost = async (id: string) => {
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Post excluído"); reload(); }
  };

  const createCategory = async () => {
    const name = newCatName.trim();
    if (!name) return;
    const { error } = await supabase.from("blog_categories").insert({ name, slug: slugify(name) });
    if (error) toast.error(error.message);
    else { toast.success("Categoria criada"); setNewCatName(""); setNewCatOpen(false); reload(); }
  };

  const deleteCategory = async (id: string) => {
    const { error } = await supabase.from("blog_categories").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Categoria excluída"); reload(); }
  };

  return (
    <AdminLayout>
      <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold mb-1">Blog</h1>
          <p className="text-muted-foreground">Crie, edite e publique artigos do blog Barty.</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={newCatOpen} onOpenChange={setNewCatOpen}>
            <DialogTrigger asChild>
              <Button variant="outline"><Tag className="w-4 h-4" /> Categorias</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Categorias do blog</DialogTitle></DialogHeader>
              <div className="space-y-2 max-h-72 overflow-auto">
                {categories.map((c) => (
                  <div key={c.id} className="flex items-center justify-between border border-border rounded-md p-2">
                    <div>
                      <div className="text-sm font-medium">{c.name}</div>
                      <div className="text-xs text-muted-foreground">/{c.slug}</div>
                    </div>
                    <Button size="sm" variant="ghost" onClick={() => deleteCategory(c.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
                  </div>
                ))}
                {categories.length === 0 && <p className="text-sm text-muted-foreground">Nenhuma categoria.</p>}
              </div>
              <div className="flex gap-2 pt-2 border-t border-border">
                <Input value={newCatName} onChange={(e) => setNewCatName(e.target.value)} placeholder="Nova categoria..." />
                <Button onClick={createCategory}>Adicionar</Button>
              </div>
              <DialogFooter />
            </DialogContent>
          </Dialog>
          <Link to="/admin/blog/new"><Button><Plus className="w-4 h-4" /> Novo post</Button></Link>
        </div>
      </div>

      <Card className="p-3 mb-4 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input className="pl-8" placeholder="Buscar por título ou slug..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos status</SelectItem>
            <SelectItem value="draft">Rascunhos</SelectItem>
            <SelectItem value="scheduled">Agendados</SelectItem>
            <SelectItem value="published">Publicados</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas categorias</SelectItem>
            {categories.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </Card>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16"></TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Atualizado</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-10">Carregando...</TableCell></TableRow>
            ) : filtered.length === 0 ? (
              <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-10">Nenhum post encontrado.</TableCell></TableRow>
            ) : filtered.map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  {p.cover_image_url ? (
                    <img src={p.cover_image_url} alt="" className="w-12 h-12 object-cover rounded" />
                  ) : <div className="w-12 h-12 rounded bg-muted" />}
                </TableCell>
                <TableCell>
                  <div className="font-medium">{p.title}</div>
                  <div className="text-xs text-muted-foreground">/blog/{p.slug}</div>
                </TableCell>
                <TableCell className="text-sm">{catName(p.category_id)}</TableCell>
                <TableCell><PostStatusBadge status={p.status as PostStatus} /></TableCell>
                <TableCell className="text-xs text-muted-foreground">{format(new Date(p.updated_at), "dd/MM/yyyy HH:mm")}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    {p.status === "published" && (
                      <a href={`/blog/${p.slug}`} target="_blank" rel="noreferrer">
                        <Button size="sm" variant="ghost"><ExternalLink className="w-3.5 h-3.5" /></Button>
                      </a>
                    )}
                    <Link to={`/admin/blog/${p.id}`}><Button size="sm" variant="ghost"><Pencil className="w-3.5 h-3.5" /></Button></Link>
                    <Button size="sm" variant="ghost" onClick={() => duplicatePost(p)}><Copy className="w-3.5 h-3.5" /></Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="ghost"><Trash2 className="w-3.5 h-3.5 text-destructive" /></Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Excluir "{p.title}"?</AlertDialogTitle>
                          <AlertDialogDescription>Essa ação não pode ser desfeita.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deletePost(p.id)}>Excluir</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </AdminLayout>
  );
};

export default AdminBlog;
