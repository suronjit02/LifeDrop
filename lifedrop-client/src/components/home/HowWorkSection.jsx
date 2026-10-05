import React from "react";
import { motion } from "framer-motion";

const HowWorkSection = () => {
  const cards = [
    {
      title: "Quick Search",
      desc: "Find blood donors easily by blood group and location.",
    },
    {
      title: "Trusted Donors",
      desc: "Verified donors ensure safe and reliable blood donation.",
    },
    {
      title: "Save Lives",
      desc: "Your single donation can save multiple lives.",
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-2 sm:px-5">
        <motion.h2
          className="text-3xl font-bold text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          How LifeDrop Works?
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-4">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              className="card bg-base-100 shadow-md p-6 text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -6, boxShadow: "0 10px 30px rgba(0,0,0,0.12)" }}
            >
              <h3 className="text-xl font-semibold text-primary">{card.title}</h3>
              <p className="mt-2 text-gray-600">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWorkSection;
