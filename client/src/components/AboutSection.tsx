import { useRef } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { FaArrowRight, FaFileAlt } from "react-icons/fa";

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  
  return (
    <section 
      id="about" 
      ref={sectionRef}
      className={`py-24 px-6 relative transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="container mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-12 h-[1px] bg-electric-purple"></div>
          <h2 className="text-xl md:text-2xl font-['Space_Grotesk'] font-bold text-electric-purple">About Me</h2>
        </div>
        
        <div className="grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-3">
            <h3 className="text-3xl md:text-4xl font-['Space_Grotesk'] font-bold mb-8">Securing the digital frontier with AI-powered solutions</h3>
            
            <div className="space-y-6 text-foreground/80">
              <p className="leading-relaxed">
              As a third-year student fascinated by both cybersecurity and artificial intelligence, I'm driven by the challenge of protecting digital systems through intelligent technologies. I’m exploring how AI can transform traditional security approaches—making them more adaptive, predictive, and resilient against emerging threats. This intersection is where I aim to grow, learn, and contribute.
              </p>
              
              <p className="leading-relaxed">
              Beyond academics, I enjoy exploring real-world applications through hands-on projects and staying updated on the latest in AI and cybersecurity. I'm always looking for ways to apply what I learn and grow my skills in meaningful, practical ways.
              </p>
              
              <p className="leading-relaxed">
              Currently based in Chennai, I’m always open to connecting with others who share a passion for AI and cybersecurity whether it’s for collaborative projects, internships, or simply exchanging ideas.
              </p>
            </div>
            
            <div className="mt-10 space-x-4">
              <a 
                href="#contact" 
                className="inline-flex items-center px-6 py-3 border border-electric-purple/50 text-electric-purple rounded-md hover:bg-electric-purple/10 transition-all duration-300"
              >
                <span>Let's Connect</span>
                <FaArrowRight className="ml-2" />
              </a>
              <a 
                href="/Surajkumaar M Resume.pdf" 
                className="inline-flex items-center px-6 py-3 text-foreground/70 hover:text-electric-purple transition-colors duration-300"
                download
              >
                <FaFileAlt className="mr-2" />
                <span>Download Resume</span>
              </a>
            </div>
          </div>
          
          <div className="md:col-span-2 relative">
            <div 
              ref={imageRef}
              className={`w-full max-w-sm mx-auto relative transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: '300ms' }}
            >
              <div className="relative card-tilt glow-border rounded-xl overflow-hidden p-1 bg-gradient-to-br from-deep-blue to-deep-blue/50">
                <svg 
                  className="w-full h-auto rounded-lg"
                  viewBox="0 0 24 24"
                  width="100%"
                  height="300"
                >
                  <defs>
                    <linearGradient id="profileGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8A2BE2" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#39FF14" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#profileGradient)" />
                  <circle cx="12" cy="8" r="4" fill="#8A2BE2" opacity="0.7" />
                  <rect x="7" y="14" width="10" height="6" rx="1" fill="#8A2BE2" opacity="0.7" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-t from-deep-blue via-transparent to-transparent"></div>
              </div>
              
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-electric-purple/30 rounded-full filter blur-3xl animate-pulse"></div>
              <div className="absolute -top-5 -left-5 w-20 h-20 bg-neon-green/20 rounded-full filter blur-xl animate-pulse" style={{animationDelay: "1.5s"}}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
