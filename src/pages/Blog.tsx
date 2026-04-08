import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const categories = [
  "Todos",
  "Gestão de Eventos",
  "Pagamentos",
  "Dicas de Negócio",
  "Tecnologia",
  "Cases de Sucesso",
];

const posts = [
  {
    id: 1,
    title: "Como digitalizar a venda de fichas no seu evento e faturar mais",
    excerpt:
      "Descubra como a transição do papel para o digital pode aumentar o faturamento do seu evento em até 30%, reduzindo filas e melhorando a experiência do público.",
    category: "Gestão de Eventos",
    author: "Equipe Barty",
    date: "02 Jul 2026",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
  },
  {
    id: 2,
    title: "5 erros que fazem seu food truck perder vendas em eventos",
    excerpt:
      "Filas grandes, troco errado e falta de controle de estoque são apenas alguns dos problemas que o Barty Food resolve automaticamente.",
    category: "Dicas de Negócio",
    author: "Equipe Barty",
    date: "25 Jun 2026",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
  },
  {
    id: 3,
    title: "Pagamento por aproximação em eventos: guia completo",
    excerpt:
      "NFC, QR Code, Pix — entenda todas as formas de pagamento sem contato e como implementar no seu próximo evento com o Barty.",
    category: "Pagamentos",
    author: "Equipe Barty",
    date: "18 Jun 2026",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
  },
  {
    id: 4,
    title: "Case: como a Festa Junina de Uberaba triplicou o faturamento",
    excerpt:
      "Com o Barty Fichas, o evento eliminou filas, reduziu desperdícios e teve controle total em tempo real. Veja os números.",
    category: "Cases de Sucesso",
    author: "Equipe Barty",
    date: "10 Jun 2026",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80",
  },
  {
    id: 5,
    title: "Barty vs. maquininha tradicional: qual compensa mais?",
    excerpt:
      "Comparamos custos, velocidade e praticidade entre as soluções tradicionais de pagamento e a plataforma Barty para eventos.",
    category: "Tecnologia",
    author: "Equipe Barty",
    date: "03 Jun 2026",
    image: "https://images.unsplash.com/photo-1556742393-d75f468bfcb0?w=600&q=80",
  },
  {
    id: 6,
    title: "Como precificar ingressos para maximizar a lotação",
    excerpt:
      "Estratégias de lotes, early bird e preço dinâmico que você pode aplicar hoje usando o Barty Ingressos.",
    category: "Dicas de Negócio",
    author: "Equipe Barty",
    date: "27 Mai 2026",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&q=80",
  },
];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [search, setSearch] = useState("");

  const filtered = posts.filter((post) => {
    const matchCategory =
      activeCategory === "Todos" || post.category === activeCategory;
    const matchSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase());
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
      </Helmet>
      <Navbar />

      <main className="min-h-screen bg-background pt-24 pb-20">
        {/* Hero */}
        <section className="text-center mb-12 px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            Blog <span className="text-primary">Barty</span>
          </motion.h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Conteúdos para você vender mais, organizar melhor e dominar seus
            eventos.
          </p>
        </section>

        {/* Filters */}
        <div className="container mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
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

        {/* Posts grid */}
        <div className="container">
          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-16">
              Nenhum artigo encontrado.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="group rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                      {post.category}
                    </span>
                    <h2 className="font-display text-lg font-bold text-foreground mt-2 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{post.author}</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
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
