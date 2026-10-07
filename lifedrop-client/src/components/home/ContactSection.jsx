import React from "react";
import { motion } from "framer-motion";
import { FiMail, FiUser, FiMessageSquare, FiSend } from "react-icons/fi";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const contactInfo = [
  {
    icon: <FaLocationDot />,
    label: "Address",
    value: "Dhaka, Bangladesh",
  },
  {
    icon: <FaPhoneAlt />,
    label: "Phone",
    value: "+880 1739 145813",
  },
  {
    icon: <FiMail />,
    label: "Email",
    value: "suronjit02@gmail.com",
  },
];

const ContactSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-5 sm:px-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            className="text-xs font-semibold uppercase tracking-widest text-primary mb-2"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            Get In Touch
          </motion.p>
          <motion.h2
            className="text-3xl font-bold text-gray-900 mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            Contact Us
          </motion.h2>
          <motion.p
            className="text-gray-500 text-sm max-w-md mx-auto"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Have a question or want to partner with us? We're here 24/7.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-5 gap-8 items-start">
          {/* Contact Info Panel */}
          <motion.div
            className="md:col-span-2 bg-primary rounded-2xl p-8 text-white flex flex-col gap-6 h-full"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <div>
              <h3 className="text-xl font-bold mb-2">Contact Information</h3>
              <p className="text-white/70 text-sm">
                Reach out anytime. We respond within 24 hours.
              </p>
            </div>

            <div className="flex flex-col gap-5 mt-2">
              {contactInfo.map((c) => (
                <div key={c.label} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0 text-white">
                    {c.icon}
                  </div>
                  <div>
                    <p className="text-xs text-white/60 uppercase tracking-wider mb-0.5">
                      {c.label}
                    </p>
                    <p className="text-sm font-medium">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative circles */}
            <div className="mt-auto">
              <div className="flex gap-2 mt-8 opacity-20">
                <span className="w-10 h-10 rounded-full border-2 border-white" />
                <span className="w-6 h-6 rounded-full border-2 border-white self-end" />
                <span className="w-4 h-4 rounded-full border-2 border-white self-end mb-1" />
              </div>
            </div>
          </motion.div>

          {/* Form Panel */}
          <motion.div
            className="md:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <form className="flex flex-col gap-5">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                  <FiUser className="text-primary" /> Your Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rafi Ahmed"
                  className="input input-bordered focus:border-primary focus:outline-none w-full"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                  <FiMail className="text-primary" /> Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="input input-bordered focus:border-primary focus:outline-none w-full"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                  <FiMessageSquare className="text-primary" /> Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Write your message here..."
                  className="textarea textarea-bordered focus:border-primary focus:outline-none w-full resize-none"
                />
              </div>

              <button
                type="submit"
                className="btn bg-primary hover:bg-white hover:text-primary hover:border-primary text-white w-full gap-2 transition-all duration-300 mt-1"
              >
                <FiSend />
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
