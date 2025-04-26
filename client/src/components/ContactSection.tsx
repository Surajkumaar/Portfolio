import { useRef, useState } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaGithub } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// EmailJS configuration
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "";
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";
const RECIPIENT_EMAIL = import.meta.env.VITE_RECIPIENT_EMAIL || "";

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Prepare template parameters for EmailJS
      const templateParams = {
        title: data.subject,
        name: data.name,
        email: data.email,
        message: data.message,
        to_email: RECIPIENT_EMAIL
      };
      
      // Send email using EmailJS
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      
      if (response.status === 200) {
        toast({
          title: "Message sent!",
          description: "Thanks for reaching out. I'll get back to you soon.",
          variant: "default",
        });
        
        reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Email sending error:', error);
      toast({
        title: "Failed to send message",
        description: "Please try again later or contact me directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className={`py-24 px-6 relative transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="container mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-12 h-[1px] bg-electric-purple"></div>
          <h2 className="text-xl md:text-2xl font-['Space_Grotesk'] font-bold text-electric-purple">Get In Touch</h2>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-['Space_Grotesk'] font-bold mb-6 text-center">Let's Connect</h3>
          <p className="text-foreground/70 mb-12 text-center max-w-xl mx-auto">
            Interested in collaborating on a project or have questions about my work? Feel free to reach out through the form below or connect with me on social media.
          </p>
          
          <div className="grid md:grid-cols-5 gap-12">
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-electric-purple/20 flex items-center justify-center text-electric-purple flex-shrink-0 mt-1">
                  <FaEnvelope />
                </div>
                <div>
                  <h4 className="font-['Space_Grotesk'] font-semibold mb-1">Email</h4>
                  <a href="mailto:m.surajkumaar13022005@gmail.com" className="text-foreground/70 hover:text-electric-purple transition-colors duration-300">m.surajkumaar13022005@gmail.com</a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-electric-purple/20 flex items-center justify-center text-electric-purple flex-shrink-0 mt-1">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h4 className="font-['Space_Grotesk'] font-semibold mb-1">Location</h4>
                  <p className="text-foreground/70">Chennai, TamilNadu</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-electric-purple/20 flex items-center justify-center text-electric-purple flex-shrink-0 mt-1">
                  <FaLinkedin />
                </div>
                <div>
                  <h4 className="font-['Space_Grotesk'] font-semibold mb-1">LinkedIn</h4>
                  <a href="https://www.linkedin.com/in/suraj-kumaar-620588257/" className="text-foreground/70 hover:text-electric-purple transition-colors duration-300">linkedin.com/in/SurajKumaar</a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-electric-purple/20 flex items-center justify-center text-electric-purple flex-shrink-0 mt-1">
                  <FaGithub />
                </div>
                <div>
                  <h4 className="font-['Space_Grotesk'] font-semibold mb-1">GitHub</h4>
                  <a href="https://github.com/Surajkumaar" className="text-foreground/70 hover:text-electric-purple transition-colors duration-300">github.com/Surajkumaar</a>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-3">
              <form 
                ref={formRef} 
                className="space-y-6 contact-form" 
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium">Your Name</label>
                    <input 
                      {...register("name", { required: "Name is required" })}
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-3 bg-black border glow-border rounded-md focus:outline-none focus:border-electric-purple focus:ring-1 focus:ring-electric-purple transition-all duration-300 text-white" 
                      placeholder="John Smith" 
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium">Your Email</label>
                    <input 
                      {...register("email", { 
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address"
                        }
                      })}
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-3 bg-black border glow-border rounded-md focus:outline-none focus:border-electric-purple focus:ring-1 focus:ring-electric-purple transition-all duration-300 text-white" 
                      placeholder="john@example.com" 
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block mb-2 text-sm font-medium">Subject</label>
                    <input 
                      {...register("subject")}
                      type="text" 
                      id="subject" 
                      className="w-full px-4 py-3 bg-black border glow-border rounded-md focus:outline-none focus:border-electric-purple focus:ring-1 focus:ring-electric-purple transition-all duration-300 text-white" 
                      placeholder="Project Inquiry"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block mb-2 text-sm font-medium">Message</label>
                    <textarea 
                      {...register("message", { required: "Message is required" })}
                      id="message" 
                      rows={5} 
                      className="w-full px-4 py-3 bg-black border glow-border rounded-md focus:outline-none focus:border-electric-purple focus:ring-1 focus:ring-electric-purple transition-all duration-300 text-white" 
                      placeholder="I'm interested in working with you on..." 
                    />
                    {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-gradient-to-r from-electric-purple to-electric-purple/80 text-foreground rounded-md hover:from-electric-purple/90 hover:to-electric-purple/70 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
