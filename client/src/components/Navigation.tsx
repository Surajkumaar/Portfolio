import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useHackerMode } from "@/hooks/use-hacker-mode";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isHackerMode, toggleHackerMode } = useHackerMode();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full backdrop-blur-md z-50 px-6 py-4 transition-all duration-300 ${isScrolled ? 'bg-deep-blue/80 shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="text-2xl font-['Space_Grotesk'] font-bold text-foreground tracking-wider">
          <span className="text-electric-purple">{'{'}</span>S.K<span className="text-electric-purple">{'}'}</span>
        </a>
        
        <div className="hidden md:flex space-x-8 items-center">
          <a href="#about" className="text-foreground/80 hover:text-electric-purple transition-colors duration-300">About</a>
          <a href="#skills" className="text-foreground/80 hover:text-electric-purple transition-colors duration-300">Skills</a>
          <a href="#projects" className="text-foreground/80 hover:text-electric-purple transition-colors duration-300">Projects</a>
          <a href="#certifications" className="text-foreground/80 hover:text-electric-purple transition-colors duration-300">Certifications</a>
          <a href="#contact" className="text-foreground/80 hover:text-electric-purple transition-colors duration-300">Contact</a>
          <button 
            onClick={toggleHackerMode}
            className={`px-3 py-1 rounded border ${isHackerMode ? 'border-neon-green text-neon-green' : 'border-neon-green/50 text-neon-green/80'} hover:bg-neon-green/10 hover:text-neon-green transition-all duration-300`}
          >
            <span className="font-['Fira_Code'] text-sm">{">"} Hacker_Mode</span>
          </button>
        </div>
        
        <button 
          className="md:hidden text-foreground focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-4 py-5 space-y-4 bg-deep-blue/95 backdrop-blur-md">
          <a 
            href="#about" 
            className="block text-foreground/80 hover:text-electric-purple transition-colors duration-300"
            onClick={closeMobileMenu}
          >
            About
          </a>
          <a 
            href="#skills" 
            className="block text-foreground/80 hover:text-electric-purple transition-colors duration-300"
            onClick={closeMobileMenu}
          >
            Skills
          </a>
          <a 
            href="#projects" 
            className="block text-foreground/80 hover:text-electric-purple transition-colors duration-300"
            onClick={closeMobileMenu}
          >
            Projects
          </a>
          <a 
            href="#certifications" 
            className="block text-foreground/80 hover:text-electric-purple transition-colors duration-300"
            onClick={closeMobileMenu}
          >
            Certifications
          </a>
          <a 
            href="#contact" 
            className="block text-foreground/80 hover:text-electric-purple transition-colors duration-300"
            onClick={closeMobileMenu}
          >
            Contact
          </a>
          <button 
            onClick={() => {
              toggleHackerMode();
              closeMobileMenu();
            }}
            className={`w-full text-left px-3 py-1 rounded border ${isHackerMode ? 'border-neon-green text-neon-green' : 'border-neon-green/50 text-neon-green/80'} hover:bg-neon-green/10 hover:text-neon-green transition-all duration-300`}
          >
            <span className="font-['Fira_Code'] text-sm">{">"} Hacker_Mode</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
