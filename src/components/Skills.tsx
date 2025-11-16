import { useState } from "react";
import skillsData from "@/data/skills.json";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Skills = () => {
  const allSkills = skillsData.categories.flatMap(category => 
    category.skills.map(skill => skill.name)
  );
  
  const [currentPage, setCurrentPage] = useState(0);
  const skillsPerPage = 9; // 3 columns x 3 rows on mobile
  const totalPages = Math.ceil(allSkills.length / skillsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const visibleSkills = allSkills.slice(
    currentPage * skillsPerPage,
    (currentPage + 1) * skillsPerPage
  );

  return (
    <section id="skills" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Skills & Expertise
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          A comprehensive toolkit for building modern, scalable applications
        </p>
        
        {/* Mobile: 3x3 grid with carousel */}
        <div className="md:hidden">
          <div className="grid grid-cols-3 gap-4 mb-6">
            {visibleSkills.map((skill, index) => (
              <div
                key={skill}
                className="flex flex-col items-center justify-center gap-2 hover:scale-105 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors duration-300">
                  <span className="text-xl font-bold text-primary">
                    {skill.charAt(0)}
                  </span>
                </div>
                <span className="text-xs text-center font-medium text-foreground line-clamp-2">
                  {skill}
                </span>
              </div>
            ))}
          </div>
          
          {/* Carousel controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={prevPage}
                className="h-10 w-10 rounded-full hover:bg-primary/10"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              <div className="flex gap-2">
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentPage 
                        ? "w-8 bg-primary" 
                        : "w-2 bg-muted"
                    }`}
                  />
                ))}
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={nextPage}
                className="h-10 w-10 rounded-full hover:bg-primary/10"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>

        {/* Desktop: Full grid */}
        <div className="hidden md:grid grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-8">
          {allSkills.map((skill, index) => (
            <div
              key={skill}
              className="flex flex-col items-center justify-center gap-3 hover:scale-110 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors duration-300">
                <span className="text-2xl font-bold text-primary">
                  {skill.charAt(0)}
                </span>
              </div>
              <span className="text-xs text-center font-medium text-foreground">
                {skill}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
