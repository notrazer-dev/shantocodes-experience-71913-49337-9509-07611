import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Plus, FolderKanban, Code, Settings, BarChart3, FileText, User } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import ProjectsManager from "@/components/admin/ProjectsManager";
import SkillsManager from "@/components/admin/SkillsManager";
import AnalyticsManager from "@/components/admin/AnalyticsManager";
import { useProjects } from "@/hooks/useProjects";
import { useSkills } from "@/hooks/useSkills";

import { useBlog } from "@/hooks/useBlog";
import BlogManager from "@/components/admin/BlogManager";
import ProfileManager from "@/components/admin/ProfileManager";
import SettingsManager from "@/components/admin/SettingsManager";
import { SettingsDialog } from "@/components/SettingsDialog";
import { useAppConfig } from "@/hooks/useAppConfig";

const AdminDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const { getConfig, loading: configLoading } = useAppConfig();

    // Fetch data for stats
    const { projects } = useProjects();

    const { skills } = useSkills();
    const { posts } = useBlog();

    // Get active tab from URL or default to 'projects'
    const activeTab = searchParams.get('tab') || 'projects';

    useEffect(() => {
        if (!configLoading) {
            checkUser();
        }
    }, [configLoading]);

    const checkUser = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                navigate("/razer");
                return;
            }

            // Whitelist check
            const envEmails = (import.meta.env.VITE_ADMIN_EMAILS || "").split(",").map((e: string) => e.trim());
            const dbEmails = (getConfig('admin_emails') || "").split(",").map((e: string) => e.trim());

            // Allow if in EITHER .env OR db
            const allowedEmails = [...new Set([...envEmails, ...dbEmails])].filter(Boolean);

            if (user.email && !allowedEmails.includes(user.email)) {
                await supabase.auth.signOut();
                toast.error("Unauthorized access. Your email is not whitelisted.");
                navigate("/razer");
                return;
            }

            setUser(user);
        } catch (error) {
            navigate("/razer");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await supabase.auth.signOut();
            toast.success("Logged out successfully");
            navigate("/razer");
        } catch (error: any) {
            toast.error("Logout failed");
        }
    };

    const handleTabChange = (value: string) => {
        setSearchParams({ tab: value });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    const featuredProjectsCount = projects.filter((p: any) => p.featured).length;

    return (
        <div className="min-h-screen bg-transparent p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold">Admin Dashboard</h1>
                        <p className="text-muted-foreground mt-1 text-sm">
                            Manage your portfolio content
                        </p>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end flex-wrap">
                        {user && (
                            <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-lg bg-card/50 backdrop-blur-sm border border-primary/20">
                                <img
                                    src={user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.email || 'User')}&background=random`}
                                    alt="Profile"
                                    className="w-8 h-8 rounded-full ring-2 ring-primary/20"
                                />
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium">{user.user_metadata?.full_name || user.email}</span>
                                    {user.user_metadata?.full_name && (
                                        <span className="text-xs text-muted-foreground">{user.email}</span>
                                    )}
                                </div>
                            </div>
                        )}
                        <div className="flex items-center gap-2">
                            <SettingsDialog>
                                <Button variant="outline" size="icon">
                                    <Settings className="w-4 h-4" />
                                </Button>
                            </SettingsDialog>
                            <Button variant="outline" onClick={handleLogout} className="hidden sm:flex">
                                <LogOut className="w-4 h-4 mr-2" />
                                Logout
                            </Button>
                            <Button variant="outline" size="icon" onClick={handleLogout} className="sm:hidden">
                                <LogOut className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Projects
                            </CardTitle>
                            <FolderKanban className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{projects.length}</div>
                            <p className="text-xs text-muted-foreground">
                                Manage your projects
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Skills
                            </CardTitle>
                            <Code className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{skills.length}</div>
                            <p className="text-xs text-muted-foreground">
                                Manage your skills
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Featured Projects
                            </CardTitle>
                            <Plus className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{featuredProjectsCount}</div>
                            <p className="text-xs text-muted-foreground">
                                Highlighted on homepage
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Blog Posts
                            </CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{posts.length}</div>
                            <p className="text-xs text-muted-foreground">
                                Manage your articles
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Content Tabs */}
                <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="projects">Projects</TabsTrigger>
                        <TabsTrigger value="skills">Skills</TabsTrigger>
                        <TabsTrigger value="blog">Blog</TabsTrigger>
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                        <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    </TabsList>
                    <TabsContent value="projects" className="space-y-4">
                        <ProjectsManager />
                    </TabsContent>
                    <TabsContent value="skills" className="space-y-4">
                        <SkillsManager />
                    </TabsContent>
                    <TabsContent value="blog" className="space-y-4">
                        <BlogManager />
                    </TabsContent>
                    <TabsContent value="profile" className="space-y-4">
                        <ProfileManager />
                    </TabsContent>
                    <TabsContent value="settings" className="space-y-4">
                        <SettingsManager />
                    </TabsContent>
                    <TabsContent value="analytics" className="space-y-4">
                        <AnalyticsManager />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default AdminDashboard;
