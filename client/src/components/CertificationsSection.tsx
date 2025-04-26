import { useRef } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { 
  FaShieldAlt, 
  FaLock, 
  FaBrain, 
  FaCloud, 
  FaUserSecret 
} from "react-icons/fa";
import { FaNetworkWired } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";

const certifications = [
  {
    title: "Python TensorFlow Programming with Coding Exercises",
    organization: "Udemy",
    description: "Hands-on course on Python and TensorFlow with coding practice.",
    year: "2025",
    icon: FaBrain
  },
  {
    title: "Advent of Cyber 2024",
    organization: "TryHackMe",
    description: "Completed 24 cybersecurity challenges demonstrating consistency, tenacity, and a strong understanding of cyber fundamentals.",
    year: "2024",
    icon: FaShieldAlt
  },
  {
    title: "Career Essentials in Cybersecurity by Microsoft and LinkedIn",
    organization: "Microsoft & LinkedIn",
    description: "Learning path covering cybersecurity awareness, threat management, and defense.",
    year: "2024",
    icon: FaLock
  },
  {
    title: "Computer Networks Fundamentals",
    organization: "Udemy",
    description: "Comprehensive overview of network architecture, protocols, and operations.",
    year: "2024",
    icon: FaNetworkWired
  },
  {
    title: "Learning Cloud Computing: Core Concepts",
    organization: "LinkedIn Learning",
    description: "Fundamentals of cloud computing covering key concepts and deployment models.",
    year: "2023",
    icon: FaCloud
  },
  {
    title: "Ethical Hacking: System Hacking",
    organization: "LinkedIn Learning",
    description: "Explores system hacking techniques and countermeasures in ethical hacking scenarios.",
    year: "2023",
    icon: FaUserSecret
  }
];

const CertificationsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  return (
    <section 
      id="certifications" 
      ref={sectionRef}
      className="py-24 px-6 bg-gradient-to-b from-deep-blue to-deep-blue/90 relative"
    >
      <div className="container mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-12 h-[1px] bg-electric-purple"></div>
          <h2 className="text-xl md:text-2xl font-['Space_Grotesk'] font-bold text-electric-purple">Certifications</h2>
        </div>
        
        <h3 className="text-3xl md:text-4xl font-['Space_Grotesk'] font-bold mb-12 text-center">Technical Certifications</h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <div 
              key={index} 
              className={`bg-gradient-to-br from-deep-blue/80 to-deep-blue p-6 rounded-xl glow-border card-tilt shadow-lg group transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4 bg-gradient-to-r from-electric-purple/20 to-neon-green/20 group-hover:from-electric-purple/40 group-hover:to-neon-green/40 transition-all duration-500">
                  <cert.icon className="text-3xl text-electric-purple" />
                </div>
                
                <h4 className="text-lg font-['Space_Grotesk'] font-semibold mb-1 text-center">{cert.title}</h4>
                <p className="text-electric-purple/80 mb-3 text-sm text-center">{cert.organization}</p>
                
                <p className="text-foreground/70 mb-4 text-sm text-center">{cert.description}</p>
                
                <div className="flex items-center gap-2 text-foreground/50 text-sm">
                  <FaCalendarAlt />
                  <span>Obtained: {cert.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
