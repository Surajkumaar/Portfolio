import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

interface HackerModeContextType {
  isHackerMode: boolean;
  toggleHackerMode: () => void;
  isSoundEnabled: boolean;
  toggleSound: () => void;
  playTypeSound: () => void;
  playBeepSound: () => void;
  executeCommand: (command: string) => string;
  terminalResponse: string;
  setTerminalResponse: (response: string) => void;
  isTerminalVisible: boolean;
  toggleTerminalVisibility: () => void;
}

const HackerModeContext = createContext<HackerModeContextType | undefined>(undefined);

// Terminal command responses
const commandResponses: Record<string, string> = {
  'help': `
  AVAILABLE COMMANDS
  -----------------
  help        Show help
  about       About me
  skills      Tech stack
  projects    Portfolio
  contact     Reach me
  exit        Exit mode
  clear       Clear term
  
  SYSTEM COMMANDS: whoami, ls, cat, scan, ping
  EASTER EGGS: Try "sudo hack the planet"
  KEYBOARD SHORTCUT: Ctrl+H to toggle Hacker Mode
  KEYBOARD SHORTCUT: Ctrl+Y to toggle Terminal`,
  
  'about': `
  IDENTITY: Cybersecurity& AI/ML Enthusiast
  
  EXPERTISE:
  ■ Ethical hacking and penetration testing 
  ■ Machine learning and deep learning model implementation 
  ■ Python scripting for automation, data processing, and analysis 
  ■ AI and LLM-based application development
  ■ Cybersecurity and network security fundamentals  
`,
  
  'skills': `
  CYBERSECURITY              AI/ML                       DEVELOPMENT
  -------------------------  --------------------------  ---------------------------
  Ethical Hacking            TensorFlow                  Python
  Penetration Testing        PyTorch                     JavaScript
  Network Security           LLM Integration             Node.js
  Vulnerability Scanning     Computer Vision Basics      React
  OSINT Techniques           Deep Learning Models        SQL
  Malware Analysis           Data Analysis               Cloud Deployment (AWS, Docker)
`,


  
  'projects': `
  [LOADING PROJECTS DATABASE...]
  ✓ Access granted to project repository
  
  PROJECT LIST:
  1. Honeypy: Honeypot-Based Threat Detection
  2. ClarirAI: Diabetic Retinopathy Detection System
  3. CVElytics: AI-Powered Cybersecurity Assistant
  4. CTF Challenges Collection
  5. Face Recognition Security System
  6. People-Image-Classifier
  
  Use "project X" command for details or scroll to Projects section.`,
  
'project 1': `
  PROJECT FILE: Honeypy: Honeypot-Based Threat Detection
  STATUS: Completed
  TECH: Python, Flask, Paramiko, Network Security
  
  Simulated vulnerable SSH and HTTP services to detect unauthorized access 
  attempts. Logged attacker behavior to enhance network security analysis.
  [GitHub Repo Available]
`,
  
'project 2': `
  PROJECT FILE: ClarirAI: Diabetic Retinopathy Detection System
  STATUS: Completed
  TECH: Next.js, React, FastAPI, Hugging Face, Machine Learning
  
  Developed an AI-driven system for detecting diabetic retinopathy from
  retinal images with an interactive frontend and backend API integration.
  [Demo and GitHub Repo Available]
`,
  
'project 3': `
  PROJECT FILE: CVElytics: AI-Powered Cybersecurity Assistant
  STATUS: Completed
  TECH: Python, Flask, LangChain, OpenRouter, Vector Search
  
  Built an AI-based question-answering tool providing detailed insights
  about CVEs, leveraging LLMs and vector search for cybersecurity research.
  [Demo and GitHub Repo Available]
`,
  
'project 4': `
  PROJECT FILE: CTF Challenges Collection
  STATUS: Completed
  TECH: CTF Frameworks, TryHackMe, HackTheBox, VulnHub
  
  Curated and solved a wide range of Capture The Flag challenges,
  documenting methodologies and enhancing hands-on cybersecurity skills.
  [GitHub Repo Available]
`,
  
'project 5': `
  PROJECT FILE: Face Recognition Security System
  STATUS: Completed
  TECH: Flask, OpenCV, Mediapipe, Twilio
  
  Created a real-time face detection security tool that sends SMS alerts
  when unknown individuals are detected, strengthening physical security.
  [GitHub Repo Available]
`,
  
'project 6': `
  PROJECT FILE: People-Image-Classifier
  STATUS: Completed
  TECH: React, TypeScript, TensorFlow.js, COCO-SSD
  
  Browser-based app that classifies images by detecting the number of people
  using machine learning directly inside the browser.
  [GitHub Repo Available]
`,

  
  'contact': `
  [INITIALIZING SECURE COMMUNICATION PROTOCOL]
  ✓ Encryption: AES-256
  ✓ Channel: Authenticated
  ✓ Connection: Established
  
  Secure contact form is available in the Contact section below.
  All communications are end-to-end encrypted.`,
  
  'exit': '[!] Terminating Hacker Mode...\n[+] Returning to standard interface...',
  'clear': 'Terminal buffer cleared. Starting fresh terminal session.',
  
  'sudo hack the planet': `
  ✖ ACCESS DENIED
  🔒 Error: Insufficient privileges
  
  [!] Unauthorized access attempt detected
  [!] IP address: ${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}
  [!] Geolocation: TRACKED
  [!] Countermeasures: INITIATED
  
  [SYSTEM]: This incident has been reported.`,
  
  'hello': 'Hello, user. How may I assist your cyber operations today?',
  'hi': 'Greetings. Terminal ready for your commands.',
  'hey': 'Hey there. How can I assist with your cybersecurity needs?',
  
  'whoami': `
  USER PROFILE:
  Username: guest
  Access Level: restricted
  Session: ${Math.random().toString(36).substring(2, 10)}
  Permissions: read-only`,
  
  'ls': `
  DIRECTORY LISTING:
  drwxr-xr-x  about.txt
  drwxr-xr-x  projects.md
  drwxr-xr-x  skills.json
  drwxr-xr-x  contact.sh
  drwxr-xr-x  README.md
  drwxr-xr-x  certificates/
`,
  
  'ls certificates': `
  DIRECTORY: certificates/
  -rw-r--r--  tryhackme_advent_of_cyber.pdf
  -rw-r--r--  microsoft_cybersecurity_essentials.pdf
  -rw-r--r--  udemy_tensorflow_programming.pdf
  -rw-r--r--  udemy_computer_networks_fundamentals.pdf
  -rw-r--r--  linkedin_learning_cloud_computing_core.pdf
  -rw-r--r--  linkedin_learning_ethical_hacking_system_hacking.pdf
`,

  
  'cat readme.md': `
  # CYBERSECURITY | AI/ML PORTFOLIO

  Welcome to my interactive portfolio showcasing my journey
  and expertise in cybersecurity and AI/ML development.
  
  Explore real-world projects, certifications, and technical skills
  using terminal-style commands or the standard user interface.

  For the full experience, dive into "hacker mode" and
  navigate the portfolio like a real terminal environment.
`,

  
  'scan': `
  [INITIATING NETWORK SCAN...]
  
  OPEN PORTS:
  22/tcp   open  ssh
  80/tcp   open  http
  443/tcp  open  https
  8080/tcp open  http-alt
  
  SCAN COMPLETE: 4 open ports found, 0 vulnerabilities detected`,
  
  'ping': `
  PING 8.8.8.8 (8.8.8.8): 56 data bytes
  64 bytes from 8.8.8.8: icmp_seq=0 ttl=56 time=14.2 ms
  64 bytes from 8.8.8.8: icmp_seq=1 ttl=56 time=12.8 ms
  64 bytes from 8.8.8.8: icmp_seq=2 ttl=56 time=13.9 ms
  
  --- 8.8.8.8 ping statistics ---
  3 packets transmitted, 3 packets received, 0.0% packet loss
  round-trip min/avg/max/stddev = 12.8/13.6/14.2/0.7 ms`,
  
  'matrix': `Initializing Matrix mode...
  
  "The Matrix is everywhere. It is all around us.
  Even now, in this very room. You can see it when
  you look out your window or when you turn on your
  television. You can feel it when you go to work...
  when you go to church... when you pay your taxes."`,
  
  'hack': `
  [!] ERROR: Missing target parameter
  USAGE: hack [target-ip] [--stealth]
  
  For educational purposes only. Unauthorized hacking
  attempts are illegal and unethical.`,
  
  'date': `Current timestamp: ${new Date().toString()}`,
  
  'bitcoin': `
  [LIVE CRYPTOCURRENCY RATES]
  BTC/USD: $${Math.floor(50000 + Math.random() * 10000)}.${Math.floor(Math.random() * 100)}
  ETH/USD: $${Math.floor(3000 + Math.random() * 1000)}.${Math.floor(Math.random() * 100)}
  Last updated: ${new Date().toLocaleTimeString()}`
};

