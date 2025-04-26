import { useRef } from "react";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import CertificationsSection from "@/components/CertificationsSection";
import ContactSection from "@/components/ContactSection";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MatrixBackground from "@/components/ui/matrix-background";
import { useHackerMode } from "@/hooks/use-hacker-mode";

const Home = () => {
  const projectsRef = useRef<HTMLElement>(null);
  const { isHackerMode } = useHackerMode();
  
  const scrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  
  return (
    <div className={`min-h-screen ${isHackerMode ? 'hacker-mode' : ''}`}>
      <MatrixBackground opacity={isHackerMode ? 0.1 : 0.05} />
      
      <Navigation />
      <HeroSection scrollToProjects={scrollToProjects} />
      <AboutSection />
      <SkillsSection />
      <section ref={projectsRef}>
        <ProjectsSection />
      </section>
      <CertificationsSection />
      <ContactSection />
      <Footer />
      
      <style jsx global>{`
        :root {
          --deep-blue: #0A192F;
          --electric-purple: #8A2BE2;
          --neon-green: #39FF14;
          --dark-gray: #121212;
        }
        
        .hacker-mode {
          font-family: 'Fira Code', monospace;
          --electric-purple: #39FF14;
          --neon-green: #39FF14;
          --deep-blue: #0c0c0c;
        }
        
        .card-tilt {
          transform-style: preserve-3d;
          transition: transform 0.5s ease;
        }
        
        .card-tilt:hover {
          transform: perspective(1000px) rotateX(5deg) rotateY(5deg);
        }
        
        .glow-border {
          border: 1px solid rgba(138, 43, 226, 0.5);
          transition: all 0.3s ease;
        }
        
        .glow-border:hover {
          box-shadow: 0 0 15px rgba(138, 43, 226, 0.7), 0 0 30px rgba(138, 43, 226, 0.4);
        }
        
        .hacker-mode .glow-border {
          border-color: #39FF14;
        }
        
        .hacker-mode .glow-border:hover {
          box-shadow: 0 0 15px rgba(57, 255, 20, 0.7), 0 0 30px rgba(57, 255, 20, 0.4);
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes glow {
          0% { 
            box-shadow: 0 0 5px rgba(138, 43, 226, 0.4), 0 0 10px rgba(138, 43, 226, 0.3); 
            border-color: rgba(138, 43, 226, 0.4);
          }
          100% { 
            box-shadow: 0 0 10px rgba(138, 43, 226, 0.6), 0 0 20px rgba(138, 43, 226, 0.4); 
            border-color: rgba(138, 43, 226, 0.8);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-glow {
          animation: glow 1.5s ease-in-out infinite alternate;
        }
      `}</style>
    </div>
  );
};

export default Home;
