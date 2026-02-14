import Navbar from "./Components/Navbar";
import About from "./Sections/About";
import Contact from "./Sections/Contact";
import Experience from "./Sections/Experience";
import Footer from "./Sections/Footer";
import Home from "./Sections/Home";
import Projects from "./Sections/Projects";
import Skills from "./Sections/Skills";
import Testimonials from "./Sections/Testimonials";
import React from "react";
import IntroAnimation from "./Components/IntroAnimation";
import CustomCursor from "./Components/CustomCursor";
import CertificationSection from './Sections/CertificationSection';





function App() {
  const [introdone, setIntrodone] = React.useState(false);
  
  return (

    <>
      {/* <canvas id="canvas"></canvas> */}
      {!introdone && <IntroAnimation onFinish={() => setIntrodone(true)} />}
      {introdone && (
        <div className="relative gradient text-white w-full">

          <CustomCursor/>
        
          <Navbar />
          <Home />
          <About />
          <Skills />
          <Projects />
          <Experience />
            <CertificationSection/>
          <Testimonials />
          <Contact />
          <Footer />

        </div>
      )}
    </>
  )
}

export default App;
