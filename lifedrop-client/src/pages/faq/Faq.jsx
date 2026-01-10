import React from "react";

const faqs = [
  {
    question: "What is LifeDrop?",
    answer:
      "LifeDrop is a blood donation platform that connects voluntary donors with people in need of blood during emergencies.",
  },
  {
    question: "Who can use LifeDrop?",
    answer:
      "Anyone can use LifeDrop, including blood donors, patients, and patient relatives.",
  },
  {
    question: "Is LifeDrop free to use?",
    answer: "Yes, LifeDrop is completely free for all users.",
  },
  {
    question: "Do I need an account to donate blood?",
    answer:
      "Yes, you need to create an account to register as a donor or create blood requests.",
  },
  {
    question: "Who can register as a blood donor?",
    answer:
      "Any healthy individual who meets basic blood donation requirements can register as a donor.",
  },
  {
    question: "How often can I donate blood?",
    answer:
      "Generally, blood can be donated every 3 to 4 months depending on medical guidelines.",
  },
  {
    question: "How does LifeDrop match donors?",
    answer:
      "Donors are matched based on blood group and location to ensure quick response.",
  },
  {
    question: "Is my personal data safe?",
    answer:
      "Yes, LifeDrop prioritizes data privacy and only shares necessary information.",
  },
  {
    question: "Can I search donors without login?",
    answer: "Basic search is public, but viewing full details requires login.",
  },
  {
    question: "What should I do if I face a technical issue?",
    answer:
      "You can contact support through the contact page or report issues from your dashboard.",
  },
];

const Faq = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <figure className="flex justify-center mb-10">
        <img className="h-12 " src="/public/lifedrop.png" alt="" />
      </figure>
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4">
        Frequently Asked Questions
      </h1>
      <p className="text-center text-gray-500 mb-10">
        Everything you need to know about LifeDrop
      </p>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="group rounded-lg border border-gray-200 p-4"
          >
            <summary className="cursor-pointer font-medium text-lg flex justify-between items-center">
              {faq.question}
              <span className="transition group-open:rotate-180">⌄</span>
            </summary>
            <p className="mt-3 text-gray-600">{faq.answer}</p>
          </details>
        ))}
      </div>

      {/* Extra Professional Section */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-3">Our Commitment</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          LifeDrop is committed to building a reliable, transparent, and
          life-saving blood donation ecosystem where no life is lost due to the
          unavailability of blood.
        </p>
      </div>
    </div>
  );
};

export default Faq;
