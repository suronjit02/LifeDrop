import React from "react";
import { motion } from "framer-motion";
import { FiUser } from "react-icons/fi";
import { BiSolidDonateBlood } from "react-icons/bi";

const stories = [
  {
    id: 1,
    name: "Rafi Ahmed",
    blood: "A+",
    story:
      "I donated blood for the first time through this platform. Knowing that my blood saved a life made me incredibly proud.",
    date: "March 2025",
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    blood: "O-",
    story:
      "Emergency situations need fast responses. This website helped me find a patient quickly and donate without hassle.",
    date: "February 2025",
  },
  {
    id: 3,
    name: "Sabbir Hossain",
    blood: "B+",
    story:
      "Blood donation should be easy for everyone. I'm glad to be part of a community that truly cares about lives.",
    date: "January 2025",
  },
];

const bloodGroupColor = (bg) => {
  const map = {
    "A+": "bg-red-50 text-red-600 border-red-200",
    "A-": "bg-red-50 text-red-700 border-red-200",
    "O-": "bg-blue-50 text-blue-700 border-blue-200",
    "O+": "bg-blue-50 text-blue-600 border-blue-200",
    "B+": "bg-orange-50 text-orange-600 border-orange-200",
    "B-": "bg-orange-50 text-orange-700 border-orange-200",
    "AB+": "bg-purple-50 text-purple-600 border-purple-200",
    "AB-": "bg-purple-50 text-purple-700 border-purple-200",
  };
  return map[bg] || "bg-gray-100 text-gray-700 border-gray-200";
};

const RecentDonationStories = () => {
  return (
    <section className="py-24 bg-[#c6414c] overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full border-4 border-white" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full border-4 border-white" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-2"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
          >
            Real Stories
          </motion.p>
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white mb-3"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            Recent Donation Stories
          </motion.h2>
          <motion.p
            className="text-white/60 text-sm max-w-lg mx-auto"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
          >
            Hear from donors who made a difference. Every story is a life
            touched.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          {stories.map((item, i) => (
            <motion.div
              key={item.id}
              className="bg-white rounded-2xl shadow-xl p-7 flex flex-col gap-5 relative overflow-hidden group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -6 }}
            >
              {/* Large decorative quote */}
              <span className="absolute -top-2 right-5 text-8xl font-serif text-gray-100 leading-none select-none pointer-events-none">
                "
              </span>

              {/* Icon */}
              <div className="w-11 h-11 rounded-2xl bg-red-50 flex items-center justify-center flex-shrink-0">
                <BiSolidDonateBlood className="text-xl text-[#c6414c]" />
              </div>

              {/* Story */}
              <p className="text-gray-600 text-sm leading-relaxed flex-1 italic relative z-10">
                "{item.story}"
              </p>

              <hr className="border-gray-100" />

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                    <FiUser className="text-gray-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.date}</p>
                  </div>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${bloodGroupColor(item.blood)}`}>
                  {item.blood}
                </span>
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-[#c6414c] transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentDonationStories;
