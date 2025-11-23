import skillsData from "@/data/skills.json";
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
    <section
      id="skills"
      className="py-20 px-4 backdrop-blur-sm"
      style={{ background: 'linear-gradient(to bottom, transparent 0%, hsl(var(--background)) 25%, hsl(var(--background)) 100%)' }}
    >
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Skills & Expertise
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          A comprehensive toolkit for building modern, scalable applications
        </p>

        {/* Mobile: 4-column swipeable grid */}
        <div className="md:hidden">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {Array.from({ length: Math.ceil(skills.length / 16) }).map((_, pageIndex) => (
                <CarouselItem key={pageIndex}>
                  <div className="grid grid-cols-4 gap-4">
                    {skills.slice(pageIndex * 16, (pageIndex + 1) * 16).map((skill, index) => (
                      <div
                        key={skill.name}
                        className="flex flex-col items-center justify-center gap-2 hover:scale-105 transition-all duration-300 animate-fade-in"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors duration-300 p-2">
                          <img src={skill.logo} alt={skill.name} className="w-full h-full object-contain" />
                        </div>
                        <span className="text-[10px] text-center font-medium text-foreground line-clamp-2">
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

          </Carousel>
        </div>

        {/* Desktop: Full grid */}
        <div className="hidden md:grid grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-8">
          {skills.map((skill, index) => {
            return (
              <div
                key={skill.name}
                className="flex flex-col items-center justify-center gap-3 hover:scale-110 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors duration-300 p-3">
                  <img src={skill.logo} alt={skill.name} className="w-full h-full object-contain" />
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
