import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    toast.success("Message sent! I'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-20 px-4 bg-muted/20">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Get In Touch
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Have a project in mind or want to collaborate? Feel free to reach out!
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 justify-items-center md:justify-items-stretch max-w-full md:max-w-none">
          {/* Contact Form */}
          <div className="glass-card rounded-2xl p-6 md:p-8 w-full max-w-lg md:max-w-none">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-background/50"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-background/50"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell me about your project..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="bg-background/50 resize-none"
                />
              </div>
              
              <Button type="submit" className="w-full" size="lg">
                Send Message
              </Button>
            </form>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-6 md:space-y-8 w-full max-w-lg md:max-w-none">
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-6">Connect With Me</h3>
              <div className="space-y-4">
                <a 
                  href="mailto:contact@shantojoseph.com"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>contact@shantojoseph.com</span>
                </a>
                <a 
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github className="w-5 h-5" />
                  <span>github.com/shantojoseph</span>
                </a>
                <a 
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>linkedin.com/in/shantojoseph</span>
                </a>
              </div>
            </div>
            
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-4">Let's Build Something</h3>
              <p className="text-muted-foreground leading-relaxed">
                I'm always excited to work on innovative projects and collaborate with creative teams. 
                Whether you need a full-stack application, consulting, or just want to discuss ideas, 
                don't hesitate to reach out!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
