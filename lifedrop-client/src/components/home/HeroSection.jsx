import React from "react";
import { Link } from "react-router";

const HeroSection = () => {
  return (
    <section className="relative w-full h-[90vh]">
      <img
        src="/hero.jpg"
        alt="Blood Donation"
        className="w-full h-full object-cover"
      />

      <div className="absolute bottom-0 md:top-0 md:right-0 w-full md:w-1/2  h-full flex flex-col justify-center items-center md:items-start bg-white/80 px-5 md:px-10 md:text-left text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-2">
          Join Hands to Save Lives
        </h1>
        <p className="text-md md:text-xl text-gray-800 mb-4 max-w-lg">
          "Donate Your Blood to Us, Save More Life Together"
        </p>

        <div className="flex gap-2 sm:gap-4">
          <Link
            to={"/register"}
            className="btn bg-[#c6414c] hover:bg-red-700 text-white sm:px-6 transition-all duration-500 ease-in-out"
          >
            Join as a Donor
          </Link>
          <Link className="btn bg-white hover:bg-[#c6414c] text-[#c6414c] hover:text-white border border-[#c6414c] transition-all duration-500 ease-in-out">
            Search Donors
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
