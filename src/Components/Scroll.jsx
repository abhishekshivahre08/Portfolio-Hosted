// import moduleName from 'module';
// import { motion } from "framer-motion";



// function Scroll() {
//     return (
//         <motion.div animate={{ y: [0, 10, 0] }}
//             transition={{ duration: 2, repeat: Infinity }}
//             className="absolute bottom-10  left-1/2 transform -translate-x-1/2">
//             <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
//             <motion.div animate={{ y: [0, 12, 0] }}
//             transition={{ duration: 1.5, repeat: Infinity }}
//             className="w-1 h-3 bg-white/50 rounded-full mt-2"/>
//             </div>
//         </motion.div>
//     );
// }

// export default Scroll;



// import { motion } from "framer-motion";

// function Scroll() {
//     return (
//         <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1 }}
//             className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-20"
//         >
//             {/* Outer Mouse Shape with Glow */}
//             <div className="w-[30px] h-[50px] rounded-full border-2 border-white/20 flex justify-center p-1 backdrop-blur-sm bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                
//                 {/* Scrolling Dot with Glow effect */}
//                 <motion.div 
//                     animate={{ 
//                         y: [0, 20, 0],
//                         opacity: [0, 1, 0] 
//                     }}
//                     transition={{ 
//                         duration: 2, 
//                         repeat: Infinity,
//                         ease: "easeInOut"
//                     }}
//                     className="w-1.5 h-3 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full shadow-[0_0_8px_#22d3ee]"
//                 />
//             </div>

//             {/* Optional: Small Text below icon */}
//             <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium mt-1">
//                 Scroll
//             </span>
//         </motion.div>
//     );
// }

// export default Scroll;

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

// Particle component with custom color burst
const Particle = ({ color, angle, id }) => {
  return (
    <motion.div
      key={id}
      initial={{ 
        x: 0, 
        y: 0, 
        opacity: 0, 
        scale: 0.8 // Start small
      }}
      animate={{ 
        // Particle moves outward based on angle and burst distance
        x: Math.cos(angle) * 150, // Explosion radius
        y: Math.sin(angle) * 150, 
        opacity: [0, 1, 0], // Burst fade out
        scale: [1, 1.2, 0] // Burst and fade scale out
      }}
      transition={{ 
        duration: 2, 
        delay: Math.random() * 0.5, // Randomize spawn delay within the burst
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 0.5 // Add delay between bursts
      }}
      className={`absolute w-3 h-3 rounded-full ${color}`}
    />
  );
};

// Burst colors
const burstColors = [
  "from-blue-400 to-cyan-500",
  "from-green-400 to-lime-500",
  "from-red-400 to-orange-500",
  "from-purple-400 to-pink-500",
  "from-amber-400 to-yellow-500",
  "from-sky-400 to-indigo-500"
];

function Scroll() {
  const [particles, setParticles] = useState([]);

  // Burst logic with timer
  useEffect(() => {
    // Generate particles on each burst (every 2.5 seconds)
    const burstCount = 12; // Number of particles per burst
    const burstId = Date.now(); // Unique ID for each burst

    const generateBurst = () => {
      setParticles(prev => [
        ...prev, 
        ...Array.from({ length: burstCount }).map((_, i) => ({
          id: `${burstId}-${i}`, // Unique particle ID
          angle: (360 / burstCount) * i, // Angle in degrees
          color: `bg-gradient-to-r ${burstColors[Math.floor(Math.random() * burstColors.length)]}`, // Random color
          burstId: burstId // Unique ID for each burst
        }))
      ]);
      // Remove old particles after the burst to save memory
      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.burstId !== burstId));
      }, 3000); // Wait for the whole burst to complete (fade out + repeatDelay)
    };

    // First burst
    generateBurst();

    // Repeat burst every 2.5 seconds
    const intervalId = setInterval(generateBurst, 2500); // 2.5 seconds timer

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-30"
    >
      {/* Outer Mouse Shape with Glow and Particle Burst Source */}
      <div className="relative w-[30px] h-[50px] rounded-full border-2 border-white/20 flex justify-center p-1 backdrop-blur-sm bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
        
        {/* The Particle Burst */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <AnimatePresence>
            {particles.map((particle) => (
              <Particle {...particle} />
            ))}
          </AnimatePresence>
        </div>

        {/* The Scrolling Dot (Main Indicator) with Glow */}
        <motion.div 
          animate={{ 
            y: [0, 20, 0],
            opacity: [0, 1, 0] 
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-1.5 h-3 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full shadow-[0_0_8px_#22d3ee]"
        />
      
      </div>

      {/* Optional: Small Text below icon */}
      <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium mt-1">
        Scroll
      </span>
    </motion.div>
  );
}

export default Scroll;