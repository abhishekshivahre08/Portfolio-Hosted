import React, { useMemo } from 'react'
import { useState } from 'react'
import { useEffect, useRef } from 'react'
import img1 from "../assets/WanderStayDesk.webp"
import img2 from "../assets/vigyansetu.png"
import img3 from "../assets/abhiradesk.webp"
import photo1 from "../assets/WanderStay.webp"
import photo2 from "../assets/photo2.webp"
import photo3 from "../assets/abhira.io.webp"
import img4 from "../assets/stokepuls.webp"
import img5 from "../assets/ai-voice-desk.png"
import photo4 from "../assets/stokemobile.webp"
import photo5 from "../assets/Ai-voice.png"
import photo6 from "../assets/finaceos.png"
import img6 from "../assets/financeos_desktop.png"
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion'
import ParticlesBackground from '../Components/ParticlesBackground'


const useIsMobile = (query = '(max-width :639px)') => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.matchMedia(query).matches
  )

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(query);
    const handler = (e) => setIsMobile(e.matches);

    mql.addEventListener('change', handler);
    // setIsMobile(mql.matches);
    // i am a dev
    return () => mql.removeEventListener('change', handler)
  }, [query])
  return isMobile;
}




export default function Projects() {

  const isMobile = useIsMobile();
  const sceneRef = useRef(null);

  const projects = useMemo(
    () => [
      {
        title: "Abhira.io",
        link: "https://abhira-io.netlify.app/",
        bgColor: "#05091c",
        image: isMobile ? photo3 : img3,
      },
      {
        title: "StockPlus",
        link: "https://stockpulse0.netlify.app/",
        bgColor: "#180a45",
        image: isMobile ? photo4 : img4,
      },
      {
        title: "WanderStay",
        link: "https://wanderstay-6u90.onrender.com/listings",
        bgColor: "#1f1617",
        image: isMobile ? photo1 : img1, // use mobile or desktop image
      },

      {
        title: " Ai-virtual-assistant",
        link: "https://ai-virtual-asistent09.vercel.app/",
        bgColor: "#474a54",
        image: isMobile ? photo5 : img5,
      },

      {
        title: "FinanceOS",
        link: "https://finance-dashboard08.netlify.app/",
        bgColor: "#090a09",
        image: isMobile ? photo6 : img6,
      },

      {
        title: "VIGYAN SETU",
        link: "https://vigyan-seven.vercel.app/",
        bgColor: "#050505",
        image: isMobile ? photo2 : img2,
      },

    ],
    [isMobile] // re-run only when `isMobile` changes
  );

  // Scroll too change projects 
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"]
  });
  const thresholds = projects.map((_, i) => (i + 1) / projects.length);
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = thresholds.findIndex((threshold) => v <= threshold);
    setActiveIndex(idx === -1 ? thresholds.length - 1 : idx);
  });

  const activeProject = projects[activeIndex];

  return (
    < motion.section
      id="projects"
      ref={sceneRef}
      className='relative text-white'
      style={{
        height: `${100 * projects.length}vh`,
        backgroundColor: activeProject.bgColor,
        transition: "background-color 400ms ease"
      }}
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      // animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 2, delay: 0.1 }}>


      <div className="sticky top-0 h-screen flex flex-col items-center justify-center ">
        <motion.h2 className={`text-5xl font-semibold z-10 text-center ${isMobile ? "mt-4" : "mt-8"}`}
          style={{ fontFamily: 'Playfair Display, serif' }}
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          // animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 0.1 }}>
          My Projects
        </motion.h2>
        <div className={`relative w-full flex-1 flex items-center justify-center ${isMobile ? "-mt-4" : " "}`}>
          {projects.map((project, index) => (
            <div key={project.title}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${activeIndex === index ? "opacity-100 z-20" : "opacity-0 z-0 sm:z-10"}`}
              style={{ width: "85%", maxWidth: "1200px" }}>
              <AnimatePresence mode='wait'>
                {activeIndex === index && (
                  <motion.h3 key={project.title}
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`block text-center text-[clamp(2rem,6vw,5rem)] text-white/95 sm:absolute sm:-top-20 sm:left-[35%] lg:left-[-5%] sm:mb-0
             italic font-semibold ${isMobile ? "-mt-24" : ""}`}
                    style={{ zIndex: 5, textAlign: isMobile ? "center" : "left" }}
                  >
                    {project.title}
                  </motion.h3>
                )}
              </AnimatePresence>
              <div className={`relative w-full overflow-hidden bg-black/20 shadow-2xl
          md:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)${isMobile ? "mb-6 rounded-lg" : "mb-10 sm:mb-12 rounded-xl"}
          h-[62vh] sm:h-[66vh]`}
                style={{ zIndex: 10, transition: "box-shadow 250ms ease" }}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover drop-shadow-xl  md:drop-shadow-2xl"
                  style={{
                    position: "relative",
                    zIndex: 10,
                    filter: "drop-shadow(0,16px 40px rgba(0,0,0,0.65)",
                    transition: "filter 200ms ease",
                  }}
                  loading='lazy' />
                <div className='pointer-events-none absolute inset-0'
                  style={{
                    zIndex: 11,
                    background: "linear-gradient(180deg,rgba(0,0,0,0.12) 0%, rgba(0,0,0,0) 40%)"
                  }}>

                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={`absolute ${isMobile ? "bottom-20" : "bottom-15"}`}>
          <a href={activeProject?.link}
            target='_blank'
            rel="noopener noreferrer"
            className='inline-block px-6 py-3 font-semibold rounded-lg bg-white text-black hover:bg-gray-200 transition-all'
            aria-label={`View ${activeProject?.title}`}
          >View Project</a>
        </div>
        {/* Scroll animation */}
        <div className="flex flex-col items-center gap-1 h-14">
          <div className="w-[20px] h-[32px] rounded-full border-2 border-white/40 flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2 bg-white/60 rounded-full"
            />
          </div>
          <span className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-medium">Scroll</span>
        </div>

      </div>

    </motion.section>
  )
}
