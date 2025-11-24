-- ============================================
-- Supabase Skills Table Setup Script
-- ============================================
-- This script creates the skills table, inserts data, and sets up RLS policies

-- Step 1: Drop the table if it exists (optional - remove if you want to keep existing data)
DROP TABLE IF EXISTS skills CASCADE;

-- Step 2: Create the skills table
CREATE TABLE skills (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    icon TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Step 3: Insert all skills data
INSERT INTO skills (name, icon) VALUES
    ('React', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'),
    ('TypeScript', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'),
    ('Tailwind CSS', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg'),
    ('Next.js', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg'),
    ('Node.js', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg'),
    ('Python', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'),
    ('Java', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg'),
    ('FastAPI', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg'),
    ('PostgreSQL', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg'),
    ('MongoDB', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg'),
    ('Redis', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg'),
    ('Supabase', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg'),
    ('TensorFlow', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg'),
    ('PyTorch', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg'),
    ('Scikit-learn', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg'),
    ('NLP', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'),
    ('Docker', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg'),
    ('Git', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg'),
    ('CI/CD', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg'),
    ('AWS', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg'),
    ('Figma', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg'),
    ('Responsive Design', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg'),
    ('Accessibility', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/w3c/w3c-original.svg'),
    ('UI/UX', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg');

-- Step 4: Enable Row Level Security (RLS)
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

-- Step 5: Create policy to allow public read access (SELECT)
CREATE POLICY "Allow public read access to skills"
ON skills
FOR SELECT
TO anon, authenticated
USING (true);

-- Step 6: Create policies to allow authenticated users to insert/update/delete
CREATE POLICY "Allow authenticated users to insert skills"
ON skills
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update skills"
ON skills
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete skills"
ON skills
FOR DELETE
TO authenticated
USING (true);

-- Step 7: Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 8: Create a trigger to call the function before updates
CREATE TRIGGER update_skills_updated_at
BEFORE UPDATE ON skills
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Verification Queries (run these to verify)
-- ============================================

-- Check if table was created successfully
-- SELECT * FROM skills ORDER BY name;

-- ============================================
-- End of Script
-- ============================================
