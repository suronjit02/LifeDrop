import React from "react";
import { motion } from "framer-motion";
import { BiSolidDonateBlood } from "react-icons/bi";

const MotoSection = () => {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 flex flex-col md:flex-row items-center gap-12 md:gap-16">

        {/* Image side */}
        <motion.div
          className="relative shrink-0"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Decorative ring */}
          <div className="absolute -inset-4 rounded-2xl border-2 border-dashed border-[#c6414c]/20 -z-10" />
          <img
            className="h-72 md:h-96 rounded-2xl object-cover shadow-xl"
            src="/donate.png"
            alt="Donate blood"
          />
          {/* Floating badge */}
          <div className="absolute -bottom-5 -right-5 bg-[#c6414c] text-white rounded-xl px-4 py-3 shadow-lg flex items-center gap-2">
            <BiSolidDonateBlood className="text-2xl" />
            <div>
              <p className="text-xs font-semibold opacity-80">Donors saved</p>
              <p className="text-lg font-bold leading-tight">24,900+ Lives</p>
            </div>
          </div>
        </motion.div>

        {/* Text side */}
        <motion.div
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#c6414c] mb-3">
            Our Mission
          </p>
          <blockquote className="young-serif-regular text-3xl md:text-4xl leading-snug text-gray-800 mb-6">
            "Every <span className="text-[#c6414c]">drop</span> matters.{" "}
            Every <span className="text-[#c6414c]">life</span> counts."
          </blockquote>
          <p className="text-gray-500 text-base leading-relaxed max-w-lg">
            LifeDrop connects blood donors with patients in need — across every
            district, every hour of the day. Because saving a life should never
            be complicated.
          </p>

          {/* Divider with dots */}
          <div className="flex items-center gap-2 mt-8 justify-center md:justify-start">
            <span className="w-8 h-0.5 bg-[#c6414c]" />
            <span className="w-2 h-2 rounded-full bg-[#c6414c]" />
            <span className="w-2 h-2 rounded-full bg-[#c6414c]/40" />
            <span className="w-2 h-2 rounded-full bg-[#c6414c]/20" />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default MotoSection;
