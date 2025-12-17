
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2, Loader2, Search, Eye, FileText } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useBlog, BlogPost } from "@/hooks/useBlog";

const BlogManager = () => {
    const { posts, loading, error, refresh } = useBlog();
    const [open, setOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        featured_image: "",
        published: false,
        featured: false,
        tags: "",
        meta_title: "",
        meta_description: ""
    });

    const resetForm = () => {
        setFormData({
            title: "",
            slug: "",
            excerpt: "",
            content: "",
            featured_image: "",
            published: false,
            featured: false,
            tags: "",
            meta_title: "",
            meta_description: ""
        });
        setEditingPost(null);
    };

    const handleEdit = (post: BlogPost) => {
        setEditingPost(post);
        setFormData({
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt || "",
            content: post.content,
            featured_image: post.featured_image || "",
            published: post.published,
            featured: post.featured,
            tags: post.tags ? post.tags.join(", ") : "",
            meta_title: post.meta_title || "",
            meta_description: post.meta_description || ""
        });
        setOpen(true);
    };

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        const updates: any = { title };
        if (!editingPost && !formData.slug) {
            updates.slug = generateSlug(title);
        }
        setFormData({ ...formData, ...updates });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const postData = {
                title: formData.title,
                slug: formData.slug || generateSlug(formData.title),
                excerpt: formData.excerpt,
                content: formData.content,
                featured_image: formData.featured_image,
                published: formData.published,
                featured: formData.featured,
                tags: formData.tags.split(",").map(s => s.trim()).filter(s => s !== ""),
                meta_title: formData.meta_title,
                meta_description: formData.meta_description,
                published_at: formData.published ? (editingPost?.published_at || new Date().toISOString()) : null
            };

            if (editingPost) {
                const { error } = await supabase
                    .from("blog_posts")
                    .update(postData)
                    .eq("id", editingPost.id);

                if (error) throw error;
                toast.success("Blog post updated successfully!");
            } else {
                const { error } = await supabase
                    .from("blog_posts")
                    .insert([postData]);

                if (error) throw error;
                toast.success("Blog post created successfully!");
            }

            setOpen(false);
            resetForm();
            refresh();
        } catch (error: any) {
            console.error("Error saving post:", error);
            toast.error(error.message || "Failed to save post");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this post?")) return;

        try {
            const { error } = await supabase
                .from("blog_posts")
                .delete()
                .eq("id", id);

            if (error) throw error;
            toast.success("Post deleted successfully!");
            refresh();
        } catch (error: any) {
            toast.error(error.message || "Failed to delete post");
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
                <p>Failed to load blog posts</p>
            </div>
        );
    }

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold">Manage Blog Posts</h2>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:flex-initial">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search posts..."
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
                                New Post
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>{editingPost ? "Edit Post" : "Create New Post"}</DialogTitle>
                                <DialogDescription>
                                    Write and manage your blog content
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Title *</Label>
                                        <Input
                                            id="title"
                                            value={formData.title}
                                            onChange={handleTitleChange}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="slug">Slug *</Label>
                                        <Input
                                            id="slug"
                                            value={formData.slug}
                                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="excerpt">Excerpt</Label>
                                    <Textarea
                                        id="excerpt"
                                        value={formData.excerpt}
                                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                        rows={2}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="content">Content (Markdown) *</Label>
                                    <Textarea
                                        id="content"
                                        value={formData.content}
                                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                        required
                                        rows={10}
                                        className="font-mono text-sm"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="featured_image">Featured Image URL</Label>
                                    <Input
                                        id="featured_image"
                                        value={formData.featured_image}
                                        onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="tags">Tags (comma separated)</Label>
                                    <Input
                                        id="tags"
                                        value={formData.tags}
                                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                        placeholder="tech, tutorial, ai"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="meta_title">Meta Title</Label>
                                        <Input
                                            id="meta_title"
                                            value={formData.meta_title}
                                            onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="meta_description">Meta Description</Label>
                                        <Input
                                            id="meta_description"
                                            value={formData.meta_description}
                                            onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-6 pt-2">
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="published"
                                            checked={formData.published}
                                            onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                                        />
                                        <Label htmlFor="published">Published</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="featured"
                                            checked={formData.featured}
                                            onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                                        />
                                        <Label htmlFor="featured">Featured</Label>
                                    </div>
                                </div>

                                <div className="flex gap-2 pt-4">
                                    <Button type="submit" disabled={submitting} className="flex-1">
                                        {submitting ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            editingPost ? "Update Post" : "Create Post"
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

            <div className="grid grid-cols-1 gap-4">
                {filteredPosts.map((post) => (
                    <Card key={post.id} className="overflow-hidden">
                        <div className="flex flex-col md:flex-row gap-4 p-4">
                            {post.featured_image && (
                                <div className="w-full md:w-48 h-32 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                                    <img
                                        src={post.featured_image}
                                        alt={post.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                    <div>
                                        <h3 className="text-lg font-bold truncate">{post.title}</h3>
                                        <div className="flex gap-2 my-1">
                                            {post.published ? (
                                                <span className="px-2 py-0.5 bg-green-500/10 text-green-500 text-xs rounded-full">Published</span>
                                            ) : (
                                                <span className="px-2 py-0.5 bg-yellow-500/10 text-yellow-500 text-xs rounded-full">Draft</span>
                                            )}
                                            {post.featured && (
                                                <span className="px-2 py-0.5 bg-blue-500/10 text-blue-500 text-xs rounded-full">Featured</span>
                                            )}
                                            <span className="text-xs text-muted-foreground">{new Date(post.created_at).toLocaleDateString()}</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                            {post.excerpt || post.content.substring(0, 150)}...
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2 mt-4 justify-end md:justify-start">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleEdit(post)}
                                    >
                                        <Pencil className="w-3 h-3 mr-1" />
                                        Edit
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleDelete(post.id)}
                                    >
                                        <Trash2 className="w-3 h-3 mr-1" />
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
                {filteredPosts.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                        <p>{searchQuery ? "No posts found" : "No blog posts yet. Create one to get started."}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogManager;
