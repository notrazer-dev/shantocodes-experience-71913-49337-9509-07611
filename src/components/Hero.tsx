import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ChevronDown, Copy, Check } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import StarBorder from "@/components/ui/star-border";

import { useThemeColor } from "@/hooks/use-theme-color";

const Hero = () => {
  const [isEmailSheetOpen, setIsEmailSheetOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const email = "shantojoseph23@gmail.com";
  const { themeColor } = useThemeColor();

  const colorMap = {
    green: "hsl(120, 61%, 34%)",
    blue: "hsl(210, 100%, 45%)",
    purple: "hsl(270, 70%, 45%)",
    orange: "hsl(30, 100%, 45%)",
    pink: "hsl(330, 70%, 50%)",
  };
  const starColor = colorMap[themeColor] || "cyan";

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      toast.success("Email copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy email");
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay gradient */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, hsl(var(--background) / 0.2) 0%, transparent 30%, transparent 70%, hsl(var(--background)) 100%)' }}
      ></div>

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
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 items-center">
          <Button
            variant="hero"
            size="lg"
            onClick={() => scrollToSection("projects")}
          >
            View My Work
          </Button>
          <StarBorder
            as="button"
            className="rounded-md"
            innerClassName="py-[10px] px-8 text-sm rounded-md"
            color={starColor}
            speed="5s"
            onClick={() => scrollToSection("contact")}
          >
            Get In Touch
          </StarBorder>
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
          <button
            onClick={() => setIsEmailSheetOpen(true)}
            className="text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <Mail className="w-6 h-6" />
          </button>
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

      {/* Email Sheet */}
      <Sheet open={isEmailSheetOpen} onOpenChange={setIsEmailSheetOpen}>
        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <SheetHeader>
            <SheetTitle>Get in Touch</SheetTitle>
            <SheetDescription>
              Feel free to reach out via email
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
              <Mail className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">{email}</span>
            </div>
            <Button
              onClick={handleCopy}
              className="w-full"
              variant="outline"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Email
                </>
              )}
            </Button>
            <Button
              className="w-full"
              variant="default"
              onClick={() => {
                setIsEmailSheetOpen(false);
                scrollToSection("contact");
              }}
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default Hero;
