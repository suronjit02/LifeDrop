import React from "react";
import { motion } from "framer-motion";

const MotoSection = () => {
  return (
    <section className="max-w-7xl mx-auto py-30 flex gap-15 flex-col md:flex-row px-2 sm:px-5 items-center justify-center">
      <motion.blockquote
        className=" young-serif-regular text-center text-3xl italic  "
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        "Every <span className="text-primary">drop</span> matters. Every{" "}
        <span className="text-primary">life</span> counts. <br />
        Making blood donation easier for everyone."
      </motion.blockquote>
      <motion.img
        className="h-80 rounded-xl"
        src="/donate.png"
        alt="donate blood"
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </section>
  );
};

export default MotoSection;
