import React from "react";

const MotoSection = () => {
  return (
    <section className="max-w-7xl mx-auto py-30 flex gap-15 flex-col md:flex-row px-2 sm:px-5 items-center justify-center">
      <blockquote className=" young-serif-regular text-center text-3xl italic  ">
        "Every <span className="text-primary">drop</span> matters. Every{" "}
        <span className="text-primary">life</span> counts. <br />
        Making blood donation easier for everyone."
      </blockquote>
      <img className="h-80 rounded-xl" src="/donate.png" alt="donate blood" />
    </section>
  );
};

export default MotoSection;
