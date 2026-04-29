import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ChevronLeft, Save } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import AdminLayout from "@/components/admin/AdminLayout";
import FieldEditor from "@/components/admin/FieldEditor";
import { PAGE_SCHEMAS } from "@/lib/pageSchemas";
import { getAllBlocks, saveBlock, type PageSlug } from "@/lib/siteContent";

type BlockState = Record<string, Record<string, unknown>>;

const AdminPageEditor = () => {
  const { slug } = useParams<{ slug: PageSlug }>();
  const schema = slug ? PAGE_SCHEMAS[slug] : undefined;
  const [data, setData] = useState<BlockState>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    getAllBlocks(slug).then((rows) => {
      const map: BlockState = {};
      rows.forEach((r) => { map[r.block_key] = (r.content as Record<string, unknown>) ?? {}; });
      setData(map);
      setLoading(false);
    });
  }, [slug]);

  if (!schema) return <Navigate to="/admin/pages" replace />;

  const updateField = (blockKey: string, fieldKey: string, value: unknown) => {
    setData((d) => ({ ...d, [blockKey]: { ...(d[blockKey] || {}), [fieldKey]: value } }));
  };

  const handleSave = async (blockKey: string) => {
    setSaving(blockKey);
    const { error } = await saveBlock(schema.slug, blockKey, data[blockKey] || {});
    setSaving(null);
    if (error) toast.error(error.message);
    else toast.success("Bloco salvo");
  };

  return (
    <AdminLayout>
      <Link to="/admin/pages" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
        <ChevronLeft className="w-4 h-4" /> Voltar
      </Link>
      <h1 className="font-display text-3xl font-bold mb-1">{schema.title}</h1>
      <p className="text-muted-foreground mb-6">Edite os blocos abaixo. Cada bloco é salvo separadamente.</p>

      {loading ? (
        <p className="text-muted-foreground">Carregando...</p>
      ) : (
        <div className="space-y-6">
          {schema.blocks.map((block) => (
            <Card key={block.key} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="font-display text-xl font-semibold">{block.title}</h2>
                  {block.description && <p className="text-sm text-muted-foreground">{block.description}</p>}
                </div>
                <Button onClick={() => handleSave(block.key)} disabled={saving === block.key}>
                  <Save className="w-4 h-4" /> {saving === block.key ? "Salvando..." : "Salvar"}
                </Button>
              </div>
              <div className="space-y-4">
                {block.fields.map((f) => (
                  <FieldEditor
                    key={f.key}
                    field={f}
                    value={data[block.key]?.[f.key]}
                    onChange={(v) => updateField(block.key, f.key, v)}
                  />
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminPageEditor;