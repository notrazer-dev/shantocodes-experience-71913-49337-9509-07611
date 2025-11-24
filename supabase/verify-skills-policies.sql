-- ============================================
-- Verify Skills Table RLS Policies
-- ============================================
-- Run this to check all existing policies on the skills table

SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'skills'
ORDER BY cmd, policyname;
