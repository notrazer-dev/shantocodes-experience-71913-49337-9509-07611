-- ============================================
-- Add Missing RLS Policies for Skills Table
-- ============================================
-- Run this script to add INSERT, UPDATE, and DELETE policies
-- for authenticated users without recreating the table

-- Add policy to allow authenticated users to insert skills
CREATE POLICY "Allow authenticated users to insert skills"
ON skills
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Add policy to allow authenticated users to update skills
CREATE POLICY "Allow authenticated users to update skills"
ON skills
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Add policy to allow authenticated users to delete skills
CREATE POLICY "Allow authenticated users to delete skills"
ON skills
FOR DELETE
TO authenticated
USING (true);

-- ============================================
-- Verification
-- ============================================
-- Check all policies on the skills table
-- SELECT * FROM pg_policies WHERE tablename = 'skills';
