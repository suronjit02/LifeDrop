import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { BiSolidDonateBlood } from "react-icons/bi";
import {
  FiHeart, FiUsers, FiRadio,
  FiArrowRight, FiCheckCircle, FiTrendingUp,
} from "react-icons/fi";
import { FaHandHoldingHeart } from "react-icons/fa";
import { GiEternalLove } from "react-icons/gi";
import { FaLocationDot } from "react-icons/fa6";

const impactCards = [
  {
    icon: <FiHeart />,
    title: "Save Lives",
    desc: "Every blood donation can save up to three lives. Our charity efforts ensure timely access to blood for those who need it most.",
    accent: "#c6414c",
    bg: "bg-red-50",
    border: "border-red-100",
    iconBg: "bg-[#c6414c]/10",
  },
  {
    icon: <FiUsers />,
    title: "Support Communities",
    desc: "We work with volunteers and donors to support patients during emergencies and critical health situations across Bangladesh.",
    accent: "#05b4cd",
    bg: "bg-[#05b4cd]/5",
    border: "border-[#05b4cd]/20",
    iconBg: "bg-[#05b4cd]/10",
  },
  {
    icon: <FiRadio />,
    title: "Raise Awareness",
    desc: "LifeDrop promotes awareness campaigns to encourage safe, regular blood donation and reduce stigma around the process.",
    accent: "#8b5cf6",
    bg: "bg-purple-50",
    border: "border-purple-100",
    iconBg: "bg-purple-100",
  },
];

const activities = [
  {
    icon: <BiSolidDonateBlood />,
    title: "Emergency Blood Support",
    desc: "Our rapid-response network helps patients find verified blood donors within minutes during critical emergencies.",
    tag: "Active",
    tagColor: "bg-green-50 text-green-600 border-green-200",
    accent: "#c6414c",
    iconBg: "bg-[#c6414c]/10",
  },
  {
    icon: <FiUsers />,
    title: "Volunteer Network",
    desc: "Building a trusted network of voluntary blood donors across every district, guided by trained coordinators.",
    tag: "Growing",
    tagColor: "bg-[#05b4cd]/10 text-[#05b4cd] border-[#05b4cd]/20",
    accent: "#05b4cd",
    iconBg: "bg-[#05b4cd]/10",
  },
  {
    icon: <FiRadio />,
    title: "Awareness Campaigns",
    desc: "Organizing digital and community campaigns, blood drives, and school programs to promote regular donation habits.",
    tag: "Ongoing",
    tagColor: "bg-purple-50 text-purple-600 border-purple-100",
    accent: "#8b5cf6",
    iconBg: "bg-purple-100",
  },
  {
    icon: <FaHandHoldingHeart />,
    title: "Patient Assistance",
    desc: "Supporting underprivileged patients with guidance, coordination, and direct donor connections free of charge.",
    tag: "Free",
    tagColor: "bg-amber-50 text-amber-600 border-amber-200",
    accent: "#f97316",
    iconBg: "bg-orange-100",
  },
];

const stats = [
  { icon: <GiEternalLove />,      value: "24,900+", label: "Lives Impacted"     },
  { icon: <FiUsers />,            value: "12,480+", label: "Volunteer Donors"   },
  { icon: <FaLocationDot />,      value: "64",      label: "Districts Covered"  },
  { icon: <FiTrendingUp />,       value: "8,340+",  label: "Campaigns Run"      },
];

