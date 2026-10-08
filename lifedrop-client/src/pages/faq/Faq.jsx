import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import { BiSolidDonateBlood } from "react-icons/bi";
import { FiChevronDown, FiArrowRight, FiHelpCircle } from "react-icons/fi";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

const faqCategories = [
  {
    category: "General",
    color: "text-[#c6414c]",
    activeBg: "bg-[#c6414c]",
    items: [
      {
        question: "What is LifeDrop?",
        answer:
          "LifeDrop is a free blood donation platform that connects voluntary donors with people in urgent need of blood during emergencies. It covers all 64 districts of Bangladesh and is available 24/7.",
      },
      {
        question: "Who can use LifeDrop?",
        answer:
          "Anyone can use LifeDrop — including blood donors, patients, patient relatives, and medical volunteers. The public search is open to all; full features require a free account.",
      },
      {
        question: "Is LifeDrop free to use?",
        answer:
          "Yes, completely free for all users. There are no hidden fees or subscriptions. Our platform is community-funded and donation-supported.",
      },
    ],
  },
  {
    category: "Donors",
    color: "text-[#05b4cd]",
    activeBg: "bg-[#05b4cd]",
    items: [
      {
        question: "Do I need an account to donate blood?",
        answer:
          "Yes. Creating a free account lets you register as a verified donor, appear in search results, and receive donation requests from patients near you.",
      },
      {
        question: "Who can register as a blood donor?",
        answer:
          "Any healthy individual aged 18–60 who meets basic blood donation requirements can register. Donors with chronic conditions should consult their doctor first.",
      },
      {
        question: "How often can I donate blood?",
        answer:
          "Whole blood can typically be donated every 3–4 months. Platelets can be donated more frequently. LifeDrop shows your next eligible donation date on your profile.",
      },
    ],
  },
  {
    category: "Platform",
    color: "text-purple-600",
    activeBg: "bg-purple-600",
    items: [
      {
        question: "How does LifeDrop match donors with patients?",
        answer:
          "Donors are matched based on blood group compatibility and geographic proximity. When a request is created, nearby verified donors are surfaced at the top of results.",
      },
      {
        question: "Is my personal data safe?",
        answer:
          "Yes. LifeDrop uses industry-standard encryption and only shares the minimum necessary information between donors and requesters. Your full address is never publicly visible.",
      },
      {
        question: "Can I search donors without logging in?",
        answer:
          "Basic search by blood group and district is publicly available. Viewing full donor profiles and contact details requires a free account to protect user privacy.",
      },
      {
        question: "What should I do if I face a technical issue?",
        answer:
          "Use the Contact Us page to reach our support team, or call us directly at +880 1739 145813. We aim to respond within 24 hours.",
      },
    ],
  },
];

function AccordionItem({ question, answer, accentBg }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
        open ? "border-gray-200 shadow-sm" : "border-gray-100"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-white hover:bg-gray-50 transition-colors duration-150"
      >
        <span className={`font-semibold text-gray-800 text-sm leading-snug ${open ? "text-gray-900" : ""}`}>
          {question}
        </span>
        <span
          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
            open ? `${accentBg} text-white` : "bg-gray-100 text-gray-400"
          }`}
        >
          <FiChevronDown
            className={`text-sm transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1 bg-white">
              <p className="text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-4">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const Faq = () => {
  const [activeCategory, setActiveCategory] = useState(0);

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
          <FiHelpCircle className="text-5xl text-white/80 mx-auto mb-3" />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-white/75 text-sm md:text-base max-w-xl mx-auto">
            Everything you need to know about LifeDrop — from getting started to
            platform privacy.
          </p>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-6 sm:px-10 py-14">

        {/* ── Category tabs ── */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {faqCategories.map((cat, i) => (
            <button
              key={cat.category}
              onClick={() => setActiveCategory(i)}
              className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                activeCategory === i
                  ? `${cat.activeBg} text-white border-transparent shadow-sm`
                  : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
              }`}
            >
              {cat.category}
            </button>
          ))}
        </motion.div>

        {/* ── FAQ accordion ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="flex flex-col gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            {faqCategories[activeCategory].items.map((faq, i) => (
              <AccordionItem
                key={i}
                question={faq.question}
                answer={faq.answer}
                accentBg={faqCategories[activeCategory].activeBg}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Still have questions strip ── */}
        <motion.div
          className="mt-14 bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#c6414c] mb-2">
                Still have questions?
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                We're here to help
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                Can't find the answer you're looking for? Reach out to our
                support team and we'll get back to you within 24 hours.
              </p>
            </div>

            <div className="flex flex-col gap-3 shrink-0 w-full md:w-auto">
              <a
                href="tel:+8801739145813"
                className="flex items-center gap-3 bg-[#c6414c]/5 border border-[#c6414c]/15 rounded-2xl px-5 py-3 hover:bg-[#c6414c]/10 transition-colors group"
              >
                <div className="w-9 h-9 rounded-xl bg-[#c6414c] flex items-center justify-center shrink-0">
                  <FaPhoneAlt className="text-white text-sm" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Call us</p>
                  <p className="text-sm font-semibold text-[#c6414c]">+880 1739 145813</p>
                </div>
              </a>

              <a
                href="mailto:suronjit02@gmail.com"
                className="flex items-center gap-3 bg-[#05b4cd]/5 border border-[#05b4cd]/15 rounded-2xl px-5 py-3 hover:bg-[#05b4cd]/10 transition-colors group"
              >
                <div className="w-9 h-9 rounded-xl bg-[#05b4cd] flex items-center justify-center shrink-0">
                  <IoIosMail className="text-white text-lg" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Email us</p>
                  <p className="text-sm font-semibold text-[#05b4cd]">suronjit02@gmail.com</p>
                </div>
              </a>
            </div>
          </div>
        </motion.div>

        {/* ── Commitment strip ── */}
        <motion.div
          className="mt-8 bg-[#c6414c] rounded-3xl p-8 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10 pointer-events-none" />
          <div className="relative z-10">
            <BiSolidDonateBlood className="text-4xl text-white/60 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Our Commitment</h3>
            <p className="text-white/70 text-sm max-w-xl mx-auto leading-relaxed mb-6">
              LifeDrop is committed to building a reliable, transparent, and
              life-saving blood donation ecosystem where no life is lost due to
              the unavailability of blood.
            </p>
            <Link
              to="/register"
              className="btn btn-sm bg-white text-[#c6414c] hover:bg-[#c6414c] hover:text-white hover:border-white border-transparent rounded-xl gap-2 transition-all duration-300"
            >
              Join LifeDrop <FiArrowRight />
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Faq;
