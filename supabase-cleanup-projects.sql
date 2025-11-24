-- Drop the redundant 'images' column from the projects table
-- We have moved additional images to the 'project_images' table
ALTER TABLE projects DROP COLUMN IF EXISTS images;
