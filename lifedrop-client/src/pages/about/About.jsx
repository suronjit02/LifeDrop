import { Link } from "react-router";
import { motion } from "framer-motion";
import { BiSolidDonateBlood } from "react-icons/bi";
import {
  FiTarget, FiEye, FiZap, FiSmile,
  FiShield, FiUsers, FiArrowRight, FiHeart,
} from "react-icons/fi";
import { FaLocationDot } from "react-icons/fa6";

const whyItems = [
  {
    icon: <FiZap />,
    title: "Fast & Reliable",
    desc: "Find blood donors instantly by blood group and location — no delays.",
    accent: "#c6414c",
    bg: "bg-red-50",
    border: "border-red-100",
    iconBg: "bg-red-100",
  },
  {
    icon: <FiSmile />,
    title: "User Friendly",
    desc: "Simple, clean interface designed for donors, volunteers, and admins alike.",
    accent: "#05b4cd",
    bg: "bg-[#05b4cd]/5",
    border: "border-[#05b4cd]/20",
    iconBg: "bg-[#05b4cd]/10",
  },
  {
    icon: <FiShield />,
    title: "Secure Platform",
    desc: "Protected routes and modern authentication keep your data safe.",
    accent: "#8b5cf6",
    bg: "bg-purple-50",
    border: "border-purple-100",
    iconBg: "bg-purple-100",
  },
  {
    icon: <FiUsers />,
    title: "Community Driven",
    desc: "Built to encourage social responsibility and community involvement.",
    accent: "#22c55e",
    bg: "bg-green-50",
    border: "border-green-100",
    iconBg: "bg-green-100",
  },
];

const stats = [
  { value: "12,480+", label: "Registered Donors",    icon: <FiUsers />           },
  { value: "24,900+", label: "Lives Impacted",        icon: <FiHeart />           },
  { value: "8,340+",  label: "Donations Completed",  icon: <BiSolidDonateBlood />},
  { value: "64",      label: "Districts Covered",    icon: <FaLocationDot />      },
];

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Hero Banner ── */}
      <div className="bg-[#c6414c] py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-white" />
          <div className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full bg-white" />
        </div>
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <BiSolidDonateBlood className="text-5xl text-white/80 mx-auto mb-3" />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            About LifeDrop
          </h1>
          <p className="text-white/75 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            A blood donation platform connecting voluntary donors with people in
            urgent need — making every second count.
          </p>
        </motion.div>
      </div>

      {/* ── Stats Bar ── */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-100">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="flex flex-col items-center gap-1 py-8 px-4 group"
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

        {/* ── Story section ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-[#c6414c] mb-3">
              Our Story
            </p>
            <h2 className="text-3xl font-bold text-gray-900 mb-5 leading-snug">
              Technology &amp; Humanity,<br />Together Saving Lives
            </h2>
            <div className="text-gray-500 text-sm leading-relaxed space-y-4">
              <p>
                LifeDrop was born from a simple but urgent observation: people die
                waiting for blood that exists — it just can't be found in time.
                We set out to solve that.
              </p>
              <p>
                Through this platform, users can register as donors, search by
                blood group and location, and create urgent donation requests.
                Every feature is built for reliability, speed, and ease of use —
                so you can act when it matters most.
              </p>
              <p>
                We believe a single donation can save up to three lives. LifeDrop
                exists to make that donation happen faster.{" "}
                <strong className="text-gray-700">
                  Because saving lives should never be delayed.
                </strong>
              </p>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="absolute -inset-4 rounded-3xl border-2 border-dashed border-[#c6414c]/15 -z-10" />
            <img
              src="/donate.png"
              alt="Donate blood"
              className="w-full max-h-80 object-contain rounded-2xl"
            />
            {/* Floating badge */}
            <div className="absolute -bottom-5 -right-3 bg-[#c6414c] text-white rounded-2xl px-4 py-3 shadow-xl flex items-center gap-2">
              <BiSolidDonateBlood className="text-2xl" />
              <div>
                <p className="text-xs opacity-70">Lives saved</p>
                <p className="text-lg font-bold leading-tight">24,900+</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Mission & Vision ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {[
            {
              icon: <FiTarget />,
              label: "Our Mission",
              title: "Make Donation Fast &amp; Accessible",
              text: "Our mission is to make blood donation easy, fast, and accessible for everyone. LifeDrop helps donors and patients connect instantly during emergencies — removing every barrier between a donor and a life that needs saving.",
              bg: "bg-[#c6414c]",
            },
            {
              icon: <FiEye />,
              label: "Our Vision",
              title: "No Life Lost for Lack of Blood",
              text: "We envision a future where no life is lost due to the unavailability of blood. LifeDrop aims to build a strong, trusted, and active donor community that spans every district in Bangladesh.",
              bg: "bg-[#05b4cd]",
            },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              className={`${item.bg} rounded-3xl p-8 text-white relative overflow-hidden`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
              <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center text-xl mb-5">
                {item.icon}
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-2">
                {item.label}
              </p>
              <h3
                className="text-xl font-bold mb-3"
                dangerouslySetInnerHTML={{ __html: item.title }}
              />
              <p className="text-white/75 text-sm leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>

        {/* ── Why LifeDrop ── */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <motion.p
              className="text-xs font-semibold uppercase tracking-widest text-[#c6414c] mb-2"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
            >
              Why LifeDrop?
            </motion.p>
            <motion.h2
              className="text-3xl font-bold text-gray-900 mb-3"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
            >
              Built Different, Built Better
            </motion.h2>
            <motion.p
              className="text-gray-400 text-sm max-w-md mx-auto"
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            >
              Every feature in LifeDrop is designed with one goal — saving lives faster.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyItems.map((item, i) => (
              <motion.div
                key={item.title}
                className={`rounded-2xl border ${item.border} ${item.bg} p-6 flex flex-col gap-4 group`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6, boxShadow: "0 16px 40px rgba(0,0,0,0.09)" }}
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl ${item.iconBg} group-hover:scale-110 transition-transform duration-300`}
                  style={{ color: item.accent }}
                >
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-sm mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
                <div
                  className="h-0.5 w-0 group-hover:w-full rounded-full transition-all duration-500"
                  style={{ backgroundColor: item.accent }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <motion.div
          className="bg-[#c6414c] rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/10" />
          <div className="relative z-10">
            <BiSolidDonateBlood className="text-5xl text-white/60 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-3">
              Become a Life Saver Today
            </h2>
            <p className="text-white/70 text-sm max-w-lg mx-auto mb-8 leading-relaxed">
              Join LifeDrop as a donor and help save lives with a simple act of
              kindness. Registration is free and takes less than 2 minutes.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/register"
                className="btn bg-white text-[#c6414c] hover:bg-[#c6414c] hover:text-white hover:border-white border-transparent rounded-xl gap-2 px-8 transition-all duration-300"
              >
                Join as a Donor <FiArrowRight />
              </Link>
              <Link
                to="/search-donors"
                className="btn bg-white/15 hover:bg-white/25 text-white border border-white/20 rounded-xl px-8 transition-all duration-300"
              >
                Find Donors
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default About;
