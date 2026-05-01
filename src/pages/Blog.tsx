import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { listAllCategories, listPublishedPosts, type BlogCategory, type BlogPost } from "@/lib/blog";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [search, setSearch] = useState("");

  useEffect(() => {
    Promise.all([listPublishedPosts(), listAllCategories()]).then(([p, c]) => {
      setPosts(p); setCategories(c); setLoading(false);
    });
  }, []);

  const catMap = useMemo(() => Object.fromEntries(categories.map((c) => [c.id, c.name])), [categories]);
  const allCategories = ["Todos", ...categories.map((c) => c.name)];

  const filtered = posts.filter((post) => {
    const cName = post.category_id ? catMap[post.category_id] : "";
    const matchCategory = activeCategory === "Todos" || cName === activeCategory;
    const s = search.toLowerCase();
    const matchSearch = !s || post.title.toLowerCase().includes(s) || (post.excerpt ?? "").toLowerCase().includes(s);
    return matchCategory && matchSearch;
  });

  return (
    <>
      <Helmet>
        <title>Blog Barty — Conteúdos sobre eventos e pagamentos</title>
        <meta
          name="description"
          content="Artigos, dicas e cases sobre gestão de eventos, pagamentos digitais e como faturar mais com o Barty."
        />
        <link rel="canonical" href="https://barty.fun/blog" />
      </Helmet>
      <Navbar />

      <main className="min-h-screen bg-background pt-24 pb-20">
        <section className="text-center mb-12 px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            Blog <span className="text-primary">Barty</span>
          </motion.h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Conteúdos para você vender mais, organizar melhor e dominar seus eventos.
          </p>
        </section>

        <div className="container mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Pesquisar artigos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
        </div>

        <div className="container">
          {loading ? (
            <p className="text-center text-muted-foreground py-16">Carregando...</p>
          ) : filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-16">
              Nenhum artigo publicado ainda.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.06, 0.4) }}
                >
                  <Link to={`/blog/${post.slug}`} className="group block rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-lg transition-shadow h-full">
                    <div className="aspect-video overflow-hidden bg-muted">
                      {post.cover_image_url && (
                        <img
                          src={post.cover_image_url}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      )}
                    </div>
                    <div className="p-6">
                      {post.category_id && catMap[post.category_id] && (
                        <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                          {catMap[post.category_id]}
                        </span>
                      )}
                      <h2 className="font-display text-lg font-bold text-foreground mt-2 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{post.author_name}</span>
                        <span>{post.published_at ? format(new Date(post.published_at), "dd MMM yyyy", { locale: ptBR }) : ""}</span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Blog;
