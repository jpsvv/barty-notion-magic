import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

type Role = "admin" | "editor";

interface AuthCtx {
  user: User | null;
  session: Session | null;
  roles: Role[];
  loading: boolean;
  rolesLoading: boolean;
  isStaff: boolean;
  isAdmin: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthCtx>({} as AuthCtx);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [rolesLoading, setRolesLoading] = useState(false);

  useEffect(() => {
    // Set up listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_evt, sess) => {
      setSession(sess);
      setUser(sess?.user ?? null);
      if (sess?.user) {
        setRolesLoading(true);
        // Defer role fetch to avoid deadlock inside listener
        setTimeout(() => fetchRoles(sess.user.id), 0);
      } else {
        setRoles([]);
        setRolesLoading(false);
      }
    });

    supabase.auth.getSession().then(({ data: { session: sess } }) => {
      setSession(sess);
      setUser(sess?.user ?? null);
      if (sess?.user) {
        setRolesLoading(true);
        fetchRoles(sess.user.id);
      } else {
        setRolesLoading(false);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchRoles = async (uid: string) => {
    try {
      const [{ data: isAdminRole, error: adminError }, { data: isStaffRole, error: staffError }] = await Promise.all([
        supabase.rpc("has_role", { _user_id: uid, _role: "admin" }),
        supabase.rpc("is_staff", { _user_id: uid }),
      ]);

      if (adminError || staffError) {
        const { data, error } = await supabase.from("user_roles").select("role").eq("user_id", uid);
        if (error) throw error;
        setRoles((data ?? []).map((r) => r.role as Role));
        return;
      }

      setRoles(isAdminRole ? ["admin"] : isStaffRole ? ["editor"] : []);
    } catch (error) {
      console.error("Erro ao carregar permissões do usuário:", error);
      setRoles([]);
    } finally {
      setRolesLoading(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
    setRoles([]);
    setRolesLoading(false);
  };

  const isStaff = roles.includes("admin") || roles.includes("editor");
  const isAdmin = roles.includes("admin");

  return (
    <AuthContext.Provider value={{ user, session, roles, loading: loading || rolesLoading, rolesLoading, isStaff, isAdmin, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);