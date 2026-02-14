
import React, { useState } from 'react';
import m1 from "../assets/m1.PNG";
import m2 from "../assets/naveen.webp";
import w1 from "../assets/w1.PNG";
import w2 from "../assets/khusboo1.webp";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  { name: "Yash Sahu", role: "Software Engineer at HCL Technologies", review: "Abhishek is a visionary developer. His attention to detail and creativity blew us away. Our project was a massive success because of him.", image: m1 },
  { name: "Heather Forster", role: "UI/UX Designer at PixelWorks", review: "Working with Abhishek was an absolute pleasure. He brings design and code together like magic. Highly recommend him!", image: w1 },
  { name: "Naveen Bagri", role: "Tech Manager at CodeEmpire", review: "From concept to execution, Abhishek handled everything flawlessly. His work ethic and innovation are unmatched.", image: m2 },
  { name: "Khushboo Sharma", role: "CTO at Innovate Labs", review: "Abhishek transformed our outdated platform into something modern and powerful. His skills are world-class.", image: w2 },
];


const CardParticles = () => {
  const particles = Array.from({ length: 20 });
  return (
    <>
      {particles.map((_, i) => (
        <motion.div
        
          key={i}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: (Math.random() - 0.5) * 450, y: (Math.random() - 0.5) * 450, opacity: 0, scale: 0.1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '15px',
            height: '15px',
            borderRadius: '50%',
            backgroundColor: '#3b82f6',
            zIndex: 1,
            pointerEvents: 'none',
            boxShadow: '0 0 25px #3b82f6, 0 0 45px #1e40af',
          }}
        />
      ))}
    </>
  );
};

export default function Testimonials() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id='testimonials' className='relative min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center px-6 py-20 overflow-hidden'>
      
      {/* --- BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ x: [0, 100, -100, 0], y: [0, -50, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ x: [0, -150, 150, 0], y: [0, 100, -100, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[150px]" 
        />
        <div className="absolute inset-0 opacity-20" 
          style={{ 
            backgroundImage: `linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(circle, black, transparent 80%)'
          }}>
        </div>
      </div>

      {/* SPACE REDUCED HERE: mb-20 ko mb-10 kiya gaya hai */}
      <motion.h2 className='text-5xl font-extrabold mb-10 text-center w-full relative z-10'
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}>
        What <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">People</span> Say.
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl w-full mx-auto relative z-10">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            className='relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center transition-all duration-500 cursor-pointer group'
            style={{
               boxShadow: '0 20px 40px -15px rgba(59, 130, 246, 0.3), 0 10px 20px -10px rgba(139, 92, 246, 0.2)'
            }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ 
              y: -10, 
              scale: 1.02,
              boxShadow: '0 30px 60px -15px rgba(59, 130, 246, 0.6), 0 15px 40px -10px rgba(139, 92, 246, 0.4)',
              borderColor: 'rgba(59, 130, 246, 0.4)'
            }}
            viewport={{ once: true }}
          >
            <AnimatePresence>
              {hoveredIndex === i && <CardParticles />}
            </AnimatePresence>

            <div className="relative mb-6">
              <div className="absolute -inset-2 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="w-28 h-28 rounded-full border-2 border-white/20 overflow-hidden relative z-10">
              <img 
                src={t.image} 
                alt={t.name} 
                className='w-28 h-28 rounded-full border-2 border-white/20 object-cover object-top  antialiased transform-gpu scale-100 relative z-10' 
              />
              </div>
            </div>

            <div className="relative z-20">
              <p className="text-gray-300 text-lg italic mb-6 leading-relaxed">"{t.review}"</p>
              <h3 className="text-2xl font-bold text-white">{t.name}</h3>
              <p className="text-sm text-blue-400 font-bold uppercase tracking-[0.2em] mt-2">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}