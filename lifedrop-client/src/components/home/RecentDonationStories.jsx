import React from "react";
import { BiDonateBlood } from "react-icons/bi";

const stories = [
  {
    id: 1,
    name: "Rahim Ahmed",
    blood: "A+",
    story:
      "I donated blood for the first time through this platform. Knowing that my blood saved a life made me incredibly proud.",
    date: "March 2025",
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    blood: "O-",
    story:
      "Emergency situations need fast responses. This website helped me find a patient quickly and donate without hassle.",
    date: "February 2025",
  },
  {
    id: 3,
    name: "Sabbir Hossain",
    blood: "B+",
    story:
      "Blood donation should be easy for everyone. I’m glad to be part of a community that truly cares about lives.",
    date: "January 2025",
  },
];

const RecentDonationStories = () => {
  return (
    <section className="primary w-full mx-auto py-20 px-2 md:px-40">
      <h2 className="text-3xl font-bold text-center mb-10 text-white">
        Our Recent Donation Stories
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        {stories.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-md p-6 hover:shadow-lg transition-transform duration-300 hover:-translate-y-3"
          >
            <div className="text-center">
              <BiDonateBlood className="text-5xl mx-auto mb-5 text-primary" />
              <p className="italic text-gray-700 mb-4">“{item.story}”</p>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-sm text-gray-500">
                Blood Group: <span className="font-medium">{item.blood}</span>
              </p>
              <p className="text-sm text-gray-400">{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentDonationStories;
