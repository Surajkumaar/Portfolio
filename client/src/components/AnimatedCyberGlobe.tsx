import { useRef, useEffect } from 'react';
import { useHackerMode } from '@/hooks/use-hacker-mode';

const AnimatedCyberGlobe = () => {
  const { isHackerMode } = useHackerMode();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      } else {
        canvas.width = 500;
        canvas.height = 500;
      }
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Create particles
    const particles: { x: number; y: number; z: number; size: number; speed: number }[] = [];
    const particleCount = 200;
    const radius = Math.min(canvas.width, canvas.height) * 0.4;
    
    for (let i = 0; i < particleCount; i++) {
      // Create particles on a sphere surface (using spherical coordinates)
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      
      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(theta);
      
      particles.push({
        x,
        y, 
        z,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.01 + 0.01
      });
    }
    
    // Create connections between particles
    const connections: [number, number][] = [];
    const connectionCount = 50;
    
    for (let i = 0; i < connectionCount; i++) {
      const particleA = Math.floor(Math.random() * particleCount);
      const particleB = Math.floor(Math.random() * particleCount);
      
      if (particleA !== particleB) {
        connections.push([particleA, particleB]);
      }
    }
    
    // Animation variables
    let animationFrame: number;
    let rotationY = 0;
    
    // Draw function
    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Center of canvas
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Increment rotation
      rotationY += 0.005;
      
      // Draw globe wireframe
      ctx.beginPath();
      ctx.strokeStyle = isHackerMode ? 'rgba(57, 255, 20, 0.2)' : 'rgba(138, 43, 226, 0.2)';
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();
      
      // Draw another perpendicular circle
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, radius, radius * 0.3, 0, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, radius, radius * 0.3, Math.PI / 2, 0, Math.PI * 2);
      ctx.stroke();
      
      // Draw and update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Apply rotation around Y axis
        const cosY = Math.cos(rotationY);
        const sinY = Math.sin(rotationY);
        
        const rotatedX = p.x * cosY - p.z * sinY;
        const rotatedZ = p.x * sinY + p.z * cosY;
        
        // Simple perspective projection
        const scale = 400 / (400 + rotatedZ);
        const projectedX = centerX + rotatedX * scale;
        const projectedY = centerY + p.y * scale;
        
        // Draw particle
        const particleColor = isHackerMode 
          ? `rgba(57, 255, 20, ${0.2 + scale * 0.6})`
          : `rgba(138, 43, 226, ${0.2 + scale * 0.6})`;
          
        ctx.beginPath();
        ctx.fillStyle = particleColor;
        ctx.arc(projectedX, projectedY, p.size * scale, 0, Math.PI * 2);
        ctx.fill();
        
        // Update particle position (if needed)
        particles[i] = { ...p };
      }
      
      // Draw connections between particles
      for (const connection of connections) {
        const p1 = particles[connection[0]];
        const p2 = particles[connection[1]];
        
        // Rotate and project first particle
        const p1cosY = Math.cos(rotationY);
        const p1sinY = Math.sin(rotationY);
        
        const p1rotatedX = p1.x * p1cosY - p1.z * p1sinY;
        const p1rotatedZ = p1.x * p1sinY + p1.z * p1cosY;
        
        const p1scale = 400 / (400 + p1rotatedZ);
        const p1projectedX = centerX + p1rotatedX * p1scale;
        const p1projectedY = centerY + p1.y * p1scale;
        
        // Rotate and project second particle
        const p2cosY = Math.cos(rotationY);
        const p2sinY = Math.sin(rotationY);
        
        const p2rotatedX = p2.x * p2cosY - p2.z * p2sinY;
        const p2rotatedZ = p2.x * p2sinY + p2.z * p2cosY;
        
        const p2scale = 400 / (400 + p2rotatedZ);
        const p2projectedX = centerX + p2rotatedX * p2scale;
        const p2projectedY = centerY + p2.y * p2scale;
        
        // Calculate line opacity based on position
        const lineOpacity = ((p1scale + p2scale) / 2) * 0.5;
        
        // Draw line
        ctx.beginPath();
        ctx.strokeStyle = isHackerMode 
          ? `rgba(57, 255, 20, ${lineOpacity})`
          : `rgba(138, 43, 226, ${lineOpacity})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(p1projectedX, p1projectedY);
        ctx.lineTo(p2projectedX, p2projectedY);
        ctx.stroke();
      }
      
      // Create glowing core
      const glowGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, radius * 0.3
      );
      
      if (isHackerMode) {
        glowGradient.addColorStop(0, 'rgba(57, 255, 20, 0.4)');
        glowGradient.addColorStop(1, 'rgba(57, 255, 20, 0)');
      } else {
        glowGradient.addColorStop(0, 'rgba(138, 43, 226, 0.4)');
        glowGradient.addColorStop(1, 'rgba(138, 43, 226, 0)');
      }
      
      ctx.beginPath();
      ctx.fillStyle = glowGradient;
      ctx.arc(centerX, centerY, radius * 0.3, 0, Math.PI * 2);
      ctx.fill();
      
      // Continue animation
      animationFrame = requestAnimationFrame(draw);
    };
    
    // Start animation
    draw();
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isHackerMode]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full"
    />
  );
};

export default AnimatedCyberGlobe;