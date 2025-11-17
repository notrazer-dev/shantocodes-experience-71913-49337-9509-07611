import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import projectsData from "@/data/projects.json";
import { VerticalNav } from "@/components/VerticalNav";
import { BottomNav } from "@/components/BottomNav";
import Footer from "@/components/Footer";

const Projects = () => {
  const getProjectImage = (imageName: string) => {
    return new URL(`../assets/${imageName}`, import.meta.url).href;
  };

  const allProjects = projectsData.projects.map(project => ({
    ...project,
    image: getProjectImage(project.image)
  }));

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      {/* Desktop navigation - hidden on mobile/tablet */}
      <div className="hidden xl:block">
        <VerticalNav />
      </div>

      {/* Mobile/Tablet navigation - bottom bar */}
      <div className="xl:hidden">
        <BottomNav />
      </div>

      <main className="flex-1 bg-background">
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <Link to="/">
              <Button variant="ghost" className="mb-8">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              All Projects
            </h1>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              A complete collection of my work, from web applications to AI-powered solutions
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allProjects.map((project, index) => (
                <Card 
                  key={project.id}
                  className="glass-card border-border/50 overflow-hidden group hover:shadow-2xl transition-all duration-300 animate-fade-in h-full"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60"></div>
                    {project.featured && (
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                        Featured
                      </div>
                    )}
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <span 
                          key={tech}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex gap-3">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        asChild
                      >
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </a>
                      </Button>
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="flex-1"
                        asChild
                      >
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Demo
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
};

export default Projects;
