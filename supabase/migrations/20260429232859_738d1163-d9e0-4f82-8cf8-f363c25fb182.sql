-- Attach triggers to auth.users so new signups get profile + first admin gets the role
DROP TRIGGER IF EXISTS on_auth_user_created_profile ON auth.users;
CREATE TRIGGER on_auth_user_created_profile
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

DROP TRIGGER IF EXISTS on_auth_user_created_bootstrap_admin ON auth.users;
CREATE TRIGGER on_auth_user_created_bootstrap_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.bootstrap_first_admin();

-- Promote the existing user (karinneglg@gmail.com) to admin if no admin exists yet
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role FROM auth.users WHERE email = 'karinneglg@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;

-- Ensure profile row exists for that user
INSERT INTO public.profiles (user_id, display_name)
SELECT id, COALESCE(raw_user_meta_data->>'full_name', email)
FROM auth.users WHERE email = 'karinneglg@gmail.com'
ON CONFLICT DO NOTHING;