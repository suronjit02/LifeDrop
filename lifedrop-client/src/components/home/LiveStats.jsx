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
    dot: "bg-red-600",
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

// stat card
function StatCard({ icon, label, target, animate, index }) {
  const count = useCountUp(target, 1800, animate);
  return (
    <motion.div
      className="flex flex-col items-center gap-2 py-8 px-4 bg-white relative group"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Top accent line on hover */}
      <div className="absolute top-0 left-0 w-0 group-hover:w-full h-0.5 bg-[#c6414c] transition-all duration-500" />
      <span className="w-11 h-11 rounded-full bg-red-50 flex items-center justify-center text-[#c6414c] text-xl">
        {icon}
      </span>
      <span className="text-3xl font-bold text-gray-900">
        {count.toLocaleString()}
        {target > 100 ? "+" : ""}
      </span>
      <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
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
    <section ref={sectionRef} className="py-20 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            className="text-xs font-semibold tracking-widest uppercase text-[#c6414c] mb-2"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            Live Impact
          </motion.p>
          <motion.h2
            className="text-3xl font-bold text-gray-900 mb-3"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Every Drop Counts
          </motion.h2>
          <motion.p
            className="text-gray-500 text-sm max-w-md mx-auto"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Real numbers from the LifeDrop network — growing every single day.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 border border-gray-200 rounded-2xl overflow-hidden divide-x divide-y divide-gray-200 shadow-sm mb-12">
          {STATS.map((s, i) => (
            <StatCard key={s.id} {...s} animate={animate} index={i} />
          ))}
        </div>

        {/* Blood Availability */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
            Blood Group Availability
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
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
