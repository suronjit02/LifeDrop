import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { BiSolidDonateBlood } from "react-icons/bi";
import {
  FiFileText, FiUser, FiLock, FiShield,
  FiAlertTriangle, FiDroplet, FiSlash,
  FiEdit, FiGlobe, FiMail, FiArrowRight,
  FiCheckCircle,
} from "react-icons/fi";

const sections = [
  {
    num: "01",
    icon: <FiCheckCircle />,
    title: "Acceptance of Terms",
    accent: "#c6414c",
    bg: "bg-red-50",
    border: "border-red-100",
    iconBg: "bg-[#c6414c]/10",
    text: "By accessing or using LifeDrop, you agree to comply with these terms and conditions. If you do not agree with any part of these terms, you must not use the platform.",
  },
  {
    num: "02",
    icon: <FiUser />,
    title: "User Eligibility",
    accent: "#05b4cd",
    bg: "bg-[#05b4cd]/5",
    border: "border-[#05b4cd]/20",
    iconBg: "bg-[#05b4cd]/10",
    text: "Users must be at least 18 years old or meet the local age requirements for donating blood. All information provided during registration must be accurate, current, and truthful.",
  },
  {
    num: "03",
    icon: <FiLock />,
    title: "Account Responsibility",
    accent: "#8b5cf6",
    bg: "bg-purple-50",
    border: "border-purple-100",
    iconBg: "bg-purple-100",
    text: "Users are responsible for maintaining the confidentiality of their account credentials. Any activity performed under your account is your sole responsibility. Notify us immediately of any unauthorized use.",
  },
  {
    num: "04",
    icon: <FiShield />,
    title: "Privacy & Data",
    accent: "#22c55e",
    bg: "bg-green-50",
    border: "border-green-100",
    iconBg: "bg-green-100",
    text: "LifeDrop collects and uses personal data only to facilitate blood donation connections. Your information will never be sold or shared with third parties without your consent, except where required by law.",
  },
  {
    num: "05",
    icon: <FiFileText />,
    title: "Use of Platform",
    accent: "#f97316",
    bg: "bg-orange-50",
    border: "border-orange-100",
    iconBg: "bg-orange-100",
    text: "Users must use LifeDrop solely for its intended purpose — facilitating blood donation. Misuse, spamming, fraudulent activities, or any abuse of the platform is strictly prohibited and may result in account termination.",
  },
  {
    num: "06",
    icon: <FiDroplet />,
    title: "Donation Requests",
    accent: "#c6414c",
    bg: "bg-red-50",
    border: "border-red-100",
    iconBg: "bg-[#c6414c]/10",
    text: "All blood donation requests must be genuine and for legitimate medical needs. Fabricated or false requests will result in immediate account suspension or permanent termination without notice.",
  },
  {
    num: "07",
    icon: <FiAlertTriangle />,
    title: "Limitation of Liability",
    accent: "#eab308",
    bg: "bg-yellow-50",
    border: "border-yellow-100",
    iconBg: "bg-yellow-100",
    text: "LifeDrop provides a platform to connect donors and recipients but is not responsible for any direct or indirect outcomes of the blood donation process. Users engage at their own discretion.",
  },
  {
    num: "08",
    icon: <FiEdit />,
    title: "Modifications",
    accent: "#05b4cd",
    bg: "bg-[#05b4cd]/5",
    border: "border-[#05b4cd]/20",
    iconBg: "bg-[#05b4cd]/10",
    text: "LifeDrop reserves the right to modify these terms at any time without prior notice. Continued use of the platform after changes constitutes acceptance of the updated terms.",
  },
  {
    num: "09",
    icon: <FiGlobe />,
    title: "Governing Law",
    accent: "#8b5cf6",
    bg: "bg-purple-50",
    border: "border-purple-100",
    iconBg: "bg-purple-100",
    text: "These terms shall be governed by and construed in accordance with the laws applicable in Bangladesh, where LifeDrop operates. Any disputes shall be resolved through appropriate legal channels.",
  },
  {
    num: "10",
    icon: <FiMail />,
    title: "Contact",
    accent: "#22c55e",
    bg: "bg-green-50",
    border: "border-green-100",
    iconBg: "bg-green-100",
    text: "For any questions, concerns, or clarifications regarding these terms, please contact our support team through the Contact Us page or email us at suronjit02@gmail.com.",
  },
];

const TermsConditions = () => {
  const [active, setActive] = useState(null);

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
          <FiFileText className="text-5xl text-white/80 mx-auto mb-3" />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Terms &amp; Conditions
          </h1>
          <p className="text-white/75 text-sm md:text-base max-w-xl mx-auto">
            Please read these terms carefully before using LifeDrop. By
            accessing the platform, you agree to be bound by the following.
          </p>
        </motion.div>
      </div>

      {/* ── Last updated strip ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 py-3 flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs text-gray-400">
            Last updated: <span className="font-semibold text-gray-600">January 2025</span>
          </span>
          <span className="text-xs text-gray-400">
            Effective for all users of LifeDrop platform
          </span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 sm:px-10 py-14">

        {/* ── Quick navigation pills ── */}
        <motion.div
          className="flex flex-wrap gap-2 mb-12 justify-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {sections.map((s, i) => (
            <a
              key={s.num}
              href={`#term-${s.num}`}
              className="px-3 py-1.5 rounded-full bg-white border border-gray-200 text-xs font-medium text-gray-500 hover:border-[#c6414c]/40 hover:text-[#c6414c] transition-all duration-200"
            >
              {s.num}. {s.title}
            </a>
          ))}
        </motion.div>

        {/* ── Terms sections ── */}
        <div className="flex flex-col gap-5">
          {sections.map((s, i) => (
            <motion.div
              key={s.num}
              id={`term-${s.num}`}
              className={`rounded-2xl border ${s.border} ${s.bg} p-6 group`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: i * 0.04 }}
            >
              <div className="flex items-start gap-4">
                {/* Icon + number */}
                <div className="shrink-0 flex flex-col items-center gap-1">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-base ${s.iconBg}`}
                    style={{ color: s.accent }}
                  >
                    {s.icon}
                  </div>
                  <span className="text-xs font-bold text-gray-300">{s.num}</span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h2
                    className="font-bold text-gray-900 text-base mb-2"
                    style={{ color: s.accent }}
                  >
                    {s.title}
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed">{s.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Agreement acknowledgement ── */}
        <motion.div
          className="mt-12 bg-white rounded-3xl border border-gray-100 shadow-sm p-8 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-14 h-14 rounded-2xl bg-[#c6414c]/10 flex items-center justify-center mx-auto mb-4">
            <FiCheckCircle className="text-[#c6414c] text-2xl" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Your Agreement
          </h3>
          <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed mb-6">
            By using LifeDrop, you acknowledge that you have read, understood,
            and agreed to these Terms &amp; Conditions in their entirety.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/register"
              className="btn btn-sm bg-[#c6414c] hover:bg-white hover:text-[#c6414c] hover:border-[#c6414c] text-white border-transparent rounded-xl gap-2 transition-all duration-300"
            >
              Join LifeDrop <FiArrowRight />
            </Link>
            <Link
              to="/faq"
              className="btn btn-sm bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200 rounded-xl transition-all duration-200"
            >
              Read FAQ
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default TermsConditions;
