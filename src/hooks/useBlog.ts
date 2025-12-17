
import { useState, useEffect } from 'react';
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featured_image: string;
    published: boolean;
    featured: boolean;
    tags: string[];
    meta_title: string;
    meta_description: string;
    created_at: string;
    updated_at: string;
    published_at: string;
}

export const useBlog = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('blog_posts')
                .select('*')
                .order('published_at', { ascending: false });

            if (error) {
                throw error;
            }

            setPosts(data || []);
        } catch (error: any) {
            console.error('Error fetching blog posts:', error);
            setError(error);
            toast.error('Failed to load blog posts');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const getPostBySlug = async (slug: string) => {
        try {
            const { data, error } = await supabase
                .from('blog_posts')
                .select('*')
                .eq('slug', slug)
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error fetching post:', error);
            return null;
        }
    };

    return { posts, loading, error, refresh: fetchPosts, getPostBySlug };
};
