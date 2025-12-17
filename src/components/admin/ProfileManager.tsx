
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Save } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";

const ProfileManager = () => {
    const { profile, loading, updateProfile } = useProfile();
    const [formData, setFormData] = useState({
        full_name: "",
        role: "",
        bio: "",
        email: "",
        github: "",
        linkedin: "",
        twitter: "",
        instagram: "",
        resume_url: "",
        avatar_url: ""
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (profile) {
            setFormData({
                full_name: profile.full_name || "",
                role: profile.role || "",
                bio: profile.bio || "",
                email: profile.email || "",
                github: profile.github || "",
                linkedin: profile.linkedin || "",
                twitter: profile.twitter || "",
                instagram: profile.instagram || "",
                resume_url: profile.resume_url || "",
                avatar_url: profile.avatar_url || ""
            });
        }
    }, [profile]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        await updateProfile(formData);
        setSubmitting(false);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-8">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="p-8 text-center text-muted-foreground">
                <p>No profile data found. Please run the migration script.</p>
            </div>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                    Manage your personal information, bio, and social links.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="full_name">Full Name</Label>
                            <Input
                                id="full_name"
                                name="full_name"
                                value={formData.full_name}
                                onChange={handleChange}
                                placeholder="Shanto Joseph"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role">Role / Title</Label>
                            <Input
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                placeholder="Full-Stack Developer"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Brief description about yourself"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="github">GitHub URL</Label>
                            <Input
                                id="github"
                                name="github"
                                value={formData.github}
                                onChange={handleChange}
                                placeholder="https://github.com/username"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="linkedin">LinkedIn URL</Label>
                            <Input
                                id="linkedin"
                                name="linkedin"
                                value={formData.linkedin}
                                onChange={handleChange}
                                placeholder="https://linkedin.com/in/username"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="twitter">Twitter / X URL</Label>
                            <Input
                                id="twitter"
                                name="twitter"
                                value={formData.twitter}
                                onChange={handleChange}
                                placeholder="https://twitter.com/username"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="instagram">Instagram URL</Label>
                            <Input
                                id="instagram"
                                name="instagram"
                                value={formData.instagram}
                                onChange={handleChange}
                                placeholder="https://instagram.com/username"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="resume_url">Resume URL</Label>
                            <Input
                                id="resume_url"
                                name="resume_url"
                                value={formData.resume_url}
                                onChange={handleChange}
                                placeholder="Link to your resume PDF"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="avatar_url">Avatar URL</Label>
                            <Input
                                id="avatar_url"
                                name="avatar_url"
                                value={formData.avatar_url}
                                onChange={handleChange}
                                placeholder="Link to your profile picture"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" disabled={submitting}>
                            {submitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Changes
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default ProfileManager;
