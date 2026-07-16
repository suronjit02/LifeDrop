import { useEffect, useRef, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { BiSolidDonateBlood } from "react-icons/bi";
import { GiEternalLove } from "react-icons/gi";
import { FaLocationDot } from "react-icons/fa6";

const STATS = [
  {
    id: "donors",
    icon: <FaUsers />,
    label: "Registered donors",
    target: 12480,
  },
  {
    id: "donations",
    icon: <BiSolidDonateBlood />,
    label: "Donations completed",
    target: 8340,
  },
  {
    id: "lives",
    icon: <GiEternalLove />,
    label: "Lives impacted",
    target: 24900,
  },
  {
    id: "districts",
    icon: <FaLocationDot />,
    label: "Districts covered",
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

const DOT_COLORS = {
  available: "bg-green-500",
  low: "bg-amber-400",
  critical: "bg-red-600",
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

function StatCard({ icon, label, target, animate }) {
  const count = useCountUp(target, 1800, animate);
  return (
    <div className="flex flex-col items-center gap-1.5 py-6 px-4 bg-white">
      <span className="text-2xl text-primary" aria-hidden="true">
        {icon}
      </span>
      <span className="text-3xl font-semibold text-gray-900">
        {count.toLocaleString()}
      </span>
      <span className="text-xs text-gray-500">{label}</span>
    </div>
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
    <section ref={sectionRef} className="py-16 px-4 text-center bg-slate-50">
      <p className="text-xs font-medium tracking-widest uppercase text-primary mb-2">
        Live impact
      </p>
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        Every drop counts
      </h2>
      <p className="text-sm text-gray-500 mb-10">
        Real-time numbers from the LifeDrop network
      </p>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 border border-gray-200 rounded-2xl overflow-hidden divide-x divide-y divide-gray-200 max-w-2xl mx-auto mb-10">
        {STATS.map((s) => (
          <StatCard key={s.id} {...s} animate={animate} />
        ))}
      </div>

      {/* Blood group availability */}
      <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
        {BLOOD_GROUPS.map(({ group, status }) => (
          <div
            key={group}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 bg-white text-sm font-medium text-gray-800"
          >
            <span className={`w-2 h-2 rounded-full ${DOT_COLORS[status]}`} />
            {group}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-5 mt-3 text-xs text-gray-400">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
          Available
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
          Low
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-600 inline-block" />
          Critical
        </span>
      </div>
    </section>
  );
};

export default LiveStats;
