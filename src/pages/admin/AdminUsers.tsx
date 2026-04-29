import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { ShieldCheck, Pencil } from "lucide-react";

interface UserRow { user_id: string; display_name: string | null; roles: string[]; }

const AdminUsers = () => {
  const { isAdmin, user: me } = useAuth();
  const [rows, setRows] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const [{ data: profiles }, { data: roles }] = await Promise.all([
      supabase.from("profiles").select("user_id, display_name"),
      supabase.from("user_roles").select("user_id, role"),
    ]);
    const byUser = new Map<string, string[]>();
    (roles ?? []).forEach((r) => {
      const arr = byUser.get(r.user_id) ?? [];
      arr.push(r.role);
      byUser.set(r.user_id, arr);
    });
    setRows(
      (profiles ?? []).map((p) => ({
        user_id: p.user_id,
        display_name: p.display_name,
        roles: byUser.get(p.user_id) ?? [],
      })),
    );
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  if (!isAdmin) {
    return <AdminLayout><p className="text-muted-foreground">Apenas admins acessam esta área.</p></AdminLayout>;
  }

  const setRole = async (uid: string, role: "admin" | "editor", enabled: boolean) => {
    if (enabled) {
      const { error } = await supabase.from("user_roles").insert([{ user_id: uid, role }]);
      if (error && !error.message.includes("duplicate")) return toast.error(error.message);
    } else {
      const { error } = await supabase.from("user_roles").delete().eq("user_id", uid).eq("role", role);
      if (error) return toast.error(error.message);
    }
    toast.success("Cargo atualizado");
    load();
  };

  return (
    <AdminLayout>
      <h1 className="font-display text-3xl font-bold mb-2">Usuários e cargos</h1>
      <p className="text-muted-foreground mb-6">
        Defina quem pode editar conteúdo. Para adicionar novos usuários, peça que se cadastrem em <code>/auth</code> e libere o acesso aqui.
      </p>

      {loading ? (
        <p className="text-muted-foreground">Carregando...</p>
      ) : (
        <div className="space-y-2">
          {rows.map((r) => {
            const isAdminRole = r.roles.includes("admin");
            const isEditorRole = r.roles.includes("editor");
            const isMe = r.user_id === me?.id;
            return (
              <Card key={r.user_id} className="p-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-sm">
                    {r.display_name || "(sem nome)"}{" "}
                    {isMe && <span className="text-xs text-muted-foreground">(você)</span>}
                  </p>
                  <p className="text-xs text-muted-foreground">{r.user_id}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm" variant={isAdminRole ? "default" : "outline"}
                    onClick={() => setRole(r.user_id, "admin", !isAdminRole)}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" /> Admin
                  </Button>
                  <Button
                    size="sm" variant={isEditorRole ? "default" : "outline"}
                    onClick={() => setRole(r.user_id, "editor", !isEditorRole)}
                  >
                    <Pencil className="w-3.5 h-3.5" /> Editor
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

export default AdminUsers;