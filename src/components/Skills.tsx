import skillsData from "@/data/skills.json";

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
        
        {/* Mobile: 3-column grid */}
        <div className="md:hidden grid grid-cols-3 gap-4">
          {skills.map((skill, index) => {
            return (
              <div
                key={skill.name}
                className="flex flex-col items-center justify-center gap-2 hover:scale-105 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors duration-300 p-2">
                  <img src={skill.logo} alt={skill.name} className="w-full h-full object-contain" />
                </div>
                <span className="text-xs text-center font-medium text-foreground line-clamp-2">
                  {skill.name}
                </span>
              </div>
            );
          })}
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
