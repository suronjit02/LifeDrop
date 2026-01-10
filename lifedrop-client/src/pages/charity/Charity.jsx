import React from "react";
import { Link } from "react-router";

const Charity = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <figure className="flex justify-center mb-10">
        <img className="h-12 " src="/public/comonlogo.png" alt="" />
      </figure>

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Charity & Social Impact</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          LifeDrop is committed to saving lives and supporting communities
          through blood donation awareness and humanitarian initiatives.
        </p>
      </div>

      {/* Why Charity Section */}
      <section className="grid md:grid-cols-3 gap-4 mb-16">
        <div className="p-6 border rounded-lg text-center">
          <h3 className="text-xl text-primary font-semibold mb-2">
            Save Lives
          </h3>
          <p className="text-gray-600">
            Every blood donation can save up to three lives. Our charity efforts
            focus on ensuring timely access to blood.
          </p>
        </div>

        <div className="p-6 border rounded-lg text-center">
          <h3 className="text-xl text-primary font-semibold mb-2">
            Support Communities
          </h3>
          <p className="text-gray-600">
            We work with volunteers and donors to support patients during
            emergencies and critical situations.
          </p>
        </div>

        <div className="p-6 border rounded-lg text-center">
          <h3 className="text-xl text-primary font-semibold mb-2">
            Raise Awareness
          </h3>
          <p className="text-gray-600">
            LifeDrop promotes awareness campaigns to encourage safe and regular
            blood donation.
          </p>
        </div>
      </section>

      {/* Ongoing Activities */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Our Ongoing Activities
        </h2>

        <div className="space-y-4 max-w-6xl mx-auto">
          <div className="p-5 border rounded-lg">
            <h4 className="font-medium text-primary text-lg">
              Emergency Blood Support
            </h4>
            <p className="text-gray-600 mt-1">
              Helping patients find blood donors quickly during emergencies.
            </p>
          </div>

          <div className="p-5 border rounded-lg">
            <h4 className="font-medium text-primary text-lg">
              Volunteer Network
            </h4>
            <p className="text-gray-600 mt-1">
              Building a trusted network of voluntary blood donors across
              different locations.
            </p>
          </div>

          <div className="p-5 border rounded-lg">
            <h4 className="font-medium text-primary text-lg">
              Awareness Campaigns
            </h4>
            <p className="text-gray-600 mt-1">
              Organizing digital and community campaigns to promote blood
              donation.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-white/30 backdrop-blur-xl rounded-md border border-red-100 p-10 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Be a Part of This Life-Saving Mission
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-6">
          Your contribution—whether by donating blood or spreading awareness—
          can make a real difference.
        </p>
        <Link
          to={"/register"}
          className="btn bg-[#c6414c] hover:bg-[#e04f5b] text-white sm:px-6 transition-all duration-500 ease-in-out"
        >
          Join as a Donor
        </Link>
      </section>
    </div>
  );
};

export default Charity;
