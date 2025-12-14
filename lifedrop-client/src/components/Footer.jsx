import React from "react";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaPhoneAlt,
  FaYoutube,
} from "react-icons/fa";
import { FaLocationDot, FaSquareXTwitter } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="footer footer-horizontal w-full footer-center bg-red-50 text-base-content p-10 pb-3">
      <nav className="grid grid-flow-row gap-10 md:gap-0 w-full justify-around md:grid-flow-col text-center md:text-left">
        <aside className="">
          <img className="h-10 " src="/lifedrop.jpeg" alt="LifeDrop" />
          <p className="text-left my-2">
            Every drop matters. Every life counts. <br /> Making blood donation
            easier for everyone.
          </p>
          <div className="flex gap-2">
            <FaFacebookSquare className="text-2xl text-primary" />
            <FaSquareXTwitter className="text-2xl text-primary" />
            <FaInstagramSquare className="text-2xl text-primary" />
            <FaYoutube className="text-2xl text-primary" />
          </div>
        </aside>

        <div className="flex flex-col gap-2">
          <h6 className="footer-title">Quick Links</h6>
          <Link className="link link-hover">About us</Link>
          <Link className="link link-hover">Charity</Link>
          <Link className="link link-hover">FAQ</Link>
          <Link className="link link-hover">Terms & Condition</Link>
        </div>

        <div className="flex flex-col gap-2">
          <h6 className="footer-title">Contact Info</h6>
          <Link className="link link-hover flex items-center gap-1">
            <FaLocationDot className="text-primary" />
            Address: Dhaka, Bangladesh
          </Link>
          <Link className="link link-hover flex items-center gap-1">
            <FaPhoneAlt className="text-primary" />
            Phone: +880 123 456 789
          </Link>
          <Link className="link link-hover flex items-center gap-1">
            <IoIosMail className="text-primary" />
            Email: contact@travelease.com
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <h6 className="footer-title">Work Hours</h6>
          <p className="">24 Hour 7 Days</p>
          <p className="text-xl font-semibold">Need For Help? Call Us</p>
          <Link className="btn primary text-white gap-2">
            <FaPhoneAlt /> Contact Us
          </Link>
        </div>
      </nav>

      <aside className="w-full">
        <hr className="w-full text-primary" />
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by
          LifeDrop.
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
