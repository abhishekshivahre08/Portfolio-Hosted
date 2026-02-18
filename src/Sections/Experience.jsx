import React from 'react'
import { motion, useTransform } from 'framer-motion'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useScroll } from 'framer-motion';
import { useMemo } from 'react';
import ParticlesBackground from '../Components/ParticlesBackground';




const experiences = [
  {
    role: "Web Developer",
    company: "Brain Mentors",
    duration: "2025",
    description: "Built high-performance apps, integrated AI features, improved engagement by 10%.",
  },
  {
    role: "Web Developer Intern",
    company: "Mobisoft Technologies",
    duration: "2025",
    description: "Gained hands-on web development experience.",
  },
  {
    role: "Graduate Engineer",
    company: "",
    duration: "2025",
    description: "Built frontend of GenAI-powered PV Intake App with Next.js & TS for US client.",
  },
];

function ExperienceItem({ exp, idx, start, end, scrollYProgress, layout }) {
  const scale = useTransform(scrollYProgress, [start, end], [0, 1])
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1])
  const y = useTransform(scrollYProgress, [start, end], [idx % 2 === 0 ? 30 : -30, 0])
  const x = useTransform(scrollYProgress, [start, end], [-24, 0])

  if (layout === 'desktop') {
    return (
      <div className='relative flex flex-1 justify-center items-center min-w-0'>
        <motion.div className='z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.1)]'
          style={{ scale, opacity, y, x }}>

        </motion.div>
        <motion.div className={`absolute ${idx % 2 === 0 ? "-top-3" : "-bottom-5"} w-[3px] bg-white/40`}
          style={{ height: 40, opacity }}>
          <motion.article className={`absolute ${idx % 2 === 0 ? "-bottom-0" : "top-0"} 
           bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-7 w-[320px] shadow-lg`}
            style={{ opacity, y, maxWidth: "90vw" }}
            transition={{ duration: 0.4, delay: idx * 0.15 }}>
            <h3 className='text-xl font-semibold'>
              {exp.role}
            </h3>
            <p className='text-md text-gray-400 mb-3'>
              {exp.company} | {exp.duration}
            </p>
            <p className='text-md text-gray-300 break-words'>
              {exp.description}
            </p>
          </motion.article>
        </motion.div>
      </div>
    )
  }

  return (
    <div className='relative flex items-start'>
      <motion.div className='absolute -left-[14px] top-3 z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.1)]'
        style={{ scale, opacity }}>
      </motion.div>
      <motion.article className='bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-5 w-[90vw]
max-w-sm ml-6 shadow-lg'
        style={{
          opacity, x
        }}
        transition={{ duration: 0.4, delay: idx * 0.15 }}
      >
        <h3 className='text-lg font-semibold break-words'>
          {exp.role}
        </h3>
        <p className='text-sm text-gray-400 mb-2 break-words'>
          {exp.company} | {exp.duration}
        </p>
        <p className='text-sm text-gray-300 break-words'>
          {exp.description}
        </p>

      </motion.article>


    </div>
  )
};

export default function Experience() {
  const sceneRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);


  useEffect(() => {
    const chekMobile = () => setIsMobile(window.innerWidth < 768);
    chekMobile();
    window.addEventListener("resize", chekMobile)
    return () => window.removeEventListener("resize", chekMobile)
  }, [])

  const SCENE_HEIGHT_VH = isMobile ? 160 * experiences.length : 120 * experiences.length;

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"]
  })

  const thresholds = useMemo(() => experiences.map((_, i) => (i + 1) / experiences.length), [])
  const lineSize = useTransform(scrollYProgress, (v) => `${v * 100}%`)


  return (
    
   
   
    <section id='experience' className='relative bg-black text-white'>
     <div className="sticky top-0 h-screen w-fulloverflow-hidden pointer-events-none">
        <div className="absolute inset-0">
          <ParticlesBackground />
        </div>
      </div>
     
      <div ref={sceneRef}
        style={{ height: `${SCENE_HEIGHT_VH}vh`, minHeight: "120vh" }}
        className='relative z-10 -mt-[100vh]'>
        <div className='sticky top-0 h-screen flex flex-col'>
          <h2 className='text-4xl sm:text-5xl font-semibold mt-5 text-center' style={{ fontFamily: 'Playfair Display, serif' }}>Experience</h2>
          <div className='flex flex-1 items-center justify-center px-5 pb-10'>
            {!isMobile && (
              <div className='relative w-full max-w-7xl'>
                <div className="relative h-[6px] bg-white/15 rounded">
                  <motion.div
                    className="absolute left-0 top-0  h-[6px] bg-amber-300 rounded origin-left"
                    style={{ width: lineSize }}>
                  </motion.div>
                </div>
                <div className='relative flex justify-between mt-0'>
                  {experiences.map((exp, idx) => (
                    <ExperienceItem
                      key={idx}
                      exp={exp}
                      idx={idx}
                      start={idx === 0 ? 0 : thresholds[idx - 1]}
                      end={thresholds[idx]}
                      scrollYProgress={scrollYProgress}
                      layout='desktop'
                    />
                  ))}

                </div>

              </div>
            )}
            {isMobile && (
              <div className='relative w-full max-w-md'>
                <div className='absolute left-0 top-0 bottom-0 w-[6px] bg-white/15 rounded'>
                  <motion.div className='absolute top-0 left-0 w-[6px] bg-amber-600 rounded origin-top'
                    style={{ height: lineSize }}>

                  </motion.div>
                </div>
                <div className='relative flex flex-col gap-10 ml-10 mt-6 pb-28'>
                  {experiences.map((exp, idx) => (
                    <ExperienceItem
                      key={idx}
                      exp={exp}
                      idx={idx}
                      start={idx === 0 ? 0 : thresholds[idx - 1]}
                      end={thresholds[idx]}
                      scrollYProgress={scrollYProgress}
                      layout='mobile'
                    />
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
     
  )
}
