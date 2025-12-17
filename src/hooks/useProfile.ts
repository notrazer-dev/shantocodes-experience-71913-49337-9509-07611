
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export interface Profile {
    id: number;
    full_name: string;
    role: string;
    bio: string;
    email: string;
    github: string;
    linkedin: string;
    twitter?: string;
    instagram?: string;
    resume_url?: string;
    avatar_url?: string;
}

export const useProfile = () => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from("profile")
                .select("*")
                .limit(1)
                .single();

            if (error) {
                // If no rows found, we might need to handle that, but the SQL script inserts a default one.
                // However, if the table was created but emtpy (unlikely with my script), data would be null.
                if (error.code !== "PGRST116") { // PGRST116 is "The result contains 0 rows"
                    throw error;
                }
            }

            setProfile(data);
        } catch (err: any) {
            console.error("Error fetching profile:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const updateProfile = async (updates: Partial<Profile>) => {
        try {
            if (!profile) return;

            const { error } = await supabase
                .from("profile")
                .update(updates)
                .eq("id", profile.id);

            if (error) throw error;

            setProfile({ ...profile, ...updates });
            toast.success("Profile updated successfully");
            return true;
        } catch (error: any) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile");
            return false;
        }
    };

    return { profile, loading, error, refresh: fetchProfile, updateProfile };
};