const Charity = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Hero Banner ── */}
      <div className="bg-[#c6414c] py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-white" />
          <div className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full bg-white" />
          <div className="absolute top-1/2 right-24 w-32 h-32 rounded-full bg-white" />
        </div>
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <FaHandHoldingHeart className="text-5xl text-white/80 mx-auto mb-3" />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Charity &amp; Social Impact
          </h1>
          <p className="text-white/75 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            LifeDrop is committed to saving lives and strengthening communities
            through blood donation awareness and humanitarian initiatives.
          </p>
        </motion.div>
      </div>

      {/* ── Stats bar ── */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-100">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="flex flex-col items-center gap-1 py-8 px-4"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
              >
                <span className="text-[#c6414c] text-xl mb-1">{s.icon}</span>
                <span className="text-3xl font-extrabold text-gray-900">{s.value}</span>
                <span className="text-xs text-gray-400 uppercase tracking-widest font-medium text-center">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-10 py-16">

        {/* ── Why charity section ── */}
        <div className="text-center mb-12">
          <motion.p
            className="text-xs font-semibold uppercase tracking-widest text-[#c6414c] mb-2"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
          >
            Why It Matters
          </motion.p>
          <motion.h2
            className="text-3xl font-bold text-gray-900 mb-3"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            Our Charitable Mission
          </motion.h2>
          <motion.p
            className="text-gray-400 text-sm max-w-lg mx-auto"
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
          >
            We believe every life is worth fighting for. Here's how LifeDrop is
            making a difference every day.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {impactCards.map((item, i) => (
            <motion.div
              key={item.title}
              className={`rounded-2xl border ${item.border} ${item.bg} p-7 flex flex-col gap-5 group`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -6, boxShadow: "0 16px 40px rgba(0,0,0,0.09)" }}
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${item.iconBg} group-hover:scale-110 transition-transform duration-300`}
                style={{ color: item.accent }}
              >
                {item.icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-base mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
              <div
                className="h-0.5 w-0 group-hover:w-full rounded-full transition-all duration-500"
                style={{ backgroundColor: item.accent }}
              />
            </motion.div>
          ))}
        </div>

        {/* ── Ongoing activities ── */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <motion.p
              className="text-xs font-semibold uppercase tracking-widest text-[#c6414c] mb-2"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
            >
              What We Do
            </motion.p>
            <motion.h2
              className="text-3xl font-bold text-gray-900 mb-3"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
            >
              Our Ongoing Activities
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {activities.map((item, i) => (
              <motion.div
                key={item.title}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex gap-4 hover:shadow-md transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                whileHover={{ y: -3 }}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 ${item.iconBg} group-hover:scale-110 transition-transform duration-300`}
                  style={{ color: item.accent }}
                >
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h4 className="font-bold text-gray-900 text-sm">{item.title}</h4>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${item.tagColor}`}>
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Donate strip ── */}
        <motion.div
          className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-12 mb-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#05b4cd] mb-3">
                Fund Our Mission
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Support LifeDrop Financially
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Your monetary contribution helps us maintain the platform, run
                awareness campaigns, and support underprivileged patients who
                need blood but can't find a donor.
              </p>
              <div className="flex flex-col gap-2">
                {[
                  "Platform maintenance &amp; development",
                  "Community awareness campaigns",
                  "Emergency coordination support",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <FiCheckCircle className="text-green-500 shrink-0 text-sm" />
                    <span
                      className="text-sm text-gray-500"
                      dangerouslySetInnerHTML={{ __html: item }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                to="/donate"
                className="btn bg-[#05b4cd] hover:bg-white hover:text-[#05b4cd] hover:border-[#05b4cd] text-white border-transparent w-full rounded-xl gap-2 transition-all duration-300"
              >
                <BiSolidDonateBlood /> Donate Financially
              </Link>
              <Link
                to="/register"
                className="btn bg-[#c6414c] hover:bg-white hover:text-[#c6414c] hover:border-[#c6414c] text-white border-transparent w-full rounded-xl gap-2 transition-all duration-300"
              >
                <FiHeart /> Donate Blood
              </Link>
            </div>
          </div>
        </motion.div>

        {/* ── CTA ── */}
        <motion.div
          className="bg-[#c6414c] rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/10 pointer-events-none" />
          <div className="relative z-10">
            <FaHandHoldingHeart className="text-5xl text-white/60 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-3">
              Be Part of This Life-Saving Mission
            </h2>
            <p className="text-white/70 text-sm max-w-lg mx-auto mb-8 leading-relaxed">
              Whether you donate blood, spread awareness, or contribute
              financially — every act of kindness brings us closer to a world
              where no one dies for lack of blood.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/register"
                className="btn bg-white text-[#c6414c] hover:bg-[#c6414c] hover:text-white hover:border-white border-transparent rounded-xl gap-2 px-8 transition-all duration-300"
              >
                Join as a Donor <FiArrowRight />
              </Link>
              <Link
                to="/donate"
                className="btn bg-white/15 hover:bg-white/25 text-white border border-white/20 rounded-xl px-8 transition-all duration-300"
              >
                Donate Financially
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Charity;
