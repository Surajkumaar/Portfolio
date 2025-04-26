import { useRef } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { FaArrowRight, FaGithub } from "react-icons/fa";

const projects = [
  {
    title: "Honeypy: Honeypot-Based Threat Detection",
    description: "Honeypy simulates vulnerable SSH and HTTP services to detect and log unauthorized access attempts, helping analyze attacker behavior and improve network security.",
    category: "Cybersecurity",
    image: "threat-detection",
    tags: ["Python", "Flask", "Paramiko", "Network Security"],
    links: {
      demo: "#",
      github: "https://github.com/Surajkumaar/Project-Honeypy"
    }
  },
  {
    title: "ClarirAI: AI-Powered Diabetic Retinopathy Detection",
    description: "An advanced AI-driven system that detects and analyzes diabetic retinopathy from retinal images, providing accurate diagnostics and interactive medical consultations.",
    category: "AI/ML",
    image: "clarirai-diabetic-retinopathy",
    tags: ["Next.js", "React", "Tailwind CSS", "FastAPI", "Hugging Face", "Machine Learning"],
    links: {
      demo: "https://clarirai.onrender.com",
      github: "https://github.com/Surajkumaar/ClarirAI"
    }
  },
  {
    title: "CVElytics: AI-Powered Cybersecurity Assistant",
    description: "An AI-driven cybersecurity question-answering system that leverages LLMs and vector search to provide detailed information about Common Vulnerabilities and Exposures (CVEs).",
    category: "Cybersecurity + AI/ML",
    image: "cve-analytics",
    tags: ["Python", "Flask", "LangChain", "OpenRouter", "Cybersecurity", "Vector Search"],
    links: {
      demo: "https://huggingface.co/spaces/Surajkumaar/CVElytics?logs=container", 
      github: "https://github.com/Surajkumaar/CVElytics"
    }
  },
  {
    title: "CTF Challenges Collection",
    description: "A curated repository of Capture the Flag (CTF) challenges from platforms like OverTheWire, VulnHub, TryHackMe, and HackTheBox to enhance cybersecurity skills through hands-on practice.",
    category: "Cybersecurity",
    image: "ctf-challenges",
    tags: ["CTF", "Cybersecurity", "TryHackMe", "HackTheBox", "VulnHub", "OverTheWire"],
    links: {
      demo: "#",
      github: "https://github.com/Surajkumaar/CTF-Challenges-main"
    }
  },
  {
    title: "Face Recognition Security System",
    description: "A real-time face detection and security system using Mediapipe and Flask that alerts via SMS through Twilio when unknown faces are detected.",
    category: "Cybersecurity",
    image: "face-recognition-security",
    tags: ["Flask", "OpenCV", "Mediapipe", "Twilio", "Real-time Detection", "Security"],
    links: {
      demo: "#",
      github: "https://github.com/Surajkumaar/Face-Recognition-Security-System"
    }
  },
  {
    title: "People-Image-Classifier",
    description: "A modern browser-based application that classifies images by detecting the number of people using TensorFlow.js and the COCO-SSD model.",
    category: "AI/ML",
    image: "people-image-classifier",
    tags: ["React", "TypeScript", "TensorFlow.js", "COCO-SSD", "Tailwind CSS", "Vite"],
    links: {
      demo: "#", 
      github: "https://github.com/Surajkumaar/People-Image-Classifier"
    }
  }
  
];

