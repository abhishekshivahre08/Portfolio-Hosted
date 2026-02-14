import React from 'react'
import { useState } from 'react';
import emailjs from "@emailjs/browser";
import ParticalesBackground from "../Components/ParticlesBackground";
import { motion } from "framer-motion";
import Astra from "../assets/Astra.webp";
import confetti from 'canvas-confetti';

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;



export default function Contact() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    budget: "",
    idea: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "budget" && value && !/^\d+$/.test(value)) return;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  }

  const validateForm = () => {
    const required = ["name", "email", "service", "idea"];
    const newErrors = {};
    required.forEach((f) => !formData[f].trim() && (newErrors[f] = "Fill this field"));
    if (formData.service !== "other" && !formData.budget.trim())
      newErrors.budget = "Fill this field";
    setErrors(newErrors);
    return !Object.keys(newErrors).length;
  }

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setStatus("sending");

    // console.log("Service ID:", SERVICE_ID);
    // console.log("Public Key:", PUBLIC_KEY);

    // if (!SERVICE_ID || !PUBLIC_KEY) {
    //     alert("Environment variables load nahi huye! Terminal restart karein.");
    //     return;
    // }

    try {
       const result = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          ...formData,
          form_name: formData.name,
          reply_to: formData.email,
        },
        PUBLIC_KEY

      );

      // Confetti burst effect
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2563eb', '#ffffff', '#60a5fa']
      });
      console.log("Success:", result.text);
      setStatus("success");
      setShowModal(true);
      setFormData({
        name: "",
        email: "",
        service: "",
        budget: "",
        idea: "",
      });
      // 5 second baad modal apne aap band ho jaye
      setTimeout(() => setShowModal(false), 5000);
    } catch (err) {
      console.log("EmailJs Error :", err);
      setStatus("error");
    }
  }
  return (
    <section id='contact'
      className='w-full min-h-screen relative
  bg-black overflow-hidden text-white py-20 px-6 md:px-20 flex flex-col
  md:flex-row items-center gap-10'>
      <ParticalesBackground />
     

      <div className='relative z-10 w-full flex flex-col md:flex-row items-center gap-10'>
        <motion.div
          className='w-full md:w-1/2 flex justify-center'
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.img src={Astra} alt="Contact"
            className='w-72 md:w-140 rounded-2xl shadow-lg object-cover'
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
        </motion.div>
        {/* right side */}
        <motion.div className='w-full md:w-1/2 bg-white/5 p-8 rounded-2xl shadow-lg
  border border-white/10'
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }} >
          <h2 className='text-3xl font-bold mb-6'>
            Let's Work Together
          </h2>
          <form className='flex flex-col gap-5' onSubmit={handlesubmit}>
            <div className='flex flex-col'>
              <label className='mb-1' >Your Name <span className='text-red-500'>*</span></label>
              <input type="text"
                name='name'
                placeholder=' Enter Your name'
                value={formData.name}
                onChange={handleChange}
                className={`p-3 rounded-md bg-white/10 border ${errors.name ? "border-red-500" : "border-gray-500"} text-white focus:outline-none focus:border-blue-500`} />
              {errors.name && <p className='text-red-500 text-xs'>{errors.name}</p>}
            </div>

            <div className='flex flex-col'>
              <label className='mb-1' >Your Email <span className='text-red-500'>*</span></label>
              <input type="text"
                name='email'
                placeholder=' Enter Your email'
                value={formData.email}
                onChange={handleChange}
                className={`p-3 rounded-md bg-white/10 border ${errors.email ? "border-red-500" : "border-gray-500"} text-white focus:outline-none focus:border-blue-500`} />
              {errors.email && <p className='text-red-500 text-xs'>{errors.email}</p>}
            </div>

            <div className='flex flex-col'>
              <label className='mb-1' >Service Needed <span className='text-red-500'>*</span></label>
              <select
                name='service'
                value={formData.service}
                onChange={handleChange}
                className={`p-3 rounded-md bg-white/10 border ${errors.service ? "border-red-500" : "border-gray-500"} text-white focus:outline-none focus:border-blue-500`}
              >
                <option value="" disabled> Something in mind?</option>
                <option value="Web Development" className='text-black'>Web Devlopment</option>
                <option value="Video Editing" className='text-black'>Video Editing</option>
                <option value="other" className='text-black'>Others</option>

              </select>
              {errors.service && <p className='text-red-500 text-xs'>{errors.service}</p>}
            </div>

            {formData.service && formData.service !== "other" && (
              <div className='flex flex-col'>
                <label className='mb-1' >Budget <span className='text-red-500'>*</span></label>
                <input type="text"
                  name='budget'
                  placeholder='Your budget'
                  value={formData.budget}
                  onChange={handleChange}
                  className={`p-3 rounded-md bg-white/10 border ${errors.budget ? "border-red-500" : "border-gray-500"} text-white focus:outline-none focus:border-blue-500`} />
                {errors.budget && <p className='text-red-500 text-xs'>{errors.budget}</p>}
              </div>
            )}

            <div className='flex flex-col'>
              <label className='mb-1' >Explain Your Idea <span className='text-red-500'>*</span></label>
              <textarea
                name='idea'
                rows={5}
                placeholder='Enter Your Idea'
                value={formData.idea}
                onChange={handleChange}
                className={`p-3 rounded-md bg-white/10 border ${errors.idea ? "border-red-500" : "border-gray-500"} text-white focus:outline-none focus:border-blue-500`} />
              {errors.idea && <p className='text-red-500 text-xs'>{errors.idea}</p>}
            </div>

            {status && (
              <p className={`text-sm ${status === "success" ? "text-green-400" : status === "error" ? "text-red-400" : "text-yellow-400"}`}>
                {status === "sending" ? "sending..." : status === "success" ? "Message sent successfully ✅" : "Something went wrong ❌"}
              </p>
            )}

            <motion.button className='bg-blue-600 hover:bg-blue-700 disabled: opacity-80
text-white py-3 rounded-md font-semibold transition'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={status === "sending"}
              type='submit'
            >
              {status === "sending" ? "sending..." : "Send Message"}
            </motion.button>










          </form>

        </motion.div>
        {/* Success Modal Popup */}
      {showModal && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
          <div className="bg-gray-900 border border-blue-500 p-8 rounded-2xl text-center shadow-2xl max-w-sm mx-4">
            <div className="text-5xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
            <p className="text-gray-400 mb-6">Aapka message mil gaya hai. Main aapse jald hi contact karunga.</p>
            <button 
              onClick={() => setShowModal(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}

      </div>

    </section>
  )
}
