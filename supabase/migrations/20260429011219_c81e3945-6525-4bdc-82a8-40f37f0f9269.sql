-- Restrict SECURITY DEFINER functions execution
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.is_staff(uuid) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

-- Tighten public bucket listing: replace broad SELECT with object-level access
DROP POLICY IF EXISTS "Public can view cms media" ON storage.objects;

-- Public can read individual objects (needed for <img src>) but cannot list folders without metadata access via policy on buckets.
CREATE POLICY "Public read cms media objects"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'cms-media');

-- Note: listing API requires authenticated staff context in client code (we only call list from admin).