const ProjectCard = ({ project, index, isVisible }: { project: typeof projects[0], index: number, isVisible: boolean }) => {
  const getCategoryColor = (category: string) => {
    switch(category) {
      case "AI/ML":
        return "bg-neon-green/90 text-deep-blue";
      default:
        return "bg-electric-purple/90 text-foreground";
    }
  };

  // SVG patterns for project images
  const getProjectSvg = (imageName: string) => {
    switch(imageName) {
      case "threat-detection":
        return (
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8A2BE2" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#121212" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <rect width="100" height="100" fill="url(#gradient1)" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="#8A2BE2" strokeWidth="1" />
            <path d="M30,50 L70,50 M50,30 L50,70" stroke="#39FF14" strokeWidth="0.5" opacity="0.8" />
            <circle cx="50" cy="50" r="15" fill="#8A2BE2" opacity="0.3" />
          </svg>
        );
      case "malware-detection":
        return (
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect width="100" height="100" fill="#0A192F" />
            <circle cx="50" cy="50" r="25" fill="none" stroke="#8A2BE2" strokeWidth="0.5" />
            <rect x="40" y="40" width="20" height="20" fill="#8A2BE2" opacity="0.4" />
            <path d="M25,25 L75,75 M75,25 L25,75" stroke="#39FF14" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="10" fill="#39FF14" opacity="0.2" />
          </svg>
        );
      case "secops-dashboard":
        return (
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect width="100" height="100" fill="#0A192F" />
            <rect x="20" y="20" width="60" height="10" rx="2" fill="#8A2BE2" opacity="0.4" />
            <rect x="20" y="35" width="25" height="45" rx="2" fill="#8A2BE2" opacity="0.3" />
            <rect x="55" y="35" width="25" height="20" rx="2" fill="#8A2BE2" opacity="0.3" />
            <rect x="55" y="60" width="25" height="20" rx="2" fill="#8A2BE2" opacity="0.3" />
            <line x1="20" y1="50" x2="45" y2="50" stroke="#39FF14" strokeWidth="0.5" />
          </svg>
        );
      case "breach-analysis":
        return (
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect width="100" height="100" fill="#0A192F" />
            <path d="M10,70 L30,50 L50,60 L70,30 L90,40" stroke="#8A2BE2" strokeWidth="1" fill="none" />
            <circle cx="30" cy="50" r="3" fill="#39FF14" />
            <circle cx="50" cy="60" r="3" fill="#39FF14" />
            <circle cx="70" cy="30" r="3" fill="#39FF14" />
          </svg>
        );
      case "private-ai":
        return (
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect width="100" height="100" fill="#0A192F" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="#8A2BE2" strokeWidth="0.5" />
            <path d="M50,20 L50,80 M20,50 L80,50" stroke="#39FF14" strokeWidth="0.5" />
            <circle cx="35" cy="35" r="5" fill="#8A2BE2" opacity="0.4" />
            <circle cx="65" cy="35" r="5" fill="#8A2BE2" opacity="0.4" />
            <circle cx="35" cy="65" r="5" fill="#8A2BE2" opacity="0.4" />
            <circle cx="65" cy="65" r="5" fill="#8A2BE2" opacity="0.4" />
          </svg>
        );
      case "secure-comms":
        return (
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect width="100" height="100" fill="#0A192F" />
            <path d="M20,40 L80,40 L80,70 L50,70 L40,80 L40,70 L20,70 Z" fill="none" stroke="#8A2BE2" strokeWidth="0.5" />
            <circle cx="35" cy="55" r="3" fill="#39FF14" opacity="0.8" />
            <circle cx="50" cy="55" r="3" fill="#39FF14" opacity="0.8" />
            <circle cx="65" cy="55" r="3" fill="#39FF14" opacity="0.8" />
            <rect x="40" y="20" width="20" height="10" rx="2" fill="#8A2BE2" opacity="0.4" />
            <path d="M50,30 L50,40" stroke="#8A2BE2" strokeWidth="0.5" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect width="100" height="100" fill="#0A192F" />
            <circle cx="50" cy="50" r="20" fill="#8A2BE2" opacity="0.3" />
          </svg>
        );
    }
  };

  return (
    <div 
      className={`bg-gradient-to-br from-deep-blue/80 to-deep-blue border border-electric-purple/20 rounded-xl overflow-hidden shadow-lg shadow-electric-purple/5 card-tilt group transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative overflow-hidden">
        <div className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500">
          {getProjectSvg(project.image)}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-deep-blue via-deep-blue/50 to-transparent opacity-60"></div>
        <div className={`absolute top-3 right-3 ${getCategoryColor(project.category)} text-xs px-2 py-1 rounded font-['Fira_Code']`}>
          {project.category}
        </div>
      </div>
      
      <div className="p-6">
        <h4 className="text-xl font-['Space_Grotesk'] font-semibold mb-2 group-hover:text-electric-purple transition-colors duration-300">{project.title}</h4>
        <p className="text-foreground/70 mb-4 text-sm">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag, i) => (
            <span key={i} className="text-xs bg-electric-purple/20 text-electric-purple px-2 py-1 rounded">{tag}</span>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <a href={project.links.demo} className="text-electric-purple hover:text-electric-purple/80 transition-colors duration-300 text-sm font-medium flex items-center">
            <span>View Project</span>
            <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
          </a>
          <a href={project.links.github} className="text-foreground/60 hover:text-electric-purple transition-colors duration-300">
            <FaGithub />
          </a>
        </div>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-24 px-6 relative"
    >
      <div className="container mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-12 h-[1px] bg-electric-purple"></div>
          <h2 className="text-xl md:text-2xl font-['Space_Grotesk'] font-bold text-electric-purple">Featured Projects</h2>
        </div>
        
        <h3 className="text-3xl md:text-4xl font-['Space_Grotesk'] font-bold mb-12 text-center">My Recent Work</h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index} 
              project={project} 
              index={index} 
              isVisible={isVisible} 
            />
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default ProjectsSection;
