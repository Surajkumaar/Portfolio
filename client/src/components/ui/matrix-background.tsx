import React, { useEffect, useRef } from 'react';

interface MatrixBackgroundProps {
  opacity?: number;
}

const MatrixBackground = ({ opacity = 0.05 }: MatrixBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Character set for the matrix rain (using cybersecurity-related characters)
    const chars = "01アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン{}[]<>?!@#$%^&*()-+=~";
    const drops: number[] = [];

    // Initialize drops at random positions
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.floor(Math.random() * canvas.height / fontSize) * -1;
    }

    // Drawing function
    function drawMatrix() {
      if (!context || !canvas) return;
      
      // Set background with transparency to create trail effect
      context.fillStyle = `rgba(0, 0, 0, 0.05)`;
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      context.fillStyle = '#39FF14'; // Matrix green color
      context.font = `${fontSize}px monospace`;
      
      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        // Get a random character
        const text = chars[Math.floor(Math.random() * chars.length)];
        
        // Draw the character
        context.fillText(text, i * fontSize, drops[i] * fontSize);
        
        // Move the drop down
        drops[i]++;
        
        // Randomize reset to top
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
      }
    }

    // Setup resize handler
    const handleResize = () => {
      if (!canvas) return;
      
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Recalculate columns
      const newColumns = Math.floor(canvas.width / fontSize);
      
      // Adjust drops array for new width
      if (newColumns > columns) {
        for (let x = columns; x < newColumns; x++) {
          drops[x] = Math.floor(Math.random() * canvas.height / fontSize) * -1;
        }
      }
    };

    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const matrixInterval = setInterval(drawMatrix, 50);
    
    return () => {
      clearInterval(matrixInterval);
      window.removeEventListener('resize', handleResize);
    };
  }, [opacity]);

  return (
    <canvas
      ref={canvasRef}
      className="matrix-background fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]"
      style={{ opacity }}
    />
  );
};

export default MatrixBackground;