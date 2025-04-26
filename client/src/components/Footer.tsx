import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="py-10 px-6 bg-deep-blue/90">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#" className="text-2xl font-['Space_Grotesk'] font-bold text-foreground tracking-wider">
              <span className="text-electric-purple">{'{'}</span>S.K<span className="text-electric-purple">{'}'}</span>
            </a>
            <p className="text-foreground/50 mt-2">Cybersecurity & AI/ML Enthusiast</p>
          </div>
          
          <div className="flex space-x-8 text-foreground/70">
            <a href="#about" className="hover:text-electric-purple transition-colors duration-300">About</a>
            <a href="#skills" className="hover:text-electric-purple transition-colors duration-300">Skills</a>
            <a href="#projects" className="hover:text-electric-purple transition-colors duration-300">Projects</a>
            <a href="#contact" className="hover:text-electric-purple transition-colors duration-300">Contact</a>
          </div>
          
          <div className="flex space-x-4 mt-6 md:mt-0">
            <a 
              href="#" 
              className="w-10 h-10 rounded-full border border-electric-purple/50 flex items-center justify-center text-foreground/70 hover:text-electric-purple hover:border-electric-purple transition-all duration-300"
            >
              <FaGithub />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 rounded-full border border-electric-purple/50 flex items-center justify-center text-foreground/70 hover:text-electric-purple hover:border-electric-purple transition-all duration-300"
            >
              <FaLinkedin />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 rounded-full border border-electric-purple/50 flex items-center justify-center text-foreground/70 hover:text-electric-purple hover:border-electric-purple transition-all duration-300"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-foreground/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-foreground/50 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Surajkumaar. All rights reserved.
          </p>
          
          <p className="text-foreground/50 text-sm font-['Fira_Code']">
            <span className="text-neon-green">function</span> <span className="text-electric-purple">protectAndInnovate</span>() {'{'} <span className="text-neon-green">return</span> <span className="text-foreground">'security + AI'</span>; {'}'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
