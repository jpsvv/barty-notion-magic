ALTER TABLE public.blog_posts
ADD COLUMN IF NOT EXISTS content_type text NOT NULL DEFAULT 'rich';

ALTER TABLE public.blog_posts
DROP CONSTRAINT IF EXISTS blog_posts_content_type_check;

ALTER TABLE public.blog_posts
ADD CONSTRAINT blog_posts_content_type_check
CHECK (content_type IN ('rich', 'raw_html'));