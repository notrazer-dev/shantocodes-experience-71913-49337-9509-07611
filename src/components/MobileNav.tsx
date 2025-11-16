import { useState, useEffect } from "react";
import { Menu, X, Home, User, Briefcase, Code, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
  { title: "Home", id: "home", icon: Home },
  { title: "About", id: "about", icon: User },
  { title: "Projects", id: "projects", icon: Briefcase },
  { title: "Skills", id: "skills", icon: Code },
  { title: "Contact", id: "contact", icon: Mail },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.id);
      let currentSection = "home";

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            currentSection = sectionId;
            break;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <div className="md:hidden fixed top-4 left-4 z-50">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full glass-card border border-border/50 hover:border-primary hover:bg-primary/10"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] glass-card border-r border-border/50">
          <SheetHeader>
            <SheetTitle className="text-primary">Navigation</SheetTitle>
          </SheetHeader>
          <nav className="mt-8 space-y-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-300
                    ${isActive 
                      ? "bg-primary/20 text-primary border-l-4 border-primary" 
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                    }
                  `}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.title}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-primary animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
