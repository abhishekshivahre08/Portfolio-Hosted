import React from 'react'
import { motion } from "framer-motion";
import p from "../assets/p.png";
import p2 from "../assets/p2.png";
import ParticlesBackground from '../Components/ParticlesBackground'
import ProfileCard from './ProfileCard'



export default function About() {
  const glows = [
    "-top-10 -left-10 w-[360px] h-[360px] opacity-20 blur-[120px]",
    "bottom-0 right-10 w-[420px] h-[420px] opacity-15 blur-[140px] delay-300",
    "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] opacity-10 blur-[100px]",
  ]

  // cards Array
  const stats = [
    { label: "Experience", value: "1+ years" },
    { label: "Speciality", value: "Full Stack Development" },
    { label: "Focus", value: "Performance & Scalability" },


  ]




  return (
     
    <section id="about"
      className='min-h-screen w-full flex items-center justify-center relative bg-black text-white overflow-hidden'>
         <ParticlesBackground />
         
      <div className='absolute inset-0 pointer-events-none'>
        {glows.map((c, i) => (
          <div key={i} className={`absolute rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] animate-pulse ${c}`} />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-10 lg:px-12 py-20 flex flex-col gap-12  ">
        <motion.div className="flex flex-col md:flex-row item-center md:items-stretch gap-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          {/* <motion.div className='relative w-[160px] h-[160px] md:w-[200px] md:h-[200px] 
rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#1cd8d2]/20 to-[#302b63]/20 border border-[#1cd8d2]'
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, duamping: 18 }}

          >
            {/* <img src={p} alt="profile" className='absolute inset-0' /> */}
           
          {/* </motion.div> */} 
           <ProfileCard avatarUrl={p} miniAvatarUrl={p2} name="Abhishek" title="Developer" handle="abhishek" behindGlowEnabled={false} />

          <div className='flex-1 flex  flex-col justify-center text-center md:text-left'>
            <h2 className='text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent 
  bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#1cd8d2] ' style={{fontFamily: 'Playfair Display, serif'}}>
              Abhishek Shivhare
            </h2>
            <p className='mt-2 text-lg sm:text-xl text-white/90 font-semibold' style={{fontFamily: 'Playfair Display, serif'}}>
              Full Stack Developer
            </p>
            <p className='mt-4 text-gray-300 leading-relaxed text-base sm:text-lg max-w-2xl md:max-w-3xl ' style={{fontFamily: 'Playfair Display, serif'}}>
              I build scalble, modern application with a strong focus on clean architecture,
              <br />
              delightful UX, and performance. My toolkit spans Java, React,JavaScript,
              Tailwind CSS and RestfulAPI- bringing ideas to life from concept to production with robust APIS <br />
              and smooth interfaces.
            </p>
            <div className='mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xl '>
              {stats.map((item, i) => (
                <motion.div key={i} className='rounded-xl border border-white bg-white/5 px-4 py-3 text-center hover:bg-black cursor-pointer'
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  // transition={{ delay: 0.05 * i, duration: 0.4 }}
                  viewport={{ once: true, amount: 0.3 }}
                     whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 18,delay: 0.05 * i, duration: 0.4  }}
                >
                  <div className='text-sm text-gray-400' style={{fontFamily: 'Playfair Display, serif'}}>
                    {item.label}
                  </div>
                  <div className='text-base font-semibold 'style={{fontFamily: 'Playfair Display, serif'}}>
                    {item.value}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className='mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start'>
              <a href="#projects" className='inline-flex items-center justify-center rounded-lg bg-white text-black font-semibold px-5 py-3 hover:bg-gray-200 transition  '>View Projects</a>
              <a href="#contact" className='inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white font-semibold  px-5 py-3 hover:bg-black transition'>Get in Touch </a>
            </div>

          </div>
        </motion.div>
        <motion.div className='text-center md:text-left '
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <h3 className='text-2xl sm:text-3xl font-bold text-white mb-3' style={{fontFamily: 'Playfair Display, serif'}}>
            About me
          </h3>

          <p className='text-gray-300 leading-relaxed text-base sm:text-lg' style={{fontFamily: 'Playfair Display, serif'}}>
            I am a B.Tech Computer Science student with a strong passion for building scalable web applications and I build high-performance, scalable web applications with a strong focus on clean code, performance optimization, and intuitive UX. My toolkit spans Java, React.js, Node.js, and MongoDB —bringing complex ideas like real-time civic systems and educational platforms to life. Whether I'm leading a technical team or solving complex DSA challenges,
          </p>
          <p className='mt-2 text-gray-400 leading-relaxed text-base sm:text-lg'>
            I am dedicated to bridging the gap between robust backend architecture and smooth, responsive interfaces.
            
          </p>

        </motion.div>
      </div>
    </section>
  )
}

