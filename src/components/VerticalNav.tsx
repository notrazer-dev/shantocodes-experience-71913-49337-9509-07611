import { useState, useEffect } from "react";
import { Home, Briefcase, Code, Mail, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navItems = [
  { title: "Home", id: "home", icon: Home },
  { title: "Projects", id: "projects", icon: Briefcase },
  { title: "Skills", id: "skills", icon: Code },
  { title: "Contact", id: "contact", icon: Mail },
];

export function VerticalNav() {
  const [activeSection, setActiveSection] = useState("home");
  const { theme, setTheme } = useTheme();

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
  };

  return (
    <TooltipProvider>
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-2 bg-card/75 backdrop-blur-lg border border-border/40 py-4 px-2 rounded-2xl shadow-[0_8px_32px_hsl(0_0%_0%_/_0.15)]">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <Tooltip key={item.id} delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    relative h-12 w-12 rounded-xl transition-all duration-300
                    ${isActive 
                      ? "bg-primary/20 text-primary hover:bg-primary/25 shadow-[0_0_20px_hsl(var(--primary)/0.2)]" 
                      : "hover:bg-muted/60 text-muted-foreground hover:text-foreground"
                    }
                  `}
                >
                  <item.icon 
                    className={`h-5 w-5 transition-all duration-300 ${
                      isActive ? "scale-110 drop-shadow-[0_0_12px_hsl(var(--primary)/0.6)]" : ""
                    }`}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  {isActive && (
                    <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-l-full" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="font-medium">
                {item.title}
              </TooltipContent>
            </Tooltip>
          );
        })}
        
        {/* Theme Toggle */}
        <div className="mt-4 pt-4 border-t border-border/50">
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="h-12 w-12 rounded-xl transition-all duration-300 hover:bg-primary/10 group"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 transition-transform group-hover:rotate-180 duration-500" strokeWidth={2} />
                ) : (
                  <Moon className="h-5 w-5 transition-transform group-hover:-rotate-45 duration-500" strokeWidth={2} />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="font-medium">
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
