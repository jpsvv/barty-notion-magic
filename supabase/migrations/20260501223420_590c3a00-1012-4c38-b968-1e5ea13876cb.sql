-- Categories
CREATE TABLE public.blog_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are public" ON public.blog_categories FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Staff insert categories" ON public.blog_categories FOR INSERT TO authenticated WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "Staff update categories" ON public.blog_categories FOR UPDATE TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "Staff delete categories" ON public.blog_categories FOR DELETE TO authenticated USING (public.is_staff(auth.uid()));

-- Posts
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  cover_image_url TEXT,
  category_id UUID REFERENCES public.blog_categories(id) ON DELETE SET NULL,
  author_name TEXT NOT NULL DEFAULT 'Equipe Barty',
  author_id UUID,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','scheduled','published')),
  published_at TIMESTAMPTZ,
  scheduled_for TIMESTAMPTZ,
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT,
  og_image_url TEXT,
  canonical_url TEXT,
  noindex BOOLEAN NOT NULL DEFAULT false,
  reading_time_min INTEGER NOT NULL DEFAULT 1,
  views INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX idx_blog_posts_published_at ON public.blog_posts(published_at DESC);
CREATE INDEX idx_blog_posts_category ON public.blog_posts(category_id);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Public can read published posts
CREATE POLICY "Public read published posts"
ON public.blog_posts FOR SELECT
TO anon, authenticated
USING (status = 'published' AND published_at IS NOT NULL AND published_at <= now());

-- Staff full access
CREATE POLICY "Staff read all posts" ON public.blog_posts FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "Staff insert posts" ON public.blog_posts FOR INSERT TO authenticated WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "Staff update posts" ON public.blog_posts FOR UPDATE TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "Staff delete posts" ON public.blog_posts FOR DELETE TO authenticated USING (public.is_staff(auth.uid()));

CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed default categories
INSERT INTO public.blog_categories (name, slug) VALUES
  ('Gestão de Eventos', 'gestao-de-eventos'),
  ('Pagamentos', 'pagamentos'),
  ('Dicas de Negócio', 'dicas-de-negocio'),
  ('Tecnologia', 'tecnologia'),
  ('Cases de Sucesso', 'cases-de-sucesso');