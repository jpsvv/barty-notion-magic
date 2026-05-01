## Gerenciador de Blog no /admin

Vou criar um CMS completo de blog: lista de posts, editor rico, rascunho/publicação, agendamento, SEO e categorias. O `/blog` público vai passar a ler do banco (substituindo os posts hard-coded).

### Banco de dados (migration)

Tabela `blog_categories`:
- `id` uuid pk, `name` text, `slug` text unique, `created_at`

Tabela `blog_posts`:
- `id` uuid pk
- `slug` text unique (gerado a partir do título, editável)
- `title` text, `excerpt` text, `content` text (HTML/markdown)
- `cover_image_url` text
- `category_id` uuid fk → blog_categories
- `author_name` text (default "Equipe Barty"), `author_id` uuid (quem criou)
- `status` text check in ('draft','scheduled','published') default 'draft'
- `published_at` timestamptz null, `scheduled_for` timestamptz null
- SEO: `seo_title` text, `seo_description` text, `seo_keywords` text, `og_image_url` text, `canonical_url` text, `noindex` bool default false
- `reading_time_min` int (calculado), `views` int default 0
- `created_at`, `updated_at` (trigger `update_updated_at_column`)

RLS:
- SELECT público: apenas posts com `status='published'` AND `published_at <= now()` (anon + authenticated)
- SELECT staff: todos os posts (`is_staff(auth.uid())`)
- INSERT/UPDATE/DELETE: `is_staff(auth.uid())`
- `blog_categories`: SELECT público; mutações para staff

### Páginas do admin

`/admin/blog` — Lista de posts
- Tabela: capa, título, categoria, status (badge: rascunho/agendado/publicado), data, ações (editar, duplicar, excluir)
- Filtros: status, categoria, busca por título
- Botão "Novo post" → `/admin/blog/new`
- Botão "Categorias" → modal/drawer para CRUD de categorias

`/admin/blog/:id` (e `/new`) — Editor de post
- Layout 2 colunas:
  - **Esquerda (principal)**: Título, slug (auto + editável), capa (upload via `cms-media`), resumo, **editor rich text** (TipTap com bold/italic/heading/list/link/image/quote/code), tempo de leitura calculado automaticamente
  - **Direita (sidebar sticky)**: 
    - Status: rascunho / publicar agora / agendar (datepicker)
    - Categoria (select)
    - Autor
    - Card "SEO": seo_title (com contador 60), seo_description (160), keywords, OG image, canonical, toggle noindex, **preview do Google snippet**
- Topo: botões "Salvar rascunho", "Publicar", "Visualizar" (abre `/blog/:slug?preview=1`)
- Auto-save a cada 30s nos campos salvos

### Página pública `/blog` e `/blog/:slug`

- Refatorar `Blog.tsx` para buscar via `supabase.from('blog_posts')` filtrando publicados, com categorias dinâmicas
- Nova rota `/blog/:slug` — `BlogPost.tsx`:
  - Renderiza HTML do `content` com classe `prose`
  - Helmet com SEO completo (title, description, OG tags, canonical, noindex)
  - Capa, categoria, autor, data, tempo de leitura
  - JSON-LD `Article` schema para rich snippets
  - Posts relacionados (mesma categoria)

### Componentes novos

- `src/components/admin/RichTextEditor.tsx` — TipTap (`@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-link`, `@tiptap/extension-image`)
- `src/components/admin/SeoPanel.tsx` — campos SEO + preview Google
- `src/components/admin/PostStatusBadge.tsx`
- `src/lib/blog.ts` — helpers (slugify, calcReadingTime, fetch helpers)

### Atualizações de navegação

- `AdminLayout`: novo item de menu "Blog" (ícone `Newspaper`) entre "Páginas do site" e "Mídia"
- `AdminDashboard`: novo card "Blog"
- `App.tsx`: rotas `/admin/blog`, `/admin/blog/new`, `/admin/blog/:id`, `/blog/:slug`

### SEO / otimização

- `sitemap.xml`: gerado dinamicamente não cabe em estático, então adiciono nota mas mantenho sitemap manual; cada post tem canonical próprio
- Tags Open Graph + Twitter Card no post
- `<article>` semântico, headings hierárquicos
- Imagens com `loading="lazy"` e alt obrigatório no upload de capa

### Detalhes técnicos

- TipTap salva HTML no campo `content` (text). Sanitização via `dompurify` ao renderizar
- Slugify simples em `src/lib/blog.ts` (lowercase, remove acentos, troca espaços por `-`)
- Reading time: `Math.ceil(palavras / 200)`
- Auto-save via `useEffect` + debounce em mudanças
- Upload de capa/inline images reutiliza `uploadMedia` de `siteContent.ts`
- Agendamento: post com `status='scheduled'` + `scheduled_for` futuro fica oculto até `now() >= scheduled_for`. Para virar `published`, posso ajustar a RLS pública para tratar `scheduled_for <= now()` como visível, ou usar um cron edge function diário. Vou pela primeira opção (mais simples, sem infra extra)

### Pacotes a instalar

`@tiptap/react @tiptap/starter-kit @tiptap/extension-link @tiptap/extension-image dompurify @types/dompurify date-fns`

### O que NÃO faz parte deste plano

- Comentários nos posts
- Newsletter / RSS feed (posso adicionar depois se quiser)
- Multi-idioma
- Analytics por post além de contador simples de views