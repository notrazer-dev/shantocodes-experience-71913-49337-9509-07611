import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ChevronDown } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background/95"></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-pixel mb-8 glow-text leading-relaxed">
          Shanto Joseph
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto">
          Full-Stack Developer
        </p>
        <p className="text-lg md:text-xl text-muted-foreground/80 mb-12 max-w-2xl mx-auto">
          Turning ideas into interactive, dynamic, and scalable digital experiences.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button 
            variant="hero" 
            size="lg"
            onClick={() => scrollToSection("projects")}
          >
            View My Work
          </Button>
          <Button 
            variant="outlineHero" 
            size="lg"
            onClick={() => scrollToSection("contact")}
          >
            Get In Touch
          </Button>
        </div>
        
        {/* Social Links */}
        <div className="flex gap-6 justify-center mb-16">
          <a 
            href="https://github.com/shanto-joseph" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <Github className="w-6 h-6" />
          </a>
          <a 
            href="https://www.linkedin.com/in/shanto-joseph" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a 
            href="mailto:contact@shantojoseph.com"
            className="text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <Mail className="w-6 h-6" />
          </a>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <button
        onClick={() => scrollToSection("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors animate-float"
        aria-label="Scroll to about section"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
};

export default Hero;
