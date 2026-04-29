import { useState } from "react";
import { Plus, Trash2, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { uploadMedia } from "@/lib/siteContent";
import { toast } from "sonner";
import type { Field } from "@/lib/pageSchemas";

interface Props {
  field: Field;
  value: unknown;
  onChange: (v: unknown) => void;
}

const MediaUpload = ({ value, onChange, accept }: { value: string; onChange: (v: string) => void; accept: string }) => {
  const [busy, setBusy] = useState(false);
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setBusy(true);
    try {
      const url = await uploadMedia(f);
      onChange(url);
      toast.success("Arquivo enviado");
    } catch (err) {
      toast.error("Falha no upload: " + (err as Error).message);
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  };
  return (
    <div className="space-y-2">
      <Input value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder="URL ou envie um arquivo" />
      <div className="flex items-center gap-2">
        <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-border text-xs cursor-pointer hover:bg-muted">
          <Upload className="w-3.5 h-3.5" />
          {busy ? "Enviando..." : "Enviar arquivo"}
          <input type="file" accept={accept} hidden onChange={handleFile} disabled={busy} />
        </label>
        {value && accept.startsWith("image") && (
          <img src={value} alt="preview" className="h-12 rounded border border-border" />
        )}
        {value && accept.startsWith("video") && (
          <video src={value} className="h-12 rounded border border-border" muted />
        )}
      </div>
    </div>
  );
};

const FieldEditor = ({ field, value, onChange }: Props) => {
  const id = `field-${field.key}`;

  if (field.type === "richlist") {
    const items = Array.isArray(value) ? (value as Array<Record<string, unknown>>) : [];
    return (
      <div className="space-y-3">
        <Label>{field.label}</Label>
        {items.map((item, i) => (
          <Card key={i} className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Item {i + 1}</span>
              <Button
                type="button" variant="ghost" size="sm"
                onClick={() => onChange(items.filter((_, j) => j !== i))}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
            {field.itemFields?.map((sub) => (
              <FieldEditor
                key={sub.key}
                field={sub}
                value={item[sub.key]}
                onChange={(v) => {
                  const next = [...items];
                  next[i] = { ...next[i], [sub.key]: v };
                  onChange(next);
                }}
              />
            ))}
          </Card>
        ))}
        <Button
          type="button" variant="outline" size="sm"
          onClick={() => onChange([...items, {}])}
        >
          <Plus className="w-3.5 h-3.5" /> Adicionar item
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{field.label}</Label>
      {field.type === "textarea" && (
        <Textarea id={id} value={(value as string) || ""} onChange={(e) => onChange(e.target.value)} rows={3} />
      )}
      {field.type === "text" && (
        <Input id={id} value={(value as string) || ""} onChange={(e) => onChange(e.target.value)} />
      )}
      {field.type === "url" && (
        <Input id={id} type="url" value={(value as string) || ""} onChange={(e) => onChange(e.target.value)} placeholder="https://..." />
      )}
      {field.type === "image" && (
        <MediaUpload value={(value as string) || ""} onChange={onChange as (v: string) => void} accept="image/*" />
      )}
      {field.type === "video" && (
        <MediaUpload value={(value as string) || ""} onChange={onChange as (v: string) => void} accept="video/*" />
      )}
      {field.help && <p className="text-xs text-muted-foreground">{field.help}</p>}
    </div>
  );
};

export default FieldEditor;