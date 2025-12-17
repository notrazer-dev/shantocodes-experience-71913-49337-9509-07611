
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { SEO } from "@/components/SEO";
import { VerticalNav } from "@/components/VerticalNav";
import { BottomNav } from "@/components/BottomNav";
import Footer from "@/components/Footer";
import { useBlog, BlogPost as BlogPostType } from "@/hooks/useBlog";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, Clock, Loader2, Tag, Share2 } from "lucide-react";
import { toast } from "sonner";

const BlogPost = () => {
    const { slug } = useParams<{ slug: string }>();
    const { getPostBySlug } = useBlog();
    const [post, setPost] = useState<BlogPostType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            if (slug) {
                setLoading(true);
                const data = await getPostBySlug(slug);
                if (data) {
                    setPost(data);
                }
                setLoading(false);
            }
        };
        fetchPost();
    }, [slug]);

    const handleShare = async () => {
        try {
            await navigator.share({
                title: post?.title,
                text: post?.excerpt,
                url: window.location.href,
            });
        } catch (error) {
            // If share fails or is denied (common on desktop), copy link to clipboard
            await navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied to clipboard!");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <h1 className="text-2xl font-bold mb-4">Post not found</h1>
                <Link to="/blog">
                    <Button>Back to Blog</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full overflow-x-hidden">
            <SEO
                title={`${post.title} | Shanto Joseph`}
                description={post.meta_description || post.excerpt}
                keywords={post.tags?.join(", ")}
                type="article"
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
                <article
                    className="min-h-screen"
                    style={{ background: 'linear-gradient(to bottom, transparent 0%, transparent 20%, hsl(var(--background)) 40%, hsl(var(--background)) 85%, transparent 100%)' }}
                >
                    {/* Hero Section with Image */}
                    {post.featured_image && (
                        <div className="w-full h-[40vh] md:h-[50vh] relative overflow-hidden">
                            <img
                                src={post.featured_image}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90"></div>
                        </div>
                    )}

                    <div className="container mx-auto max-w-4xl px-4 py-12 -mt-20 relative z-10">
                        <Link to="/blog">
                            <Button variant="outline" className="mb-8 bg-background/50 backdrop-blur-sm">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Blog
                            </Button>
                        </Link>

                        <div className="mb-8">
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                                <span className="flex items-center gap-1 bg-secondary/50 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
                                    <Calendar className="w-3 h-3" />
                                    {new Date(post.published_at || post.created_at).toLocaleDateString(undefined, {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </span>
                                <span className="flex items-center gap-1 bg-secondary/50 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
                                    <Clock className="w-3 h-3" />
                                    {Math.ceil(post.content.split(' ').length / 200)} min read
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {post.tags?.map((tag) => (
                                    <span key={tag} className="flex items-center gap-1 px-3 py-1 text-sm bg-primary/10 text-primary rounded-full">
                                        <Tag className="w-3 h-3" />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="glass-card p-6 md:p-10 rounded-xl mb-12">
                            <div className="prose prose-lg dark:prose-invert max-w-none whitespace-pre-wrap font-sans leading-relaxed text-foreground/90">
                                {post.content}
                            </div>
                        </div>

                        <div className="flex justify-between items-center border-t border-border pt-8 mb-12">
                            <div className="text-muted-foreground">
                                Thanks for reading!
                            </div>
                            <Button variant="outline" onClick={handleShare}>
                                <Share2 className="w-4 h-4 mr-2" />
                                Share Article
                            </Button>
                        </div>
                    </div>
                </article>
                <Footer />
            </main>
        </div>
    );
};

export default BlogPost;
