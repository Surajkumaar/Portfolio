import React, { useState, useRef, useEffect } from 'react';
import { useHackerMode } from '@/hooks/use-hacker-mode';
import { motion, AnimatePresence } from 'framer-motion';
import MatrixBackground from './ui/matrix-background';

const HackerModeTerminal = () => {
  const { 
    isHackerMode, 
    playTypeSound, 
    executeCommand, 
    terminalResponse, 
    setTerminalResponse,
    isTerminalVisible,
    toggleTerminalVisibility
  } = useHackerMode();
  
  const [command, setCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Effect to focus on input field when terminal is shown
  useEffect(() => {
    if (isHackerMode && isTerminalVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isHackerMode, isTerminalVisible]);

  // Effect to scroll to bottom when new terminal response is added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalResponse, commandHistory]);

  // Handle keyboard shortcut for terminal visibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle terminal visibility with Ctrl+Y (or Cmd+Y on Mac)
      if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault();
        if (isHackerMode) {
          toggleTerminalVisibility();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isHackerMode]);

  // Handle command input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommand(e.target.value);
    if (e.target.value.length > 0) {
      playTypeSound();
    }
  };

  // Handle key press events for terminal behavior
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle arrow up for command history navigation
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    }
    
    // Handle arrow down for command history navigation
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCommand('');
      }
    }
    
    // Handle Tab for auto-completion (dummy implementation)
    else if (e.key === 'Tab') {
      e.preventDefault();
      if (command.startsWith('h')) setCommand('help');
      else if (command.startsWith('c')) setCommand('clear');
      else if (command.startsWith('m')) setCommand('matrix');
    }
  };

  // Handle command submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (command.trim() === '') return;
    
    // Add command to history and reset index
    setCommandHistory([...commandHistory, command]);
    setHistoryIndex(-1);
    
    // Execute command and get response
    const response = executeCommand(command);
    setTerminalResponse(response);
    
    // Clear input field
    setCommand('');
  };

  // Clear the terminal
  const clearTerminal = () => {
    setTerminalResponse('');
    setCommandHistory([]);
  };

  if (!isHackerMode || !isTerminalVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
      >
        <div className="relative w-full h-full max-w-full max-h-full p-4 md:p-6 flex flex-col">
          <MatrixBackground opacity={0.1} />
          
          <div className="terminal-header bg-black text-green-500 p-2 rounded-t-md flex justify-between items-center border border-green-500 border-b-0">
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span>
              <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
              <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              <span className="ml-2 text-xs md:text-sm font-mono">root@cybersecurity:~#</span>
            </div>
            <div className="flex items-center">
              <button 
                onClick={clearTerminal}
                className="text-xs md:text-sm text-green-300 hover:text-green-100 mr-4"
              >
                Clear
              </button>
              <span className="text-xs md:text-sm text-green-300">Press Ctrl+Y to hide</span>
            </div>
          </div>
          
          <div 
            ref={terminalRef}
            className="bg-black border border-green-500 rounded-b-md p-4 flex-grow overflow-y-auto overflow-x-auto font-mono text-sm text-green-500"
          >
            {/* Terminal welcome message */}
            <div className="mb-4 text-xs md:text-sm">
              <p>CyberSec Terminal v1.0 - Type 'help' for available commands</p>
              <p className="text-green-300">Connected to secure network. Encryption: AES-256</p>
              <p className="text-xs text-green-200 opacity-50">Last login: {new Date().toLocaleString()}</p>
            </div>
            
            {/* Command history */}
            {commandHistory.map((cmd, index) => (
              <div key={index} className="mb-2">
                <p className="flex">
                  <span className="text-green-300 mr-2">$</span>
                  <span>{cmd}</span>
                </p>
                {index === commandHistory.length - 1 && (
                  <div className="pl-4 text-green-400 font-mono type-animation" style={{ whiteSpace: 'pre', overflowX: 'visible' }}>
                    {terminalResponse}
                  </div>
                )}
              </div>
            ))}
            
            {/* Command input */}
            <form onSubmit={handleSubmit} className="flex items-center mt-2">
              <span className="text-green-300 mr-2">$</span>
              <input
                ref={inputRef}
                type="text"
                value={command}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none text-green-500 focus:outline-none font-mono text-sm"
                spellCheck="false"
                autoComplete="off"
              />
            </form>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default HackerModeTerminal;