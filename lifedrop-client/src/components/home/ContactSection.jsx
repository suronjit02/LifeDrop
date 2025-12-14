import React from "react";

const ContactSection = () => {
  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-2">
        <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>

        <form className="bg-white p-8 shadow-md rounded-md space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="input input-bordered w-full"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="input input-bordered w-full"
          />
          <textarea
            placeholder="Your Message"
            className="textarea textarea-bordered w-full"
          ></textarea>

          <button className="btn bg-[#c6414c] hover:bg-red-700 text-white w-full transition-all duration-500 ease-in-out">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
