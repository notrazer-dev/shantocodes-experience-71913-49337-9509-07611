import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article' | 'profile';
    author?: string;
}

export const SEO = ({
    title,
    description,
    keywords,
    image = "https://res.cloudinary.com/dk6i1ld2q/image/upload/v1763925337/s_3_kq7f8b.svg",
    url = "https://shantojoseph.com",
    type = "website",
    author = "Shanto Joseph"
}: SEOProps) => {
    const siteTitle = title.includes('Shanto Joseph') ? title : `${title} | Shanto Joseph`;

    // Structured Data (JSON-LD)
    const structuredData = {
        "@context": "https://schema.org",
        "@type": type === 'profile' ? 'Person' : 'WebSite',
        "name": author,
        "url": url,
        "description": description,
        "image": image,
        "sameAs": [
            "https://www.linkedin.com/in/shanto-joseph",
            "https://github.com/shanto-joseph"
        ],
        "jobTitle": "Full-Stack Developer",
        "worksFor": {
            "@type": "Organization",
            "name": "Freelance"
        }
    };

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{siteTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords || "Shanto Joseph, Full-Stack Developer, Portfolio, Software Engineer, React, TypeScript"} />
            <meta name="author" content={author} />
            <link rel="canonical" href={url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={siteTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(structuredData)}
            </script>
        </Helmet>
    );
};
