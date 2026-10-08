import { useEffect, useRef, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { BiSolidDonateBlood } from "react-icons/bi";
import { GiEternalLove } from "react-icons/gi";
import { FaLocationDot } from "react-icons/fa6";
import { motion } from "framer-motion";

const STATS = [
  {
    id: "donors",
    icon: <FaUsers />,
    label: "Registered Donors",
    target: 12480,
  },
  {
    id: "donations",
    icon: <BiSolidDonateBlood />,
    label: "Donations Completed",
    target: 8340,
  },
  {
    id: "lives",
    icon: <GiEternalLove />,
    label: "Lives Impacted",
    target: 24900,
  },
  {
    id: "districts",
    icon: <FaLocationDot />,
    label: "Districts Covered",
    target: 64,
  },
];

const BLOOD_GROUPS = [
  { group: "A+", status: "available" },
  { group: "A−", status: "low" },
  { group: "B+", status: "available" },
  { group: "B−", status: "critical" },
  { group: "O+", status: "available" },
  { group: "O−", status: "critical" },
  { group: "AB+", status: "available" },
  { group: "AB−", status: "low" },
];

const STATUS_STYLE = {
  available: {
    dot: "bg-green-500",
    pill: "bg-green-50 border-green-200 text-green-700",
  },
  low: {
    dot: "bg-amber-400",
    pill: "bg-amber-50 border-amber-200 text-amber-700",
  },
  critical: {
    dot: "bg-primary",
    pill: "bg-red-50 border-red-200 text-red-700",
  },
};

function useCountUp(target, duration = 1800, trigger = true) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      setCount(Math.round(start));
      if (start >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, trigger]);
  return count;
}

function StatCard({ icon, label, target, animate, index }) {
  const count = useCountUp(target, 1800, animate);
  return (
    <motion.div
      className="flex flex-col items-center gap-3 py-10 px-6 bg-white relative group overflow-hidden"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out -z-0" />
      <span className="relative z-10 w-12 h-12 rounded-2xl bg-red-50 group-hover:bg-white/20 flex items-center justify-center text-primary group-hover:text-white text-xl transition-colors duration-300">
        {icon}
      </span>
      <span className="relative z-10 text-4xl font-extrabold text-gray-900 group-hover:text-white transition-colors duration-300">
        {count.toLocaleString()}
        {target > 100 ? "+" : ""}
      </span>
      <span className="relative z-10 text-xs text-gray-400 group-hover:text-white/80 font-semibold uppercase tracking-wider transition-colors duration-300">
        {label}
      </span>
    </motion.div>
  );
}

const LiveStats = () => {
  const sectionRef = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAnimate(true);
      },
      { threshold: 0.3 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            className="text-xs font-semibold tracking-widest uppercase text-primary mb-2"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Live Impact
          </motion.p>
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Every Drop Counts
          </motion.h2>
          <motion.p
            className="text-gray-400 text-sm max-w-md mx-auto"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Real numbers from the LifeDrop network — growing every single day.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 border border-gray-100 rounded-3xl overflow-hidden shadow-sm mb-14"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {STATS.map((s, i) => (
            <StatCard key={s.id} {...s} animate={animate} index={i} />
          ))}
        </motion.div>

        {/* Blood Availability */}
        <motion.div
          className="bg-gray-50 rounded-3xl p-8 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400 mb-5">
            Blood Group Availability
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-5">
            {BLOOD_GROUPS.map(({ group, status }) => (
              <div
                key={group}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-sm font-semibold ${STATUS_STYLE[status].pill}`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${STATUS_STYLE[status].dot}`}
                />
                {group}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-6 text-xs text-gray-400">
            {Object.entries(STATUS_STYLE).map(([key, val]) => (
              <span key={key} className="flex items-center gap-1.5 capitalize">
                <span
                  className={`w-2 h-2 rounded-full ${val.dot} inline-block`}
                />
                {key}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LiveStats;
