import React from "react";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaLinkedin,
  FaPhoneAlt,
  FaYoutube,
} from "react-icons/fa";
import { FaLocationDot, FaSquareXTwitter } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { BiSolidDonateBlood } from "react-icons/bi";
import { Link } from "react-router";

const socialLinks = [
  {
    icon: <FaLinkedin />,
    href: "https://www.linkedin.com/in/suronjit02/",
    label: "LinkedIn",
  },
  {
    icon: <FaFacebookSquare />,
    href: "https://www.facebook.com/suronjit02",
    label: "Facebook",
  },
  { icon: <FaSquareXTwitter />, href: "", label: "Twitter" },
  {
    icon: <FaInstagramSquare />,
    href: "https://www.instagram.com/suronjit02/",
    label: "Instagram",
  },
  { icon: <FaYoutube />, href: "", label: "YouTube" },
];

const quickLinks = [
  { label: "About Us", to: "/about" },
  { label: "Charity", to: "/charity" },
  { label: "FAQ", to: "/faq" },
  { label: "Terms & Condition", to: "/terms-&-condition" },
  { label: "Search Donors", to: "/search-donors" },
  { label: "Donate Now", to: "/donate" },
];

const contactInfo = [
  { icon: <FaLocationDot />, text: "Dhaka, Bangladesh" },
  { icon: <FaPhoneAlt />, text: "+880 1739 145813" },
  { icon: <IoIosMail />, text: "suronjit02@gmail.com" },
];

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* ── Top CTA strip ── */}
      <div className="bg-primary">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
              <BiSolidDonateBlood className="text-white text-xl" />
            </div>
            <div>
              <p className="text-white font-bold text-lg leading-tight">
                Ready to save a life?
              </p>
              <p className="text-white/70 text-sm">
                Register as a donor today — it takes less than 2 minutes.
              </p>
            </div>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link
              to="/register"
              className="btn btn-sm bg-white text-primary hover:bg-gray-100 border-transparent rounded-xl font-semibold transition-all duration-300"
            >
              Join as Donor
            </Link>
            <Link
              to="/search-donors"
              className="btn btn-sm bg-white/15 hover:bg-white/25 text-white border border-white/20 rounded-xl transition-all duration-300"
            >
              Find Donors
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main footer body ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img className="h-9" src="/lifedrop.png" alt="LifeDrop" />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Every drop matters. Every life counts. Making blood donation
              easier for everyone, everywhere.
            </p>
            {/* Social icons */}
            <div className="flex gap-2">
              {socialLinks.map((s) => (
                <Link
                  key={s.label}
                  to={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl bg-white/8 hover:bg-primary text-gray-400 hover:text-white flex items-center justify-center text-base transition-all duration-300"
                >
                  {s.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h6 className="text-white font-semibold text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-primary inline-block" />
              Quick Links
            </h6>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-gray-400 hover:text-[#05b4cd] text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-[#05b4cd] transition-colors duration-200 shrink-0" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h6 className="text-white font-semibold text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-primary inline-block" />
              Contact Info
            </h6>
            <ul className="flex flex-col gap-4">
              {contactInfo.map((c) => (
                <li key={c.text} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center text-primary text-sm shrink-0 mt-0.5">
                    {c.icon}
                  </div>
                  <span className="text-gray-400 text-sm leading-relaxed">
                    {c.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Work hours */}
          <div>
            <h6 className="text-white font-semibold text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-primary inline-block" />
              Work Hours
            </h6>
            <div className="bg-white/5 rounded-2xl border border-white/10 p-5 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shrink-0" />
                <span className="text-white font-semibold text-sm">
                  Available 24 / 7
                </span>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed">
                Our team is always online. Reach out anytime — day or night.
              </p>
              <Link
                to="/"
                className="btn btn-sm bg-primary hover:bg-white hover:text-primary hover:border-primary text-white border-transparent rounded-xl gap-2 w-full transition-all duration-300"
              >
                <FaPhoneAlt className="text-xs" /> Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} LifeDrop. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <span>Made with</span>
            <span className="text-primary">♥</span>
            <span>to save lives</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
