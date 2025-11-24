import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Loader2, Home } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { SettingsDialog } from "@/components/SettingsDialog";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            toast.success("Login successful!");
            navigate("/razer/dashboard");
        } catch (error: any) {
            toast.error(error.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/razer/dashboard`,
                },
            });
            if (error) throw error;
        } catch (error: any) {
            toast.error(error.message || "Google login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative">
            {/* Navigation Buttons */}
            <div className="absolute bottom-6 left-6 z-10">
                <Link to="/">
                    <Button variant="outline" size="icon" className="h-12 w-12 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all duration-300 border-primary/20 shadow-lg hover:shadow-primary/20 hover:scale-105">
                        <Home className="w-5 h-5" />
                    </Button>
                </Link>
            </div>

            <div className="absolute bottom-6 right-6 z-10">
                <SettingsDialog variant="icon" />
            </div>

            <Card className="w-full max-w-md bg-card/30 backdrop-blur-xl border-primary/20 shadow-2xl animate-in fade-in zoom-in-95 duration-500">
                <CardHeader className="text-center pb-2">
                    <CardTitle className="text-3xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                        Admin Access
                    </CardTitle>
                    <CardDescription className="text-muted-foreground/80 font-medium">
                        Enter your credentials to continue
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium ml-1">
                                Email
                            </label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="admin@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={loading}
                                className="bg-background/50 border-primary/10 focus:border-primary/50 transition-all duration-300"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium ml-1">
                                Password
                            </label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={loading}
                                className="bg-background/50 border-primary/10 focus:border-primary/50 transition-all duration-300"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full mt-4 font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Authenticating...
                                </>
                            ) : (
                                "Login"
                            )}
                        </Button>

                        <div className="relative my-4">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-primary/20" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background/20 backdrop-blur-md px-2 text-muted-foreground rounded">Or continue with</span>
                            </div>
                        </div>

                        <Button
                            variant="outline"
                            type="button"
                            className="w-full bg-background/50 border-primary/20 hover:bg-background/80 transition-all duration-300"
                            onClick={handleGoogleLogin}
                        >
                            <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                                <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                            </svg>
                            Google
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminLogin;
