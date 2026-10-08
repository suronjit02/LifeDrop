import React from "react";
import { motion } from "framer-motion";
import { FiMail, FiUser, FiMessageSquare, FiSend } from "react-icons/fi";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const contactInfo = [
  { icon: <FaLocationDot />, label: "Address", value: "Dhaka, Bangladesh" },
  { icon: <FaPhoneAlt />, label: "Phone", value: "+880 1739 145813" },
  { icon: <FiMail />, label: "Email", value: "suronjit02@gmail.com" },
];

const ContactSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            className="text-xs font-semibold uppercase tracking-widest text-primary mb-2"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Get In Touch
          </motion.p>
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Contact Us
          </motion.h2>
          <motion.p
            className="text-gray-400 text-sm max-w-md mx-auto"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Have a question or want to partner with us? We're here 24/7.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-5 gap-8 items-stretch">
          {/* Info Panel */}
          <motion.div
            className="md:col-span-2 bg-primary rounded-3xl p-8 text-white flex flex-col gap-7"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <div>
              <h3 className="text-xl font-bold mb-2">Contact Information</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Reach out anytime. We respond within 24 hours.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {contactInfo.map((c) => (
                <div key={c.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                    {c.icon}
                  </div>
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-0.5">
                      {c.label}
                    </p>
                    <p className="text-sm font-semibold">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative */}
            <div className="mt-auto flex gap-2 opacity-20">
              <span className="w-10 h-10 rounded-full border-2 border-white" />
              <span className="w-6 h-6 rounded-full border-2 border-white self-end" />
              <span className="w-4 h-4 rounded-full border-2 border-white self-end mb-0.5" />
            </div>
          </motion.div>

          {/* Form Panel */}
          <motion.div
            className="md:col-span-3 bg-white rounded-3xl shadow-sm border border-gray-100 p-8"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <form className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FiUser className="text-primary" /> Your Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rafi Ahmed"
                  className="input input-bordered focus:border-primary focus:outline-none w-full rounded-xl"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FiMail className="text-primary" /> Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="input input-bordered focus:border-primary focus:outline-none w-full rounded-xl"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FiMessageSquare className="text-primary" /> Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Write your message here..."
                  className="textarea textarea-bordered focus:border-primary focus:outline-none w-full resize-none rounded-xl"
                />
              </div>

              <button
                type="submit"
                className="btn bg-primary hover:bg-white hover:text-primary hover:border-primary text-white border-transparent w-full gap-2 transition-all duration-300 rounded-xl mt-1"
              >
                <FiSend /> Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
