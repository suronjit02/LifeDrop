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
    <section className="py-20 bg-primary overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-2"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            Real Stories
          </motion.p>
          <motion.h2
            className="text-3xl font-bold text-white mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            Recent Donation Stories
          </motion.h2>
          <motion.p
            className="text-white/70 text-sm max-w-lg mx-auto"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Hear from donors who made a difference. Every story is a life
            touched.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          {stories.map((item, i) => (
            // single card
            <motion.div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4 relative overflow-hidden group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -5 }}
            >
              {/* Decorative quote mark */}
              <span className="absolute top-4 right-5 text-6xl font-serif text-gray-100 leading-none select-none">
                "
              </span>

              {/* Quote icon */}
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                <BiSolidDonateBlood className="text-xl text-[#c6414c]" />
              </div>

              {/* Story text */}
              <p className="text-gray-600 text-sm leading-relaxed flex-1 italic">
                "{item.story}"
              </p>

              {/* Divider */}
              <hr className="border-gray-100" />

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                    <FiUser className="text-gray-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-400">{item.date}</p>
                  </div>
                </div>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full border ${bloodGroupColor(item.blood)}`}
                >
                  {item.blood}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentDonationStories;
