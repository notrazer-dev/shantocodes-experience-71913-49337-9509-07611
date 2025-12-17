
import { SEO } from "@/components/SEO";
import { VerticalNav } from "@/components/VerticalNav";
import { BottomNav } from "@/components/BottomNav";
import Footer from "@/components/Footer";
import { useBlog } from "@/hooks/useBlog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ArrowLeft, Calendar, User, Clock, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const Blog = () => {
    const { posts, loading, error } = useBlog();
    const publishedPosts = posts.filter(post => post.published);

    return (
        <>
            <div className="min-h-screen w-full overflow-x-hidden">
                <SEO
                    title="Blog | Shanto Joseph"
                    description="Thoughts, tutorials, and insights on web development, AI, and technology by Shanto Joseph."
                    keywords="blog, web development, AI, tutorials, Shanto Joseph blog"
                    type="website"
                />
                {/* Desktop navigation */}
                <div className="hidden xl:block">
                    <VerticalNav />
                </div>

                {/* Mobile/Tablet navigation */}
                <div className="xl:hidden">
                    <BottomNav />
                </div>

                <main className="flex-1">
                    <section
                        className="py-20 px-4 min-h-screen"
                        style={{ background: 'linear-gradient(to bottom, transparent 0%, transparent 20%, hsl(var(--background)) 40%, hsl(var(--background)) 85%, transparent 100%)' }}
                    >
                        <div className="container mx-auto max-w-5xl">
                            <Link to="/">
                                <Button variant="ghost" className="mb-8">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to Home
                                </Button>
                            </Link>

                            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                Blog & Articles
                            </h1>
                            <p className="text-muted-foreground mb-12 max-w-2xl text-lg">
                                Thoughts, tutorials, and insights on web development, AI, and technology.
                            </p>

                            {loading && (
                                <div className="flex items-center justify-center min-h-[400px]">
                                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                                </div>
                            )}

                            {error && (
                                <div className="text-center text-destructive">
                                    <p>Failed to load blog posts. Please try again later.</p>
                                </div>
                            )}

                            {!loading && !error && (
                                <div className="grid grid-cols-1 gap-8">
                                    {publishedPosts.length > 0 ? (
                                        publishedPosts.map((post, index) => (
                                            <Card
                                                key={post.id}
                                                className="glass-card border-border/50 overflow-hidden group hover:shadow-2xl transition-all duration-300 animate-fade-in flex flex-col md:flex-row"
                                                style={{ animationDelay: `${index * 0.1}s` }}
                                            >
                                                {post.featured_image && (
                                                    <div className="md:w-1/3 h-64 md:h-auto relative overflow-hidden">
                                                        <img
                                                            src={post.featured_image}
                                                            alt={post.title}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                        />
                                                    </div>
                                                )}
                                                <div className="flex-1 flex flex-col p-6 md:p-8">
                                                    <div className="flex flex-wrap gap-3 mb-4 text-xs text-muted-foreground">
                                                        <span className="flex items-center gap-1">
                                                            <Calendar className="w-3 h-3" />
                                                            {new Date(post.published_at || post.created_at).toLocaleDateString(undefined, {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            })}
                                                        </span>
                                                        {/* Estimated read time could be calculated here */}
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="w-3 h-3" />
                                                            {Math.ceil(post.content.split(' ').length / 200)} min read
                                                        </span>
                                                    </div>

                                                    <h2 className="text-2xl font-bold mb-3 hover:text-primary transition-colors">
                                                        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                                                    </h2>

                                                    <p className="text-muted-foreground line-clamp-3 mb-6 flex-1">
                                                        {post.excerpt || post.content.substring(0, 200) + '...'}
                                                    </p>

                                                    {post.tags && post.tags.length > 0 && (
                                                        <div className="flex flex-wrap gap-2 mb-6">
                                                            {post.tags.map(tag => (
                                                                <span key={tag} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                                                                    #{tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}

                                                    <Button asChild className="w-fit">
                                                        <Link to={`/blog/${post.slug}`}>
                                                            Read Article
                                                        </Link>
                                                    </Button>
                                                </div>
                                            </Card>
                                        ))
                                    ) : (
                                        <div className="text-center py-20 bg-card/30 rounded-lg border border-border/50">
                                            <p className="text-xl text-muted-foreground">No posts published yet. Check back soon!</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </section>
                    <Footer />
                </main>
            </div>
        </>
    );
};

export default Blog;
