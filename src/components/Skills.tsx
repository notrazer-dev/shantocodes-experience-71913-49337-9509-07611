import skillsData from "@/data/skills.json";
import * as Icons from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Skills = () => {
  const skills = skillsData.skills;

  return (
    <section id="skills" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Skills & Expertise
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          A comprehensive toolkit for building modern, scalable applications
        </p>
        
        {/* Mobile: Touch-enabled carousel */}
        <div className="md:hidden">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2">
              {skills.map((skill, index) => {
                const IconComponent = Icons[skill.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
                return (
                  <CarouselItem key={skill.name} className="pl-2 basis-1/3">
                    <div
                      className="flex flex-col items-center justify-center gap-2 hover:scale-105 transition-all duration-300 animate-fade-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors duration-300">
                        {IconComponent && <IconComponent className="h-6 w-6 text-primary" />}
                      </div>
                      <span className="text-xs text-center font-medium text-foreground line-clamp-2">
                        {skill.name}
                      </span>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>

        {/* Desktop: Full grid */}
        <div className="hidden md:grid grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-8">
          {skills.map((skill, index) => {
            const IconComponent = Icons[skill.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
            return (
              <div
                key={skill.name}
                className="flex flex-col items-center justify-center gap-3 hover:scale-110 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors duration-300">
                  {IconComponent && <IconComponent className="h-7 w-7 text-primary" />}
                </div>
                <span className="text-xs text-center font-medium text-foreground">
                  {skill.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
