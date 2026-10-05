import { motion } from "framer-motion";

const WhyDonateBlood = () => {
  return (
    <section className="mb-25 ">
      <div className="max-w-7xl mx-auto px-2 sm:px-5 text-center">
        <motion.h2
          className="text-3xl font-bold mb-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          Why Donate Blood?
        </motion.h2>
        <motion.p
          className="text-gray-700 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          A small step from you can save a life. Blood donation is safe, simple,
          and powerful.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: "Save Lives",
              desc: "One blood donation can save up to three lives in emergency situations.",
            },
            {
              title: "Emergency Support",
              desc: "Helps patients during surgery, accidents, and critical illnesses.",
            },
            {
              title: "Safe & Simple",
              desc: "Blood donation is a safe process supervised by professionals.",
            },
            {
              title: "Community Impact",
              desc: "Strengthens community bonding and social responsibility.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              className="p-6 bg-white rounded-md shadow-md"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6, boxShadow: "0 10px 30px rgba(0,0,0,0.12)" }}
            >
              <h3 className="text-xl text-primary font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-gray-700 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyDonateBlood;
