import { useRef, useEffect } from "react";
import { useHackerMode } from "@/hooks/use-hacker-mode";
import AnimatedCyberGlobe from "./AnimatedCyberGlobe";
import { FaGithub, FaLinkedin, FaTwitter, FaChevronDown } from "react-icons/fa";

interface HeroSectionProps {
  scrollToProjects: () => void;
}

const HeroSection = ({ scrollToProjects }: HeroSectionProps) => {
  const { isHackerMode } = useHackerMode();
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleParallax = (e: MouseEvent) => {
      const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
      const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

      const glowLeft = document.querySelector('.glow-left') as HTMLElement;
      const glowRight = document.querySelector('.glow-right') as HTMLElement;

      if (glowLeft) {
        glowLeft.style.transform = `translate(${moveX * -1}px, ${moveY * -1}px)`;
      }
      if (glowRight) {
        glowRight.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
    };

    window.addEventListener('mousemove', handleParallax);
    return () => window.removeEventListener('mousemove', handleParallax);
  }, []);

  return (
    <section 
      id="hero" 
      ref={heroRef}
      className="min-h-screen pt-24 md:pt-32 px-6 flex items-center relative overflow-hidden"
    >
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="z-10">
          <div className="inline-block mb-2 px-4 py-1 rounded-full bg-electric-purple/10 text-electric-purple border border-electric-purple/20">
            <span className="font-['Fira_Code'] text-sm">// Hello, world</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-['Space_Grotesk'] font-bold mb-4 tracking-tight">
            <span className="block">I'm <span className="text-electric-purple">SurajKumaar</span></span>
            <span className="block mt-2">Cybersecurity & AI/ML Enthusiast</span>
          </h1>
          <p className="text-foreground/70 text-lg md:text-xl mb-8 max-w-md">
            Protecting systems. Powering intelligence. Securing the digital frontier through innovative solutions.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={scrollToProjects}
              className="px-6 py-3 bg-electric-purple text-foreground rounded-md hover:bg-electric-purple/80 transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-electric-purple/20"
            >
              See My Work
            </button>
            <a 
              href="#contact" 
              className="px-6 py-3 border border-electric-purple/50 text-electric-purple rounded-md hover:bg-electric-purple/10 transition-all duration-300 transform hover:-translate-y-1"
            >
              Get In Touch
            </a>
          </div>
          
          <div className="flex items-center mt-12 space-x-4">
            <a href="https://github.com/Surajkumaar" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-electric-purple transition-colors duration-300">
              <FaGithub className="text-xl" />
            </a>
            <a href="https://www.linkedin.com/in/suraj-kumaar-620588257/" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-electric-purple transition-colors duration-300">
              <FaLinkedin className="text-xl" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-electric-purple transition-colors duration-300">
              <FaTwitter className="text-xl" />
            </a>
            <div className="h-5 border-l border-foreground/20"></div>
            <a href="mailto:m.surajkumaar13022005@gmail.com" className="text-foreground/60 hover:text-electric-purple transition-colors duration-300 font-['Fira_Code'] text-sm">
            m.surajkumaar13022005@gmail.com
            </a>
          </div>
        </div>
        
        <div className="relative hidden md:block">
          <div className="absolute w-[400px] h-[400px] rounded-full bg-electric-purple/20 filter blur-3xl -top-20 -right-20 animate-pulse glow-right"></div>
          <div className="absolute w-[300px] h-[300px] rounded-full bg-neon-green/10 filter blur-3xl bottom-0 left-20 animate-pulse glow-left" style={{animationDelay: "1s"}}></div>
          <div className="w-[500px] h-[500px] mx-auto animate-float relative">
            <div className="w-full h-full rounded-full overflow-hidden">
              <AnimatedCyberGlobe />
            </div>
            <div className="absolute inset-0 rounded-full border-4 border-electric-purple/30 animate-pulse"></div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-foreground/50 animate-bounce">
        <FaChevronDown />
      </div>
    </section>
  );
};

export default HeroSection;
