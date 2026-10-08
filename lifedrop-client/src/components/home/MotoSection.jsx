import React from "react";
import { motion } from "framer-motion";
import { BiSolidDonateBlood } from "react-icons/bi";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router";

const MotoSection = () => {
  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex flex-col md:flex-row items-center gap-16">

        {/* Image side */}
        <motion.div
          className="relative shrink-0 w-full md:w-auto"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="absolute -inset-3 rounded-3xl bg-[#c6414c]/8 -z-10" />
          <div className="absolute -inset-6 rounded-3xl border-2 border-dashed border-[#c6414c]/15 -z-20" />
          <img
            className="h-72 md:h-[420px] w-full md:w-auto object-cover rounded-3xl shadow-2xl"
            src="/donate.png"
            alt="Donate blood"
          />
          {/* Floating badge */}
          <motion.div
            className="absolute -bottom-6 -right-4 md:-right-8 bg-[#c6414c] text-white rounded-2xl px-5 py-4 shadow-xl flex items-center gap-3"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <BiSolidDonateBlood className="text-2xl" />
            </div>
            <div>
              <p className="text-xs font-semibold opacity-70">Lives impacted</p>
              <p className="text-xl font-extrabold leading-tight">24,900+</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Text side */}
        <motion.div
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#c6414c] mb-4">
            Our Mission
          </p>
          <blockquote className="young-serif-regular text-3xl md:text-4xl lg:text-5xl leading-snug text-gray-800 mb-6">
            "Every{" "}
            <span className="text-[#c6414c]">drop</span> matters.{" "}
            Every <span className="text-[#c6414c]">life</span> counts."
          </blockquote>
          <p className="text-gray-500 text-base leading-relaxed max-w-lg mb-8">
            LifeDrop connects blood donors with patients in need — across every
            district, every hour of the day. Because saving a life should never
            be complicated.
          </p>

          <Link
            to="/search-donors"
            className="inline-flex items-center gap-2 btn bg-[#c6414c] hover:bg-white hover:text-[#c6414c] hover:border-[#c6414c] text-white border-transparent px-7 rounded-xl transition-all duration-300"
          >
            Find a Donor <FiArrowRight />
          </Link>

          {/* Decorative rule */}
          <div className="flex items-center gap-2 mt-10 justify-center md:justify-start">
            <span className="w-10 h-0.5 bg-[#c6414c]" />
            <span className="w-2 h-2 rounded-full bg-[#c6414c]" />
            <span className="w-2 h-2 rounded-full bg-[#c6414c]/40" />
            <span className="w-2 h-2 rounded-full bg-[#c6414c]/15" />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default MotoSection;
