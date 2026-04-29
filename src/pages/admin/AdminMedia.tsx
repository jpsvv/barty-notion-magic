import { useEffect, useState } from "react";
import { Upload, Trash2, Copy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { uploadMedia } from "@/lib/siteContent";

interface MediaFile { name: string; url: string; }

const AdminMedia = () => {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const { data } = await supabase.storage.from("cms-media").list("uploads", {
      limit: 100, sortBy: { column: "created_at", order: "desc" },
    });
    if (!data) return;
    setFiles(
      data
        .filter((f) => f.name && !f.name.endsWith("/"))
        .map((f) => ({
          name: f.name,
          url: supabase.storage.from("cms-media").getPublicUrl(`uploads/${f.name}`).data.publicUrl,
        })),
    );
  };

  useEffect(() => { load(); }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files;
    if (!list) return;
    setBusy(true);
    try {
      for (const f of Array.from(list)) await uploadMedia(f);
      await load();
      toast.success("Arquivos enviados");
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  };

  const handleDelete = async (name: string) => {
    if (!confirm(`Remover "${name}"?`)) return;
    const { error } = await supabase.storage.from("cms-media").remove([`uploads/${name}`]);
    if (error) return toast.error(error.message);
    toast.success("Removido");
    load();
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl font-bold">Biblioteca de mídia</h1>
          <p className="text-muted-foreground">Imagens e vídeos disponíveis no painel.</p>
        </div>
        <label className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm cursor-pointer hover:opacity-90">
          <Upload className="w-4 h-4" /> {busy ? "Enviando..." : "Enviar"}
          <input type="file" multiple hidden accept="image/*,video/*" onChange={handleUpload} disabled={busy} />
        </label>
      </div>
      {files.length === 0 ? (
        <p className="text-muted-foreground">Nenhum arquivo enviado ainda.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {files.map((f) => {
            const isVideo = /\.(mp4|webm|mov)$/i.test(f.name);
            return (
              <Card key={f.name} className="p-2 group">
                <div className="aspect-square bg-muted rounded overflow-hidden mb-2">
                  {isVideo ? (
                    <video src={f.url} className="w-full h-full object-cover" muted />
                  ) : (
                    <img src={f.url} alt={f.name} className="w-full h-full object-cover" loading="lazy" />
                  )}
                </div>
                <p className="text-xs truncate text-muted-foreground" title={f.name}>{f.name}</p>
                <div className="flex gap-1 mt-2">
                  <Button size="sm" variant="outline" className="flex-1 h-7"
                    onClick={() => { navigator.clipboard.writeText(f.url); toast.success("URL copiada"); }}>
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="outline" className="h-7"
                    onClick={() => handleDelete(f.name)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminMedia;