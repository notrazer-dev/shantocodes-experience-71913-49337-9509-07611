import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2, Loader2, Search } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useSkills } from "@/hooks/useSkills";

const SkillsManager = () => {
    const { skills, loading, error } = useSkills();
    const [open, setOpen] = useState(false);
    const [editingSkill, setEditingSkill] = useState<any>(null);
    const [submitting, setSubmitting] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        icon: "",
    });

    const resetForm = () => {
        setFormData({
            name: "",
            icon: "",
        });
        setEditingSkill(null);
    };

    const handleEdit = (skill: any) => {
        setEditingSkill(skill);
        setFormData({
            name: skill.name,
            icon: skill.icon || "",
        });
        setOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const skillData = {
                name: formData.name,
                icon: formData.icon || null,
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

    // Filter skills based on search query
    const filteredSkills = skills.filter(skill =>
        skill.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold">Manage Skills</h2>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:flex-initial">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search skills..."
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
                                    <Label htmlFor="icon">Icon URL</Label>
                                    <Input
                                        id="icon"
                                        value={formData.icon}
                                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                        placeholder="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Paste the full URL to the skill icon image
                                    </p>
                                    {formData.icon && (
                                        <div className="flex items-center gap-2 p-2 border rounded">
                                            <img src={formData.icon} alt="Preview" className="w-8 h-8 object-contain" />
                                            <span className="text-sm text-muted-foreground">Icon Preview</span>
                                        </div>
                                    )}
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
            </div>

            {filteredSkills.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredSkills.map((skill: any) => (
                        <Card key={skill.id}>
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    {skill.icon && (
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center p-2">
                                            <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain" />
                                        </div>
                                    )}
                                    <CardTitle className="text-lg">{skill.name}</CardTitle>
                                </div>
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
            ) : (
                <div className="text-center py-12 text-muted-foreground">
                    <p>{searchQuery ? `No skills found matching "${searchQuery}"` : "No skills yet. Click \"Add Skill\" to create one."}</p>
                </div>
            )}
        </div>
    );
};

export default SkillsManager;
