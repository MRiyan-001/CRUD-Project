import React, { useState } from "react";
import { assets } from "../assets/assets";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex items-center w-full">
      <div className="flex flex-col items-center w-full max-w-2xl pt-16 md:pt-32 mx-auto text-center">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-xl md:text-4xl xl:text-5xl text-gray-800 font-bold xl:leading-14"
        >
          Built for People <br /> Who Actually Want to
          <span className="text-[#d98c4a]"> Finish Their Tasks</span> <br />
        </motion.h1>

        <motion.p
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-gray-500 text-xs md:text-sm font-light mt-4"
        >
          Small steps every day lead to big results. Check it off and keep
          moving.
        </motion.p>

        <motion.p
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="text-gray-500 text-xs md:text-sm font-light mb-2"
        >
          Plan your day, track your tasks, and reach your goals <br />— all in
          one place.
        </motion.p>

        <button
          onClick={() => navigate("/tasks")}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex items-center gap-2 border border-gray-300 hover:border-transparent- cursor-pointer hover:bg-blue-600 hover:text-white px-4 py-2 rounded-full mt-4 transition-all"
        >
          <span>Let's Start</span>
          <motion.span
            initial={{ width: 0, x: -10, opacity: 0 }}
            animate={
              isHovered
                ? { width: "auto", x: 0, opacity: 1 }
                : { width: 0, x: -10, opacity: 0 }
            }
            transition={{ duration: 0.3 }}
          >
            <img src={assets.arrow} alt="" className="w-4" />
          </motion.span>
        </button>
      </div>
    </div>
  );
};

export default Hero;
