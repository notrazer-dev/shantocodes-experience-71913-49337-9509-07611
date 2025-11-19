import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Mail, Copy } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.current) {
      emailjs
        .sendForm(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          form.current,
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        )
        .then(
          () => {
            toast.success("Message sent! I'll get back to you soon.");
            setFormData({ name: "", email: "", message: "" });
          },
          (error) => {
            console.log("FAILED...", error.text);
            toast.error("Failed to send message. Please try again later.");
          }
        );
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("shantojoseph23@gmail.com");
      toast.success("Email copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("Failed to copy email.");
    }
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
        
        <div 
          className={`grid ${import.meta.env.VITE_EMAIL_FORM === 'true' ? 'md:grid-cols-2' : 'md:grid-cols-1'} gap-8 md:gap-12 justify-items-center md:justify-items-stretch max-w-full md:max-w-none`}
        >
          {import.meta.env.VITE_EMAIL_FORM === 'true' && (
            <div className="glass-card rounded-2xl p-6 md:p-8 w-full max-w-lg md:max-w-none">
              <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    name="user_name"
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
                    name="user_email"
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
                    name="message"
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
          )}
          
          <div 
            className={`w-full max-w-lg md:max-w-none ${import.meta.env.VITE_EMAIL_FORM === 'false' ? 'col-span-1 grid md:grid-cols-2 gap-8' : 'space-y-6 md:space-y-8'}`}
          >
            {/* Contact Info */}
            <div className="space-y-6 md:space-y-8">
              <div className="glass-card rounded-2xl p-8">
                <h3 className="text-xl font-semibold mb-6">Connect With Me</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-x-2">
                    <a 
                      href="mailto:shantojoseph23@gmail.com"
                      className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                      <span>shantojoseph23@gmail.com</span>
                    </a>
                    <Copy className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-primary" onClick={handleCopy} />
                  </div>
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
