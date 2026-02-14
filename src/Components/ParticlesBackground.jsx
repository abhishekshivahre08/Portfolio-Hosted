import React, { useEffect } from 'react';
import { useRef } from 'react';

export default function ParticlesBackground() {
  const canvaRef = useRef(null);
  useEffect(() => {
    const canvas = canvaRef.current; // access the dom element and get the context of the canvas
    if (!canvas) return; // guard: in some cases ref may be null
    const ctx = canvas.getContext('2d');

    let particles = [];
    const particleCount = 50;
    const colors = ["rgba(255, 255, 255, 0.7)"];

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 2 + 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        //Wrap around effect for moving our particle left to right and top to bottom
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        this.draw();
      }
    }

    // for creating a 50 particles
    function createParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    // particles size according to window size
    function handleResize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();
    }


    handleResize();
    window.addEventListener('resize', handleResize);
    //animating the particles in a loop
    let animationId;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => particle.update());
      animationId = requestAnimationFrame(animate);
    }
    animate();

    //for stopping a lopp and resizing 
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);

    }
  }, []);



  return (
    <canvas
      ref={canvaRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">

    </canvas>
  )
}
