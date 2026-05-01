import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";

interface Props {
  title: string;
  values: {
    seo_title: string | null;
    seo_description: string | null;
    seo_keywords: string | null;
    og_image_url: string | null;
    canonical_url: string | null;
    noindex: boolean;
  };
  onChange: (patch: Partial<Props["values"]>) => void;
}

const SeoPanel = ({ title, values, onChange }: Props) => {
  const previewTitle = (values.seo_title || title || "Título").slice(0, 60);
  const previewDesc = (values.seo_description || "").slice(0, 160);
  return (
    <Card className="p-4 space-y-4">
      <h3 className="font-display text-sm font-semibold">SEO & otimização</h3>

      <div className="space-y-1.5">
        <Label className="text-xs">Título SEO ({(values.seo_title?.length ?? 0)}/60)</Label>
        <Input value={values.seo_title ?? ""} onChange={(e) => onChange({ seo_title: e.target.value })} maxLength={70} placeholder={title} />
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs">Meta descrição ({(values.seo_description?.length ?? 0)}/160)</Label>
        <Textarea rows={3} value={values.seo_description ?? ""} onChange={(e) => onChange({ seo_description: e.target.value })} maxLength={180} />
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs">Palavras-chave (separadas por vírgula)</Label>
        <Input value={values.seo_keywords ?? ""} onChange={(e) => onChange({ seo_keywords: e.target.value })} />
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs">Imagem Open Graph (URL)</Label>
        <Input value={values.og_image_url ?? ""} onChange={(e) => onChange({ og_image_url: e.target.value })} placeholder="Padrão: imagem de capa" />
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs">URL canônica</Label>
        <Input value={values.canonical_url ?? ""} onChange={(e) => onChange({ canonical_url: e.target.value })} placeholder="https://..." />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="noindex" className="text-xs">Bloquear indexação (noindex)</Label>
        <Switch id="noindex" checked={values.noindex} onCheckedChange={(v) => onChange({ noindex: v })} />
      </div>

      <div className="rounded-md border border-border p-3 bg-muted/30">
        <p className="text-[10px] uppercase tracking-wide text-muted-foreground mb-1">Preview Google</p>
        <p className="text-[#1a0dab] text-sm leading-tight truncate">{previewTitle}</p>
        <p className="text-emerald-700 text-xs">barty.fun › blog</p>
        <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{previewDesc || "Adicione uma meta descrição..."}</p>
      </div>
    </Card>
  );
};

export default SeoPanel;
