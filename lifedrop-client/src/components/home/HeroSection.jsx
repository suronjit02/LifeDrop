import React, { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../provider/AuthProvider";
import { motion } from "framer-motion";

const HeroSection = () => {
  const { user } = useContext(AuthContext);
  // console.log(user);
  return (
    <section className="relative w-full h-[90vh]">
      <motion.img
        src="/hero.jpg"
        alt="Blood Donation"
        className="w-full h-full object-cover"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      <div className="absolute bottom-0 md:top-0 md:right-0 w-full md:w-1/2  h-full flex flex-col justify-center items-center md:items-start bg-white/80 px-5 md:px-10 md:text-left text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-gray-800 mb-2"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Join Hands to Save Lives
        </motion.h1>
        <motion.p
          className="text-md font-semibold md:text-xl text-gray-800 mb-4 max-w-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          "Donate Your Blood to Us, Save More Life Together"
        </motion.p>

        <motion.div
          className="flex gap-2 sm:gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {!user && (
            <Link
              to={"/register"}
              className="btn bg-primary hover:bg-white hover:border hover:border-primary  text-white hover:text-primary sm:px-6 transition-all duration-500 ease-in-out"
            >
              Join as a Donor
            </Link>
          )}
          <Link
            to={"/search-donors"}
            className="btn bg-primary hover:bg-white hover:border hover:border-primary  text-white hover:text-primary sm:px-6 transition-all duration-500 ease-in-out"
          >
            Search Donors
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
