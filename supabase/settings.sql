
-- Create app_config table for dynamic settings
CREATE TABLE IF NOT EXISTS public.app_config (
    key VARCHAR(255) PRIMARY KEY,
    value TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.app_config ENABLE ROW LEVEL SECURITY;

-- Create policies

-- Allow public read for specific keys (like email form status)
CREATE POLICY "Public can read config" ON public.app_config
    FOR SELECT USING (true);

-- Allow authenticated users (admins) to update config
CREATE POLICY "Admins can update config" ON public.app_config
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users (admins) to insert config
CREATE POLICY "Admins can insert config" ON public.app_config
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Insert default values if they don't exist
INSERT INTO public.app_config (key, value, description)
VALUES 
    ('email_form_enabled', 'true', 'Enable or disable the contact form on the Contact page'),
    ('admin_emails', 'shantojoseph23@gmail.com', 'Comma-separated list of emails allowed to access the admin dashboard')
ON CONFLICT (key) DO NOTHING;
