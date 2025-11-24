import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface Skill {
    id: number;
    name: string;
    icon?: string;
}

export function useSkills() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchSkills() {
            try {
                const { data, error } = await supabase
                    .from('skills')
                    .select('*')
                    .order('name', { ascending: true });

                if (error) throw error;
                setSkills(data || []);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch skills');
                console.error('Error fetching skills:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchSkills();
    }, []);

    return { skills, loading, error };
}
