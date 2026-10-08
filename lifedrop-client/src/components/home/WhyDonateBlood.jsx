import { motion } from "framer-motion";
import { FiHeart, FiShield, FiUsers, FiAlertCircle } from "react-icons/fi";

const reasons = [
  {
    icon: <FiHeart />,
    title: "Save Lives",
    desc: "One blood donation can save up to three lives in emergency situations.",
    accent: "#c6414c",
    bg: "bg-red-50",
    border: "border-red-100",
    iconBg: "bg-red-100",
  },
  {
    icon: <FiAlertCircle />,
    title: "Emergency Support",
    desc: "Helps patients during surgery, accidents, and critical illnesses.",
    accent: "#f97316",
    bg: "bg-orange-50",
    border: "border-orange-100",
    iconBg: "bg-orange-100",
  },
  {
    icon: <FiShield />,
    title: "Safe & Simple",
    desc: "Blood donation is a safe process supervised by medical professionals.",
    accent: "#3b82f6",
    bg: "bg-blue-50",
    border: "border-blue-100",
    iconBg: "bg-blue-100",
  },
  {
    icon: <FiUsers />,
    title: "Community Impact",
    desc: "Strengthens community bonding and social responsibility for all.",
    accent: "#8b5cf6",
    bg: "bg-purple-50",
    border: "border-purple-100",
    iconBg: "bg-purple-100",
  },
];

const WhyDonateBlood = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            className="text-xs font-semibold uppercase tracking-widest text-primary mb-2"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Why It Matters
          </motion.p>
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Why Donate Blood?
          </motion.h2>
          <motion.p
            className="text-gray-400 max-w-lg mx-auto text-sm"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            A small step from you can save a life. Blood donation is safe,
            simple, and more powerful than you think.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((item, i) => (
            <motion.div
              key={item.title}
              className={`rounded-2xl border ${item.border} ${item.bg} p-7 flex flex-col gap-5 group cursor-default`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, boxShadow: "0 16px 40px rgba(0,0,0,0.10)" }}
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${item.iconBg} transition-transform duration-300 group-hover:scale-110`}
                style={{ color: item.accent }}
              >
                {item.icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-base mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
              {/* Bottom accent line */}
              <div
                className="h-0.5 w-0 group-hover:w-full rounded-full transition-all duration-500"
                style={{ backgroundColor: item.accent }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyDonateBlood;
