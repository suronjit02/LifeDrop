import React from "react";
import { motion } from "framer-motion";

const ContactSection = () => {
  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-2">
        <motion.h2
          className="text-3xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          Contact Us
        </motion.h2>

        <motion.form
          className="bg-white p-8 shadow-md rounded-md space-y-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <input
            type="text"
            placeholder="Your Name"
            className="input input-bordered w-full"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="input input-bordered w-full"
          />
          <textarea
            placeholder="Your Message"
            className="textarea textarea-bordered w-full"
          ></textarea>

          <button className="btn bg-[#c6414c] hover:bg-white text-white  hover:text-[#c6414c] hover:border-[#c6414c] w-full transition-all duration-500 ease-in-out">
            Send Message
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactSection;
