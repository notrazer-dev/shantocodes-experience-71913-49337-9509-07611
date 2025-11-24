import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    images?: string[];
    tech: string[];
    github: string;
    live?: string;
    featured: boolean;
}

export function useProjects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProjects() {
            try {
                const { data, error } = await supabase
                    .from('projects')
                    .select('*, project_images(url)')
                    .order('created_at', { ascending: false });

                if (error) throw error;

                // Transform the data to match the Project interface
                const transformedData = data?.map(project => ({
                    ...project,
                    images: project.project_images?.map((img: any) => img.url) || []
                })) || [];

                setProjects(transformedData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch projects');
                console.error('Error fetching projects:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchProjects();
    }, []);

    return { projects, loading, error };
}
