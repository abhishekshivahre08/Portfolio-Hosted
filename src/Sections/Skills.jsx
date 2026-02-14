import React from 'react';
import { FaJava,} from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiFastapi, SiPython, SiDocker, SiKubernetes, SiMongodb,  } from "react-icons/si";

import { 
  
  SiExpress, 
  SiReact, 
  SiNodedotjs, 
  SiJavascript, 
  SiRedux, 
  SiMui,
  SiNetlify, SiRender,
  SiFigma,
  
  SiBootstrap, 
  SiHtml5, 
  SiCss3, 
  SiPostman, 
  SiGit, 
  SiGithub, 
  SiVercel, 
  SiJsonwebtokens, 
  SiFirebase ,
  SiHoppscotch
} from 'react-icons/si';
import { color, motion, useMotionValue } from 'framer-motion';
import {  useEffect, useRef, useState } from 'react';



export default function Skills() {


  const skills = [
    { icon: <FaJava />, name: "Java",color:"#ED8B00" },
    
    { icon: <SiNextdotjs />, name: "Next.js", color: "#000000" },
    { icon: <SiTypescript />, name: "TypeScript", color:"#3178C6" },
  
    { icon: <SiFastapi />, name: "FastAPI",color:"#05998B" },
    { icon: <SiPython />, name: "Python" ,color:"#3776AB" },
    { icon: <SiDocker />, name: "Docker", color: "#2496ED" },
    { icon: <SiKubernetes />, name: "Kubernetes", color: "#326CE5" },
  
  
   
    // { icon: <SiAngular />, name: "Angular" },
    { icon: <SiMongodb />, name: "MongoDB", color: "#47A248" },
  { icon: <SiExpress />, name: "Express.js", color: "#ffffff" }, // Dark theme par white best hai
  { icon: <SiReact />, name: "React.js", color: "#61DAFB" },
  { icon: <SiNodedotjs />, name: "Node.js", color: "#339933" },

  // Frontend & Styling
  { icon: <SiFigma />, name: "Figma", color: "#F24E1E" },
  { icon: <SiJavascript />, name: "JavaScript", color: "#F7DF1E" },
  { icon: <SiRedux />, name: "Redux", color: "#764ABC" },
  { icon: <SiTailwindcss />, name: "Tailwind CSS", color: "#06B6D4" },
  { icon: <SiBootstrap />, name: "Bootstrap", color: "#7952B3" },
  { icon: <SiHtml5 />, name: "HTML5", color: "#E34F26" },
  { icon: <SiCss3 />, name: "CSS3", color: "#1572B6" },
  { icon: <SiMui />, name: "Material UI", color: "#007FFF" },

  // Auth & Database
  { icon: <SiJsonwebtokens />, name: "JWT", color: "#FB015B" },
  { icon: <SiFirebase />, name: "Firebase", color: "#FFCA28" },

  // Tools & Deployment
  { icon: <SiHoppscotch />, name: "Hoppscotch", color: "#31C48D" },
  { icon: <SiPostman />, name: "Postman", color: "#FF6C37" },
  { icon: <SiGit />, name: "Git", color: "#F05032" },
  { icon: <SiGithub />, name: "GitHub", color: "#ffffff" },
  { icon: <SiVercel />, name: "Vercel", color: "#0070f3" },
  { icon: <SiNetlify />, name: "Netlify", color: "#00C7B7" },
  { icon: <SiRender />, name: "Render", color: "#46E3B7" },
  ];
  const repetedskills = [...skills, ...skills]; // Duplicate the skills array for infinite scrolling

  // icons moving animation
  //  for or moving icons right to left
  const [dir, setdir] = useState(-1); 
  const[active , setactive] = useState(false);
  const sectionRef = useRef(null);
  const tracRef = useRef(null);
  const touchY = useRef(null);
  const x =useMotionValue(0);

  // craring animation for icons moving right to left
  useEffect(() =>{
    const el = sectionRef.current;
    if(!el) return;
    const io = new IntersectionObserver(([entry]) => {
      setactive(entry.isIntersecting && entry.intersectionRatio > 0.1);
    }, {threshold:0.1});
    io.observe(el);
    return () => io.disconnect();
},[]);

// scrolloing animation  icons based on oper se niche scrolling
useEffect(() => {
  if(!active) return;
  const onWheel = (e) => setdir(e.deltaY > 0 ? -1 : 1);
  const onTouchStart = (e) => (touchY.current = e.touches[0].clientY);
  const onTouchMove = (e) => {
    if (touchY.current == null) return;
    const delta = e.touches[0].clientY - touchY.current;
    setdir(delta > 0 ? 1 : -1);
    touchY.current = e.touches[0].clientY;
  };
  window.addEventListener("wheel", onWheel, { passive: true });
  window.addEventListener("touchstart", onTouchStart , { passive:true });
  window.addEventListener("touchmove", onTouchMove , { passive: true });

  return () => {
    window.removeEventListener("wheel", onWheel);
    window.removeEventListener("touchstart", onTouchStart);
    window.removeEventListener("touchmove", onTouchMove);
  }
},[active])

// moving icons right to left
useEffect(() => {
  let id;
  let last = performance.now();
  const speed = 80;

  const tick = (now) => {
    const dt = (now - last) / 1000; 
    last = now;
    let next = x.get() + speed * dir * dt;
    const loop = tracRef.current?.scrollWidth/2 || 0;
    if(loop){
      if (next <= -loop) next += loop;
       if (next >= 0) next -= loop;
    }
    x.set(next);
      id = requestAnimationFrame(tick);
  }
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
},[dir,x]);

  return (
    <section id='skills'
    ref={sectionRef}
     className='h-1/2 w-full pb-8 flex flex-col
 items-center justify-center relative bg-black text-white overflow-hidden'>
  {/* glowing animation */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className=" absolute rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] animate-pulse  top-1/4 left-0 w-[300px] h-[300px] opacity-20 blur-[120px] " />
        <div className=" absolute rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] animate-pulse  bottom-1/4 right-0 w-[300px] h-[300px] opacity-20 blur-[120px] " />
      </div>
       {/* glowing animation */}

       <motion.h2
       className='text-4xl mt-5 sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] z-10'
        initial={{ opacity: 0, y: -30 }}
        whileInView={{opacity:1, y:0}}
        // animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, delay: 0.1 }}
       >
        My Skills
       </motion.h2>
       <motion.p className='mt-2 mb-8 text-white/90 text-base sm:text-lg z-10'
        initial={{ opacity: 0, y: -10 }}
        whileInView={{opacity:1, y:0}}
         transition={{ duration: 1, delay: 0.1 }}
       >
        Modern Application | Modern Technologies
       </motion.p>
{/* displaing animating items  */}
       <div className=" relative w-full overflow-hidden" > 
< motion.div
 ref={tracRef}
  className='flex gap-10 text-6xl '
   style={{x, whiteSpace: "nowrap ", willChange: "transform"}}
  >
   
    
{ repetedskills.map((skill, index) => (
<div key={index} 
className = "flex flex-col items-center gap-2 min-w-[120px]"
 aria-label = {skill.name}
title={skill.name}>
  
  {/* <span className="hover:scale-125 transition-transform duration-300">
     {skill.icon}
  </span> */}

  <span className="hover:scale-125 transition-all duration-300 flex items-center justify-center cursor-pointer">
              {/* React.cloneElement se hum icon ke andar color prop inject kar rahe hain */}
              {React.cloneElement(skill.icon, { 
                style: { 
                  color: skill.color,
                  // Optional: Halki si glow dene ke liye niche wala filter use karein
                  filter: `drop-shadow(0 0 5px ${skill.color}33)` 
                } 
              })}
            </span>
  <p className='text-sm'>
    {skill.name}
  </p>
 
</div>
))};
  </motion.div>
       </div>
    </section>
  )
}