export const HackerModeProvider = ({ children }: { children: ReactNode }) => {
  const [isHackerMode, setIsHackerMode] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [terminalResponse, setTerminalResponse] = useState('');
  const [isTerminalVisible, setIsTerminalVisible] = useState(false);
  
  // Sound objects
  const [typeSound, setTypeSound] = useState<HTMLAudioElement | null>(null);
  const [beepSound, setBeepSound] = useState<HTMLAudioElement | null>(null);

  // Initialize sound effects
  useEffect(() => {
    // Create type sound (short key press)
    const typeSoundEffect = new Audio();
    typeSoundEffect.src = 'data:audio/mp3;base64,SUQzAwAAAAAAJlRQRTEAAAAcAAAAU291bmRKYXkuY29tIFNvdW5kIEVmZmVjdHMA//uQxAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAAFAAAGUACFhYWFhYWFhYWFhYWFhYWFhYWFvb29vb29vb29vb29vb29vb29vb3T09PT09PT09PT09PT09PT09PT0/v7+/v7+/v7+/v7+/v7+/v7+/v4AAABQTEFTVCAAAAAPAAADJAACAGQABCAAAD0wIuAAIAAABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sQxAADwAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV';
    typeSoundEffect.volume = 0.2;
    setTypeSound(typeSoundEffect);
    
    // Create beep sound (alert/notification)
    const beepSoundEffect = new Audio();
    beepSoundEffect.src = 'data:audio/mp3;base64,SUQzAwAAAAAAJlRQRTEAAAAcAAAAU291bmRKYXkuY29tIFNvdW5kIEVmZmVjdHMA//uQxAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAALAAAJuABHR0dHR0dHR0dHR0dHbm5ubm5ubm5ubm5ubm5ubm5ubm6VlZWVlZWVlZWVlZWVlZWVlZWVlcPDw8PDw8PDw8PDw8PDw8PDw8Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4/T09PT09PT09PT09PT09PT09PT0/v7+/v7+/v7+/v7+/v7+/v7+/v4AAABQTEFTVCAAAAAPAAADJAACAGQABCAAAD0wIuAAIAAABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sQxAADwAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV';
    beepSoundEffect.volume = 0.3;
    setBeepSound(beepSoundEffect);

    // Load sound preference from localStorage
    const savedSoundPref = localStorage.getItem('hackerModeSound');
    if (savedSoundPref !== null) {
      setIsSoundEnabled(JSON.parse(savedSoundPref));
    }

    return () => {
      // Cleanup
      typeSoundEffect.pause();
      beepSoundEffect.pause();
    };
  }, []);

  // Sound player functions
  const playTypeSound = useCallback(() => {
    if (isSoundEnabled && typeSound) {
      typeSound.currentTime = 0;
      typeSound.play().catch(e => console.log('Audio play error:', e));
    }
  }, [isSoundEnabled, typeSound]);

  const playBeepSound = useCallback(() => {
    if (isSoundEnabled && beepSound) {
      beepSound.currentTime = 0;
      beepSound.play().catch(e => console.log('Audio play error:', e));
    }
  }, [isSoundEnabled, beepSound]);

  const toggleHackerMode = useCallback(() => {
    const newValue = !isHackerMode;
    setIsHackerMode(newValue);
    
    // Play sound effect
    if (newValue) {
      playBeepSound();
    } else {
      playTypeSound();
      // Hide terminal when exiting hacker mode
      setIsTerminalVisible(false);
    }
    
    // Save preference to localStorage
    localStorage.setItem('hackerMode', JSON.stringify(newValue));
    
    // Apply or remove hacker mode class to body
    if (newValue) {
      document.body.classList.add('hacker-mode');
      setTerminalResponse('Hacker Mode activated. Type "help" for available commands.');
    } else {
      document.body.classList.remove('hacker-mode');
      setTerminalResponse('');
    }
  }, [isHackerMode, playBeepSound, playTypeSound, setTerminalResponse]);

  const toggleTerminalVisibility = useCallback(() => {
    if (isHackerMode) {
      setIsTerminalVisible(prev => !prev);
    }
  }, [isHackerMode]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle hacker mode with Ctrl+H (or Cmd+H on Mac)
      if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
        e.preventDefault();
        toggleHackerMode();
      }
      
      // Toggle terminal visibility with Ctrl+T (or Cmd+T on Mac)
      if ((e.ctrlKey || e.metaKey) && e.key === 't') {
        e.preventDefault();
        if (isHackerMode) {
          toggleTerminalVisibility();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleHackerMode, toggleTerminalVisibility, isHackerMode]);

  const toggleSound = () => {
    const newValue = !isSoundEnabled;
    setIsSoundEnabled(newValue);
    localStorage.setItem('hackerModeSound', JSON.stringify(newValue));
  };

  // Terminal command execution
  const executeCommand = (command: string): string => {
    // Convert command to lowercase for case-insensitive matching
    const normalizedCommand = command.trim().toLowerCase();
    
    // Special commands with side effects
    if (normalizedCommand === 'exit') {
      // Exit hacker mode
      setTimeout(() => toggleHackerMode(), 1000);
      return commandResponses['exit'];
    }
    
    if (normalizedCommand === 'clear') {
      setTimeout(() => setTerminalResponse(''), 100);
      return commandResponses['clear'];
    }
    
    // Sound commands
    if (normalizedCommand === 'sound on') {
      if (!isSoundEnabled) toggleSound();
      return 'Terminal sounds enabled. Type commands to hear typing sounds.';
    }
    
    if (normalizedCommand === 'sound off') {
      if (isSoundEnabled) toggleSound();
      return 'Terminal sounds disabled.';
    }
    
    // Easter egg commands
    if (normalizedCommand === 'sudo hack the planet') {
      playBeepSound();
      document.body.classList.add('hacker-glitch');
      setTimeout(() => document.body.classList.remove('hacker-glitch'), 500);
      return commandResponses['sudo hack the planet'];
    }
    
    if (normalizedCommand === 'matrix') {
      playBeepSound();
      // Increase matrix background visibility temporarily
      const matrixElements = document.querySelectorAll('.matrix-background');
      matrixElements.forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.opacity = '0.3';
          setTimeout(() => { el.style.opacity = ''; }, 10000);
        }
      });
      return commandResponses['matrix'];
    }
    
    // Exact command matches
    if (commandResponses[normalizedCommand]) {
      return commandResponses[normalizedCommand];
    }
    
    // Command patterns
    
    // Handle cat command with argument
    if (normalizedCommand.startsWith('cat ')) {
      const file = normalizedCommand.slice(4).trim();
      if (file === 'about.txt') return commandResponses['about'];
      if (file === 'skills.json') return commandResponses['skills'];
      if (file === 'readme.md') return commandResponses['cat readme.md'];
      
      // Try to find any file that includes the specified term
      const possibleFiles = ['about.txt', 'skills.json', 'projects.md', 'contact.sh', 'readme.md'];
      const foundFile = possibleFiles.find(f => f.includes(file));
      
      if (foundFile) {
        if (foundFile === 'about.txt') return commandResponses['about'];
        if (foundFile === 'skills.json') return commandResponses['skills'];
        if (foundFile === 'projects.md') return commandResponses['projects'];
        if (foundFile === 'contact.sh') return commandResponses['contact'];
        if (foundFile === 'readme.md') return commandResponses['cat readme.md'];
      }
      
      return `File not found: ${file}. Available files can be listed with 'ls' command.`;
    }
    
    // Handle ls command with argument
    if (normalizedCommand.startsWith('ls ')) {
      const dir = normalizedCommand.slice(3).trim();
      if (dir === 'certificates' || dir === 'certificates/') return commandResponses['ls certificates'];
      if (dir === 'research' || dir === 'research/') return commandResponses['ls research'];
      return `Directory not found: ${dir}. Available directories: certificates/, research/`;
    }
    
    // Handle project command with number
    if (normalizedCommand.match(/^project\s+\d+$/)) {
      const projectNum = normalizedCommand.split(/\s+/)[1];
      const projectKey = `project ${projectNum}`;
      
      if (commandResponses[projectKey]) {
        return commandResponses[projectKey];
      }
      
      return `Project ${projectNum} details not available. Try 'projects' to see available projects.`;
    }
    
    // Handle ping command with argument
    if (normalizedCommand.startsWith('ping ')) {
      const target = normalizedCommand.slice(5).trim();
      if (target === '') return 'Usage: ping [hostname/IP]';
      
      // Generate random ping times for the given host
      const pingTimes = Array(3).fill(0).map(() => (10 + Math.random() * 20).toFixed(1));
      
      return `
      PING ${target} (${target}): 56 data bytes
      64 bytes from ${target}: icmp_seq=0 ttl=56 time=${pingTimes[0]} ms
      64 bytes from ${target}: icmp_seq=1 ttl=56 time=${pingTimes[1]} ms
      64 bytes from ${target}: icmp_seq=2 ttl=56 time=${pingTimes[2]} ms
      
      --- ${target} ping statistics ---
      3 packets transmitted, 3 packets received, 0.0% packet loss
      round-trip min/avg/max/stddev = ${Math.min(...pingTimes.map(Number))}/
      ${(pingTimes.map(Number).reduce((a, b) => a + b, 0) / 3).toFixed(1)}/
      ${Math.max(...pingTimes.map(Number))} ms`;
    }
    
    // Handle common typos and aliases
    if (['cls', 'clr'].includes(normalizedCommand)) {
      setTimeout(() => setTerminalResponse(''), 100);
      return commandResponses['clear'];
    }
    
    if (['commands', '?', 'man'].includes(normalizedCommand)) {
      return commandResponses['help'];
    }
    
    if (['projects', 'portfolio', 'work'].includes(normalizedCommand)) {
      return commandResponses['projects'];
    }
    
    // Default response for unknown commands
    return `Command not found: ${command}. Type "help" for available commands.`;
  };

  // Initialize from localStorage on mount
  useEffect(() => {
    const savedMode = localStorage.getItem('hackerMode');
    if (savedMode !== null) {
      const parsed = JSON.parse(savedMode);
      setIsHackerMode(parsed);
      
      if (parsed) {
        document.body.classList.add('hacker-mode');
      }
    }
  }, []);

  return (
    <HackerModeContext.Provider
      value={{
        isHackerMode,
        toggleHackerMode,
        isSoundEnabled,
        toggleSound,
        playTypeSound,
        playBeepSound,
        executeCommand,
        terminalResponse,
        setTerminalResponse,
        isTerminalVisible,
        toggleTerminalVisibility
      }}
    >
      {children}
    </HackerModeContext.Provider>
  );
};

export const useHackerMode = (): HackerModeContextType => {
  const context = useContext(HackerModeContext);
  if (context === undefined) {
    throw new Error('useHackerMode must be used within a HackerModeProvider');
  }
  return context;
};
