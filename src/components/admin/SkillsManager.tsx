import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useSkills } from "@/hooks/useSkills";

const SkillsManager = () => {
    const { skills, loading, error } = useSkills();
    const [open, setOpen] = useState(false);
    const [editingSkill, setEditingSkill] = useState<any>(null);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        category: "",
        icon: "",
        level: 50,
    });

    const resetForm = () => {
        setFormData({
            name: "",
            category: "",
            icon: "",
            level: 50,
        });
        setEditingSkill(null);
    };

    const handleEdit = (skill: any) => {
        setEditingSkill(skill);
        setFormData({
            name: skill.name,
            category: skill.category,
            icon: skill.icon || "",
            level: skill.level || 50,
        });
        setOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const skillData = {
                name: formData.name,
                category: formData.category,
                icon: formData.icon || null,
                level: formData.level,
            };

            if (editingSkill) {
                const { error } = await supabase
                    .from("skills")
                    .update(skillData)
                    .eq("id", editingSkill.id);

                if (error) throw error;
                toast.success("Skill updated successfully!");
            } else {
                const { error } = await supabase
                    .from("skills")
                    .insert([skillData]);

                if (error) throw error;
                toast.success("Skill created successfully!");
            }

            setOpen(false);
            resetForm();
            window.location.reload();
        } catch (error: any) {
            toast.error(error.message || "Failed to save skill");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this skill?")) return;

        try {
            const { error } = await supabase
                .from("skills")
                .delete()
                .eq("id", id);

            if (error) throw error;
            toast.success("Skill deleted successfully!");
            window.location.reload();
        } catch (error: any) {
            toast.error(error.message || "Failed to delete skill");
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
                <p>Failed to load skills</p>
            </div>
        );
    }

    // Group skills by category
    const groupedSkills = skills.reduce((acc: any, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
    }, {});

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Manage Skills</h2>
                <Dialog open={open} onOpenChange={(isOpen) => {
                    setOpen(isOpen);
                    if (!isOpen) resetForm();
                }}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Skill
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingSkill ? "Edit Skill" : "Add New Skill"}</DialogTitle>
                            <DialogDescription>
                                Fill in the skill details below
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Skill Name *</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="React"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="category">Category *</Label>
                                <Input
                                    id="category"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    placeholder="Frontend"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="icon">Icon Name (optional)</Label>
                                <Input
                                    id="icon"
                                    value={formData.icon}
                                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                    placeholder="react"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="level">Proficiency Level (1-100)</Label>
                                <Input
                                    id="level"
                                    type="number"
                                    min="1"
                                    max="100"
                                    value={formData.level}
                                    onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
                                />
                            </div>
                            <div className="flex gap-2 pt-4">
                                <Button type="submit" disabled={submitting} className="flex-1">
                                    {submitting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        editingSkill ? "Update Skill" : "Create Skill"
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

            {Object.keys(groupedSkills).length > 0 ? (
                <div className="space-y-6">
                    {Object.entries(groupedSkills).map(([category, categorySkills]: [string, any]) => (
                        <div key={category}>
                            <h3 className="text-xl font-semibold mb-3">{category}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {categorySkills.map((skill: any) => (
                                    <Card key={skill.id}>
                                        <CardHeader>
                                            <CardTitle className="text-lg">{skill.name}</CardTitle>
                                            <CardDescription>
                                                Level: {skill.level || "N/A"}%
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="flex-1"
                                                    onClick={() => handleEdit(skill)}
                                                >
                                                    <Pencil className="w-3 h-3 mr-1" />
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    className="flex-1"
                                                    onClick={() => handleDelete(skill.id)}
                                                >
                                                    <Trash2 className="w-3 h-3 mr-1" />
                                                    Delete
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 text-muted-foreground">
                    <p>No skills yet. Click "Add Skill" to create one.</p>
                </div>
            )}
        </div>
    );
};

export default SkillsManager;
