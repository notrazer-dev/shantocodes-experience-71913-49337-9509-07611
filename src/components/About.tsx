import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const About = () => {
  const handleDownloadCV = () => {
    // Create a link element and trigger download
    // You'll need to add your CV file to the public folder
    const link = document.createElement('a');
    link.href = '/cv.pdf'; // Place your CV as cv.pdf in the public folder
    link.download = 'Shanto_Joseph_CV.pdf';
    link.click();
  };

  return (
    <section
      id="about"
      className="py-20 px-4 bg-background"
    >
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          About Me
        </h2>
        <div className="animate-fade-in">
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed text-justify hyphens-auto">
            I'm <span className="text-foreground font-semibold font-pixel whitespace-nowrap text-base sm:text-lg">Shanto Joseph</span>, a Full-Stack Developer who bridges creativity and engineering.
            I love building interactive, high-performance web applications using React, Python, Java, and modern AI/ML tools.
          </p>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed text-justify hyphens-auto">
            My focus is on delivering beautiful, responsive designs and robust, scalable backend systems that bring ideas to life.
            Whether it's crafting intuitive UIs or architecting complex APIs, I turn code into experiences that matter.
          </p>

          <div className="flex justify-center mt-8">
            <Button
              onClick={handleDownloadCV}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
            >
              <Download className="h-5 w-5" />
              Download CV
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
