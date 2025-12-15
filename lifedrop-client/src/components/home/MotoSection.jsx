import React from "react";

const MotoSection = () => {
  return (
    <section className="max-w-6xl mx-auto py-30 flex gap-15 flex-col md:flex-row px-2 md:px-20 items-center justify-center">
      <blockquote className="text-center text-3xl italic font-semibold ">
        "Every drop matters. Every life counts. Making blood donation easier for
        everyone."
      </blockquote>
      <img className="h-80" src="/donate.png" alt="donate blood" />
    </section>
  );
};

export default MotoSection;
