import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2, Loader2, Search } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useProjects } from "@/hooks/useProjects";

const ProjectsManager = () => {
    const { projects, loading, error } = useProjects();
    const [open, setOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<any>(null);
    const [submitting, setSubmitting] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: "",
        images: "",
        tech: "",
        github: "",
        live: "",
        featured: false,
    });

    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            image: "",
            images: "",
            tech: "",
            github: "",
            live: "",
            featured: false,
        });
        setEditingProject(null);
    };

    const handleEdit = (project: any) => {
        setEditingProject(project);
        setFormData({
            title: project.title,
            description: project.description,
            image: project.image,
            images: project.images?.join(", ") || "",
            tech: project.tech.join(", "),
            github: project.github,
            live: project.live || "",
            featured: project.featured,
        });
        setOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const projectData = {
                title: formData.title,
                description: formData.description,
                image: formData.image,
                images: formData.images ? formData.images.split(",").map(s => s.trim()) : null,
                tech: formData.tech.split(",").map(s => s.trim()),
                github: formData.github,
                live: formData.live || null,
                featured: formData.featured,
            };

            if (editingProject) {
                const { error } = await supabase
                    .from("projects")
                    .update(projectData)
                    .eq("id", editingProject.id);

                if (error) throw error;
                toast.success("Project updated successfully!");
            } else {
                const { error } = await supabase
                    .from("projects")
                    .insert([projectData]);

                if (error) throw error;
                toast.success("Project created successfully!");
            }

            setOpen(false);
            resetForm();
            window.location.reload();
        } catch (error: any) {
            toast.error(error.message || "Failed to save project");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this project?")) return;

        try {
            const { error } = await supabase
                .from("projects")
                .delete()
                .eq("id", id);

            if (error) throw error;
            toast.success("Project deleted successfully!");
            window.location.reload();
        } catch (error: any) {
            toast.error(error.message || "Failed to delete project");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-destructive py-8">
                <p>Failed to load projects</p>
            </div>
        );
    }

    // Filter projects based on search query
    const filteredProjects = projects.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold">Manage Projects</h2>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:flex-initial">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search projects..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 w-full sm:w-[250px]"
                        />
                    </div>
                    <Dialog open={open} onOpenChange={(isOpen) => {
                        setOpen(isOpen);
                        if (!isOpen) resetForm();
                    }}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="w-4 h-4 mr-2" />
                                Add Project
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>{editingProject ? "Edit Project" : "Add New Project"}</DialogTitle>
                                <DialogDescription>
                                    Fill in the project details below
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title *</Label>
                                    <Input
                                        id="title"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description *</Label>
                                    <Textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        required
                                        rows={3}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="image">Main Image URL *</Label>
                                    <Input
                                        id="image"
                                        type="url"
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="images">Additional Images (comma-separated URLs)</Label>
                                    <Input
                                        id="images"
                                        value={formData.images}
                                        onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                                        placeholder="https://image1.jpg, https://image2.jpg"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="tech">Technologies (comma-separated) *</Label>
                                    <Input
                                        id="tech"
                                        value={formData.tech}
                                        onChange={(e) => setFormData({ ...formData, tech: e.target.value })}
                                        placeholder="React, TypeScript, Node.js"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="github">GitHub URL *</Label>
                                    <Input
                                        id="github"
                                        type="url"
                                        value={formData.github}
                                        onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="live">Live URL (optional)</Label>
                                    <Input
                                        id="live"
                                        type="url"
                                        value={formData.live}
                                        onChange={(e) => setFormData({ ...formData, live: e.target.value })}
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="featured"
                                        checked={formData.featured}
                                        onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                                    />
                                    <Label htmlFor="featured">Featured Project</Label>
                                </div>
                                <div className="flex gap-2 pt-4">
                                    <Button type="submit" disabled={submitting} className="flex-1">
                                        {submitting ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            editingProject ? "Update Project" : "Create Project"
                                        )}
                                    </Button>
                                    <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredProjects.map((project) => (
                        <Card key={project.id}>
                            <CardHeader>
                                <div className="aspect-video relative overflow-hidden rounded-md mb-2">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <CardTitle className="text-lg">{project.title}</CardTitle>
                                <CardDescription className="line-clamp-2">
                                    {project.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-1 mb-3">
                                    {project.tech.slice(0, 3).map((tech) => (
                                        <span key={tech} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                                            {tech}
                                        </span>
                                    ))}
                                    {project.tech.length > 3 && (
                                        <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                                            +{project.tech.length - 3}
                                        </span>
                                    )}
                                </div>
                                {project.featured && (
                                    <div className="mb-3">
                                        <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded">
                                            Featured
                                        </span>
                                    </div>
                                )}
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1"
                                        onClick={() => handleEdit(project)}
                                    >
                                        <Pencil className="w-3 h-3 mr-1" />
                                        Edit
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        className="flex-1"
                                        onClick={() => handleDelete(project.id)}
                                    >
                                        <Trash2 className="w-3 h-3 mr-1" />
                                        Delete
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 text-muted-foreground">
                    <p>{searchQuery ? `No projects found matching "${searchQuery}"` : "No projects yet. Click \"Add Project\" to create one."}</p>
                </div>
            )}
        </div>
    );
};

export default ProjectsManager;
