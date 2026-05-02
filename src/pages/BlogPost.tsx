import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import DOMPurify from "dompurify";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RawHtmlFrame from "@/components/RawHtmlFrame";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { getPostBySlug, type BlogPost as Post, type BlogCategory } from "@/lib/blog";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [category, setCategory] = useState<BlogCategory | null>(null);
  const [related, setRelated] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      const p = await getPostBySlug(slug);
      if (!p) { setNotFound(true); setLoading(false); return; }
      setPost(p);
      if (p.category_id) {
        const { data: cat } = await supabase.from("blog_categories").select("*").eq("id", p.category_id).maybeSingle();
        setCategory(cat as BlogCategory | null);
        const { data: rel } = await supabase
          .from("blog_posts").select("*")
          .eq("status", "published").eq("category_id", p.category_id)
          .neq("id", p.id).order("published_at", { ascending: false }).limit(3);
        setRelated((rel ?? []) as Post[]);
      }
      setLoading(false);
    })();
  }, [slug]);

  if (notFound) return <Navigate to="/blog" replace />;
  if (loading || !post) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-32 pb-20 text-center text-muted-foreground">Carregando...</main>
        <Footer />
      </>
    );
  }

  const isRawHtml = post.content_type === "raw_html";
  const safeContent = isRawHtml ? "" : DOMPurify.sanitize(post.content ?? "");
  const seoTitle = post.seo_title || post.title;
  const seoDesc = post.seo_description || post.excerpt || "";
  const ogImage = post.og_image_url || post.cover_image_url || "";
  const canonical = post.canonical_url || `https://barty.fun/blog/${post.slug}`;
  const publishedISO = post.published_at ?? post.created_at;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: seoDesc,
    image: ogImage,
    datePublished: publishedISO,
    dateModified: post.updated_at,
    author: { "@type": "Person", name: post.author_name },
    publisher: { "@type": "Organization", name: "Barty", logo: { "@type": "ImageObject", url: "https://barty.fun/logo.png" } },
    mainEntityOfPage: canonical,
  };

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        {post.seo_keywords && <meta name="keywords" content={post.seo_keywords} />}
        {post.noindex && <meta name="robots" content="noindex,nofollow" />}
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDesc} />
        {ogImage && <meta property="og:image" content={ogImage} />}
        <meta property="og:url" content={canonical} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDesc} />
        {ogImage && <meta name="twitter:image" content={ogImage} />}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-background pt-24 pb-20">
        <article className="container max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-6">
            <ArrowLeft className="w-4 h-4" /> Voltar para o blog
          </Link>

          {category && (
            <span className="inline-block text-xs font-semibold text-primary uppercase tracking-wide mb-3">
              {category.name}
            </span>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight"
          >
            {post.title}
          </motion.h1>

          {post.excerpt && (
            <p className="text-lg text-muted-foreground mb-6">{post.excerpt}</p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-8 pb-6 border-b border-border">
            <span>{post.author_name}</span>
            <span className="inline-flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{format(new Date(publishedISO), "dd 'de' MMM yyyy", { locale: ptBR })}</span>
            <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.reading_time_min} min de leitura</span>
          </div>

          {post.cover_image_url && (
            <img src={post.cover_image_url} alt={post.title} className="w-full rounded-2xl mb-10 aspect-video object-cover" />
          )}

          {isRawHtml ? (
            <RawHtmlFrame html={post.content ?? ""} />
          ) : (
            <div
              className="prose prose-lg max-w-none prose-headings:font-display prose-a:text-primary prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: safeContent }}
            />
          )}

          {related.length > 0 && (
            <section className="mt-16 pt-10 border-t border-border">
              <h2 className="font-display text-2xl font-bold mb-6">Continue lendo</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {related.map((r) => (
                  <Link key={r.id} to={`/blog/${r.slug}`} className="group rounded-xl overflow-hidden border border-border bg-card hover:shadow-lg transition-shadow">
                    {r.cover_image_url && (
                      <div className="aspect-video overflow-hidden">
                        <img src={r.cover_image_url} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" loading="lazy" />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">{r.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>

      <Footer />
    </>
  );
};

export default BlogPost;
