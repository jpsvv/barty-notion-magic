import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { FileEdit, Users, Image as ImageIcon } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAuth } from "@/hooks/useAuth";

const cards = [
  { to: "/admin/pages", icon: FileEdit, title: "Páginas do site", desc: "Edite hero, textos, imagens e botões." },
  { to: "/admin/media", icon: ImageIcon, title: "Biblioteca de mídia", desc: "Imagens e vídeos enviados." },
  { to: "/admin/users", icon: Users, title: "Usuários e cargos", desc: "Gerencie quem pode editar.", adminOnly: true },
];

const AdminDashboard = () => {
  const { isAdmin, user } = useAuth();
  return (
    <AdminLayout>
      <h1 className="font-display text-3xl font-bold mb-2">Olá 👋</h1>
      <p className="text-muted-foreground mb-8">Bem-vindo ao painel da Barty, {user?.email}.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards
          .filter((c) => !c.adminOnly || isAdmin)
          .map((c) => (
            <Link key={c.to} to={c.to}>
              <Card className="p-5 hover:border-primary/50 transition-colors h-full">
                <c.icon className="w-6 h-6 text-primary mb-3" />
                <h2 className="font-semibold mb-1">{c.title}</h2>
                <p className="text-sm text-muted-foreground">{c.desc}</p>
              </Card>
            </Link>
          ))}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;