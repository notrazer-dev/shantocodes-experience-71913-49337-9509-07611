
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Save, RefreshCw } from "lucide-react";
import { useAppConfig } from "@/hooks/useAppConfig";

const SettingsManager = () => {
    const { config, loading, updateConfig, refresh } = useAppConfig();
    const [emailFormEnabled, setEmailFormEnabled] = useState(true);
    const [adminEmails, setAdminEmails] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (config) {
            setEmailFormEnabled(config['email_form_enabled'] === 'true');
            setAdminEmails(config['admin_emails'] || "");
        }
    }, [config]);

    const handleSave = async () => {
        setSubmitting(true);
        // Save both settings
        const p1 = updateConfig('email_form_enabled', String(emailFormEnabled));
        const p2 = updateConfig('admin_emails', adminEmails);

        await Promise.all([p1, p2]);
        setSubmitting(false);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-8">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Site Settings</h2>
                <Button variant="outline" size="sm" onClick={refresh}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Contact Form</CardTitle>
                    <CardDescription>
                        Control the visibility of the contact form on the Contact page.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between space-y-2">
                        <Label htmlFor="email-form-mode" className="flex flex-col space-y-1">
                            <span>Enable Contact Form</span>
                            <span className="font-normal text-xs text-muted-foreground">
                                If disabled, only contact details (email, socials) will be shown.
                            </span>
                        </Label>
                        <Switch
                            id="email-form-mode"
                            checked={emailFormEnabled}
                            onCheckedChange={setEmailFormEnabled}
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Admin Access</CardTitle>
                    <CardDescription>
                        Manage who can access this dashboard.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="admin-emails">Admin Emails</Label>
                        <Input
                            id="admin-emails"
                            value={adminEmails}
                            onChange={(e) => setAdminEmails(e.target.value)}
                            placeholder="email1@example.com, email2@example.com"
                        />
                        <p className="text-xs text-muted-foreground">
                            Comma-separated list of emails allowed to log in.
                            <strong> WARNING:</strong> Ensure your own email is included before saving!
                        </p>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button onClick={handleSave} disabled={submitting}>
                    {submitting ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save className="w-4 h-4 mr-2" />
                            Save Configuration
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
};

export default SettingsManager;
