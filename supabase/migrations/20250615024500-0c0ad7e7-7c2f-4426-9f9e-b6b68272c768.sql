
-- Create a function to automatically set admin role for the specific email
CREATE OR REPLACE FUNCTION public.set_admin_role_for_lara()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if this is the admin user by email
  IF NEW.email = 'lara@terrah.villas' THEN
    -- Insert or update the profile with admin role
    INSERT INTO public.profiles (id, role, created_at, updated_at)
    VALUES (NEW.id, 'admin', now(), now())
    ON CONFLICT (id) DO UPDATE SET
      role = 'admin',
      updated_at = now();
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger to automatically assign admin role when this user signs up
DROP TRIGGER IF EXISTS on_auth_user_created_admin ON auth.users;
CREATE TRIGGER on_auth_user_created_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW
  WHEN (NEW.email = 'lara@terrah.villas')
  EXECUTE FUNCTION public.set_admin_role_for_lara();
