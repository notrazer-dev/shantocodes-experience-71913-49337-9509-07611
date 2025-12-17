
-- Create profile table
CREATE TABLE IF NOT EXISTS public.profile (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL DEFAULT 'Shanto Joseph',
    role VARCHAR(255) NOT NULL DEFAULT 'Full-Stack Developer',
    bio TEXT NOT NULL DEFAULT 'Turning ideas into interactive, dynamic, and scalable digital experiences.',
    email VARCHAR(255) NOT NULL DEFAULT 'shantojoseph23@gmail.com',
    github VARCHAR(255) DEFAULT 'https://github.com/shanto-joseph',
    linkedin VARCHAR(255) DEFAULT 'https://www.linkedin.com/in/shanto-joseph',
    twitter VARCHAR(255),
    instagram VARCHAR(255),
    resume_url VARCHAR(255),
    avatar_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_profile_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profile_updated_at_trigger
    BEFORE UPDATE ON public.profile
    FOR EACH ROW
    EXECUTE FUNCTION update_profile_updated_at();

-- Enable RLS
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow public read access
CREATE POLICY "Public can view profile" ON public.profile
    FOR SELECT USING (true);

-- Allow authenticated users (admin) to update
CREATE POLICY "Authenticated users can update profile" ON public.profile
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users to insert (only if empty, effectively)
CREATE POLICY "Authenticated users can insert profile" ON public.profile
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Insert default data if not exists
INSERT INTO public.profile (full_name, role, bio, email, github, linkedin)
SELECT 'Shanto Joseph', 'Full-Stack Developer', 'Turning ideas into interactive, dynamic, and scalable digital experiences.', 'shantojoseph23@gmail.com', 'https://github.com/shanto-joseph', 'https://www.linkedin.com/in/shanto-joseph'
WHERE NOT EXISTS (SELECT 1 FROM public.profile);
