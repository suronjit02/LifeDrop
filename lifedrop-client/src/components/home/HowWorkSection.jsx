import React from "react";
import { motion } from "framer-motion";
import { FiSearch, FiCheckCircle, FiHeart } from "react-icons/fi";

const steps = [
  {
    step: "01",
    icon: <FiSearch />,
    title: "Quick Search",
    desc: "Filter donors by blood group, district, and upazila in seconds.",
    color: "text-[#c6414c]",
    bg: "bg-red-50",
    border: "border-red-100",
  },
  {
    step: "02",
    icon: <FiCheckCircle />,
    title: "Trusted Donors",
    desc: "All donors are verified to ensure safe and reliable blood donation.",
    color: "text-blue-500",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    step: "03",
    icon: <FiHeart />,
    title: "Save Lives",
    desc: "Connect, coordinate, and complete a donation that saves lives.",
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-100",
  },
];

const HowWorkSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-10">

        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            className="text-xs font-semibold uppercase tracking-widest text-[#c6414c] mb-2"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            Simple Process
          </motion.p>
          <motion.h2
            className="text-3xl font-bold text-gray-900 mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            How LifeDrop Works
          </motion.h2>
          <motion.p
            className="text-gray-500 text-sm max-w-md mx-auto"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Three simple steps stand between you and saving a life today.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line — desktop only */}
          <div className="hidden md:block absolute top-10 left-1/6 right-1/6 h-px bg-gray-200 z-0" />

          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              className={`relative z-10 rounded-2xl border ${s.border} ${s.bg} p-8 flex flex-col items-center text-center group`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -6, boxShadow: "0 14px 36px rgba(0,0,0,0.09)" }}
            >
              {/* Step number */}
              <span className="absolute top-4 right-5 text-5xl font-extrabold text-gray-100 leading-none select-none">
                {s.step}
              </span>

              {/* Icon circle */}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 bg-white shadow-sm ${s.color} group-hover:scale-110 transition-transform duration-300`}>
                {s.icon}
              </div>

              <h3 className="font-bold text-gray-800 text-lg mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowWorkSection;
