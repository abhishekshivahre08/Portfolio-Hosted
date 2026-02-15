
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import ParticlesBackground from '../Components/ParticlesBackground';

// Swiper Styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Image Imports - Yahan aap apni nayi images import karein
import DefaultCert from '../assets/Portfoio certificate.png';
import JSCertImage from '../assets/javaScript.png';
// import JavaCert from '../assets/java-cert.png'; // Example for new image

const certifications = [
  { 
    title: "Programing in JavaScript", 
    org: "Infosys Springboard", 
    date: "Jun 2025", 
    color: "#ff9900", 
    particleColor: "#ff9900", 
    link: "https://drive.google.com/file/d/1lPUnJwf7bMD-Q7gwjtdtkHTNgr9ybyeW/view?usp=sharing",
    img: DefaultCert, // Yahan image variable badal sakte hain
  },
  { 
    title: "Programing in Java", 
    org: "Infosys Springboard", 
    date: "Jun 2025", 
    color: "#00d8ff", 
    particleColor: "#00d8ff", 
    link: "https://drive.google.com/file/d/1EVgDs49DJUrNkkoVnge-KQ8mYKnlOCLU/view?usp=sharing",
    img: DefaultCert,
  },
  { 
    title: "Full Stack Developer", 
    org: "Apna College", 
    date: "December 2025", 
    color: "#4285f4", 
    particleColor: "#4285f4", 
    link: "https://drive.google.com/file/d/1FMQDvD3Yra1e1oUnMVt-uqX9coahcfLm/view?usp=sharing",
    img: DefaultCert 
  },
  { 
    title: "ZTCA Global Certificate", 
    org: "Zscaler Academy", 
    date: "Sep 2024", 
    color: "#ed1c24", 
    particleColor: "#ed1c24", 
    link: "https://drive.google.com/file/d/1VfM1qB6TgEz4yTzcot0evUdtq2C4KEe1/view?usp=sharing",
    img: DefaultCert 
  },
  { 
    title: "Database Management System", 
    org: "Infosys Springboard", 
    date: "Nov 2025", 
    color: "#f7df1e", 
    particleColor: "#f7df1e", 
    link: "https://drive.google.com/file/d/1MRvvOJjDQAU9922uDFOgnLZnF0INeEo7/view?usp=sharing",
    img: DefaultCert 
  },
  { 
    title: "GEN-AI", 
    org: "AWS Academy", 
    date: "March 2025", 
    color: "#cf5fe3", 
    particleColor: "#cf5fe3", 
    link: "https://drive.google.com/file/d/1RAkP7M-AAEhCV9naMcX1cRfHAWaqlrF6/view?usp=sharing",
    img: DefaultCert 
  },
];

const Particles = ({ color }) => {
  const p = Array.from({ length: 18 });
  return (
    <>
      {p.map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: (Math.random() - 0.5) * 500,
            y: (Math.random() - 0.7) * 400,
            opacity: 0,
            scale: 0.1
          }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: color,
            zIndex: 10,
            pointerEvents: 'none',
            boxShadow: `0 0 20px ${color}, 0 0 40px ${color}`,
            filter: 'blur(1px)'
          }}
        />
      ))}
    </>
  );
};

const CertificationSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Automatic Cycle for Mobile (Bina tap kiye card upar aane ke liye)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % certifications.length);
    }, 3000); // Har 3 second mein agla card upar aayega
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      id="certification"
      style={{ position: 'relative', background: '#020617', padding: '60px 0', minHeight: '100vh', overflow: 'hidden', fontFamily: 'Inter, sans-serif' }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
        <ParticlesBackground />
      </div>

      {/* HEADER */}
      <div style={{ textAlign: 'center', marginBottom: '10px', position: 'relative', zIndex: 1 }}>
        <motion.h1
          style={{ color: '#ffffff', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: '800', marginBottom: '10px', fontFamily: 'Playfair Display, serif' }}
        >
          Premium Certificates
        </motion.h1>
        <motion.p style={{ color: "#b7abd6", fontSize: '15px', maxWidth: '650px', margin: '0 auto', fontFamily: 'Playfair Display, serif' }}>
          Explore my verified credentials — automated reveal for a seamless experience.
        </motion.p>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={40}
        slidesPerView={1}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        style={{ maxWidth: '1400px', margin: 'auto', padding: '100px 30px', overflow: 'visible' }}
      >
        {certifications.map((cert, index) => {
          // Logic: Desktop par hover, Mobile par automatic activeIndex
          const isRevealed = hoveredIndex === index || activeIndex === index;

          return (
            <SwiperSlide key={index} style={{ overflow: 'visible' }}>
              <motion.div
                onMouseEnter={() => { setHoveredIndex(index); setActiveIndex(null); }}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ position: 'relative', height: '480px', cursor: 'pointer' }}
              >
                <AnimatePresence>
                  {isRevealed && <Particles color={cert.particleColor} />}
                </AnimatePresence>

                {/* FLOATING CERTIFICATE - Isme har card ki apni img aayegi */}
                <motion.div
                  animate={isRevealed ? "hover" : "rest"}
                  variants={{
                    rest: { y: 40, x: '-50%', rotate: 0, opacity: 0.6, scale: 0.9 },
                    hover: { y: -120, x: '-50%', rotate: -5, opacity: 1, scale: 1.1 }
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  style={{
                    position: 'absolute',
                    top: '0',
                    left: '50%',
                    width: '90%',
                    height: '240px',
                    zIndex: 1,
                    borderRadius: '16px',
                    background: '#fff',
                    boxShadow: `0 30px 60px -12px rgba(0, 0, 0, 0.8)`,
                    overflow: 'hidden',
                    border: `4px solid ${cert.color}`
                  }}
                >
                  <img src={cert.img} alt={cert.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </motion.div>

                {/* CARD BODY */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  width: '100%',
                  height: '380px',
                  background: 'rgba(15, 23, 42, 0.8)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '32px',
                  zIndex: 2,
                  overflow: 'hidden',
                  border: `1px solid ${cert.color}44`,
                  boxShadow: isRevealed ? `0 0 40px ${cert.color}33` : '0 20px 50px rgba(0,0,0,0.5)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.4s ease'
                }}>
                  <div style={{
                    height: '140px',
                    width: '100%',
                    background: `linear-gradient(to bottom, ${cert.color}33, transparent)`,
                    clipPath: 'ellipse(110% 60% at 50% 0%)',
                    borderBottom: `1px solid ${cert.color}66`
                  }}></div>

                  <div style={{ padding: '0 25px 35px', textAlign: 'center', color: 'white', flex: 1, display: 'flex', flexDirection: 'column', marginTop: '-30px' }}>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: '900', marginBottom: '15px', color: '#f8fafc', fontFamily: 'Playfair Display, serif' }}>
                      {cert.title}
                    </h3>
                    <div style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <span style={{ color: cert.color, fontWeight: '700', textTransform: 'uppercase', fontFamily: 'Playfair Display, serif' }}>{cert.org}</span>
                      <span style={{ opacity: 0.7 }}>Issued: {cert.date}</span>
                    </div>

                    <motion.button
                      onClick={(e) => { e.stopPropagation(); window.open(cert.link, "_blank"); }}
                      whileHover={{ scale: 1.05, backgroundColor: cert.color }}
                      style={{
                        marginTop: 'auto',
                        padding: '14px',
                        borderRadius: '16px',
                        border: `2px solid ${cert.color}`,
                        background: 'transparent',
                        color: 'white',
                        fontWeight: '800',
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        fontFamily: 'Playfair Display, serif'
                      }}
                    >
                      View Credential
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <style>{`
        .swiper-button-next:after, .swiper-button-prev:after { font-size: 20px !important; }
        .swiper-button-next, .swiper-button-prev { 
            background: rgba(255,255,255,0.05); 
            width: 50px !important; height: 50px !important; 
            border-radius: 50%; border: 1px solid rgba(255,255,255,0.1);
            color: white !important;
            z-index: 10;
        }
        .swiper-pagination-bullet { background: #334155 !important; opacity: 1; }
        .swiper-pagination-bullet-active { background: #38bdf8 !important; width: 35px !important; border-radius: 10px !important; }
      `}</style>
    </motion.div>
  );
};

export default CertificationSection;


