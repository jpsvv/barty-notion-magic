import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { PAGE_SCHEMAS } from "@/lib/pageSchemas";

const AdminPages = () => {
  const pages = Object.values(PAGE_SCHEMAS);
  return (
    <AdminLayout>
      <h1 className="font-display text-3xl font-bold mb-2">Páginas do site</h1>
      <p className="text-muted-foreground mb-6">Escolha a página que deseja editar.</p>
      <div className="space-y-2">
        {pages.map((p) => (
          <Link key={p.slug} to={`/admin/pages/${p.slug}`}>
            <Card className="p-4 flex items-center justify-between hover:border-primary/50 transition-colors">
              <div>
                <h2 className="font-semibold">{p.title}</h2>
                <p className="text-xs text-muted-foreground">/{p.slug === "home" ? "" : p.slug} — {p.blocks.length} bloco(s)</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Card>
          </Link>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminPages;