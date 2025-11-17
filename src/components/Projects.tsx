import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import projectsData from "@/data/projects.json";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Projects = () => {
  const getProjectImage = (imageName: string) => {
    return new URL(`../assets/${imageName}`, import.meta.url).href;
  };

  const featuredProjects = projectsData.projects
    .filter(project => project.featured)
    .map(project => ({
      ...project,
      image: getProjectImage(project.image)
    }));

  return (
    <section id="projects" className="py-20 px-4 bg-muted/20">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Featured Projects
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          A showcase of my recent work, from web applications to AI-powered solutions
        </p>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {featuredProjects.map((project, index) => (
              <CarouselItem key={project.title} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Card 
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
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="flex justify-center gap-4 mt-8">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>

        <div className="flex justify-center mt-8">
          <Button variant="outline" size="lg" className="group">
            View All Projects
            <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
