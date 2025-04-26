import { useRef } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { 
  FaShieldAlt, 
  FaNetworkWired, 
  FaBrain, 
  FaSitemap, 
  FaChartLine,
  FaCloud,
  FaRobot 
} from "react-icons/fa";
import { FaPython } from "react-icons/fa";

const skills = [
  {
    title: "Ethical Hacking",
    description: "Hands-on experience with tools like Kali Linux, Burp Suite, and Wireshark for basic penetration testing and vulnerability exploration.",
    icon: FaShieldAlt,
    proficiency: 60
  },
  {
    title: "Python",
    description: "Comfortable writing scripts, automating tasks, and working with libraries for data processing and ML projects.",
    icon: FaPython,
    proficiency: 75
  },
  {
    title: "Deep Learning",
    description: "Worked with CNNs and pre-trained models using PyTorch and TensorFlow for image-based tasks.",
    icon: FaSitemap,
    proficiency: 60
  },
  {
    title: "Data Analysis",
    description: "Basic data cleaning, querying with SQL, and visualizing results using Python tools and dashboards.",
    icon: FaChartLine,
    proficiency: 65
  },
  {
    title: "Cloud & DevOps",
    description: "Familiar with deploying projects on AWS EC2, using Docker, GitHub, and REST APIs.",
    icon: FaCloud,
    proficiency: 58
  },
  {
    title: "AI & LLMs",
    description: "Exploring LLMs, RAG pipelines, and simple AI agent setups using OpenRouter and vector databases.",
    icon: FaRobot,
    proficiency: 60
  }
];

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="py-24 px-6 bg-gradient-to-b from-deep-blue to-deep-blue/90 relative"
    >
      <div className="container mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-12 h-[1px] bg-electric-purple"></div>
          <h2 className="text-xl md:text-2xl font-['Space_Grotesk'] font-bold text-electric-purple">Skills & Expertise</h2>
        </div>
        
        <h3 className="text-3xl md:text-4xl font-['Space_Grotesk'] font-bold mb-12 text-center">Technical Capabilities</h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {skills.map((skill, index) => (
            <div 
              key={index}
              className={`bg-gradient-to-br from-deep-blue/80 to-deep-blue p-6 rounded-xl glow-border card-tilt shadow-lg transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 flex items-center justify-center bg-electric-purple/20 rounded-lg text-electric-purple">
                  <skill.icon className="text-2xl" />
                </div>
                <h4 className="text-xl font-['Space_Grotesk'] font-semibold">{skill.title}</h4>
              </div>
              
              <p className="text-foreground/70 mb-6">{skill.description}</p>
              
              <div className="w-full bg-dark-gray/50 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-electric-purple to-neon-green h-full rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: isVisible ? `${skill.proficiency}%` : '0%' }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-foreground/50 font-['Fira_Code']">
                <span>Proficiency</span>
                <span>{skill.proficiency}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
