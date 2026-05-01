import { ReactNode } from "react";
import { NavLink, Navigate, useLocation } from "react-router-dom";
import { LayoutDashboard, FileEdit, Users, LogOut, ExternalLink, Image, Newspaper } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import bartyLogo from "@/assets/barty-logo.png";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/pages", label: "Páginas do site", icon: FileEdit },
  { to: "/admin/blog", label: "Blog", icon: Newspaper },
  { to: "/admin/media", label: "Mídia", icon: Image },
  { to: "/admin/users", label: "Usuários", icon: Users, adminOnly: true },
];

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { user, loading, isStaff, isAdmin, signOut } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Carregando...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (!isStaff) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 text-center">
        <h1 className="font-display text-2xl font-bold">Acesso restrito</h1>
        <p className="text-muted-foreground max-w-md">
          Sua conta foi criada, mas ainda não tem permissão de admin/editor. Peça a um administrador para liberar seu acesso.
        </p>
        <Button variant="outline" onClick={signOut}>Sair</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="w-64 border-r border-border bg-card flex flex-col">
        <div className="p-4 border-b border-border">
          <img src={bartyLogo} alt="Barty Admin" className="h-12 w-auto" />
          <p className="text-xs text-muted-foreground mt-1">Painel admin</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems
            .filter((it) => !it.adminOnly || isAdmin)
            .map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`
                }
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            ))}
        </nav>
        <div className="p-3 border-t border-border space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Ver site
          </a>
          <div className="text-xs text-muted-foreground truncate">{user.email}</div>
          <Button variant="outline" size="sm" className="w-full" onClick={signOut}>
            <LogOut className="w-3.5 h-3.5" /> Sair
          </Button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="container max-w-5xl py-8">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;