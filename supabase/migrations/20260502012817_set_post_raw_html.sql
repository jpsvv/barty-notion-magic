-- Switch the recently pasted full-HTML post to raw_html so its <style>/<head> render
UPDATE public.blog_posts
SET content_type = 'raw_html'
WHERE id = '967a0ad3-e9ea-4a08-9ba7-d2d9b7ad48dd';
