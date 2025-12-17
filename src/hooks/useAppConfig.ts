
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export interface AppConfig {
    key: string;
    value: string;
    description?: string;
}

export const useAppConfig = () => {
    const [config, setConfig] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    const fetchConfig = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from("app_config")
                .select("*");

            if (error) {
                throw error;
            }

            if (data) {
                const configMap = data.reduce((acc: any, item: AppConfig) => {
                    acc[item.key] = item.value;
                    return acc;
                }, {});
                setConfig(configMap);
            }
        } catch (err: any) {
            console.error("Error fetching app config:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchConfig();
    }, []);

    const updateConfig = async (key: string, value: string) => {
        try {
            const { error } = await supabase
                .from("app_config")
                .upsert({ key, value, updated_at: new Date().toISOString() });

            if (error) throw error;

            setConfig(prev => ({ ...prev, [key]: value }));
            toast.success(`Setting '${key}' updated successfully`);
            return true;
        } catch (error: any) {
            console.error(`Error updating setting '${key}':`, error);
            toast.error(`Failed to update setting '${key}'`);
            return false;
        }
    };

    // Helper to get with default fallback
    const getConfig = (key: string, defaultValue?: string) => {
        return config[key] ?? defaultValue;
    };

    return { config, loading, error, refresh: fetchConfig, updateConfig, getConfig };
};
