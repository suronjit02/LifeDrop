import { Link } from "react-router";

const About = () => {
  return (
    <section className="min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center mb-6">About LifeDrop</h1>

        <p className="text-center text-gray-600 mb-12">
          LifeDrop is a blood donation platform designed to connect voluntary
          blood donors with people in urgent need of blood. The goal of LifeDrop
          is to reduce delays, confusion, and suffering caused by the
          unavailability of blood during critical moments. <br />
          <br />
          Through this platform, users can easily register as blood donors,
          search for available donors based on blood group and location, and
          create blood donation requests when emergencies arise. By organizing
          donor information in a structured and accessible way, LifeDrop helps
          ensure that the right blood reaches the right person at the right
          time.
          <br /> <br />
          LifeDrop is more than just a web application—it is a life-saving
          initiative powered by technology and humanity. Every feature is built
          with a focus on reliability, transparency, and ease of use, so that
          users can take action quickly without technical barriers.
          <br />
          <br />
          We believe that a single blood donation can save a life. LifeDrop aims
          to build a responsible and compassionate community where donating
          blood becomes easier, faster, and more impactful.{" "}
          <strong>
            LifeDrop — because saving lives should never be delayed.
          </strong>
        </p>

        {/* Mission */}
        <div className="mb-10">
          <h2 className="text-2xl text-center font-semibold mb-3 text-gray-800">
            Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to make blood donation easy, fast, and accessible for
            everyone. LifeDrop helps donors and patients connect instantly
            during emergencies and critical situations.
          </p>
        </div>

        {/* Vision */}
        <div className="mb-10">
          <h2 className="text-2xl text-center font-semibold mb-3 text-gray-800">
            Our Vision
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We envision a future where no life is lost due to the unavailability
            of blood. LifeDrop aims to build a strong, trusted, and active donor
            community across the country.
          </p>
        </div>

        {/* Why LifeDrop */}
        <div className="mb-12">
          <h2 className="text-2xl text-center font-semibold mb-6 text-gray-800">
            Why Choose LifeDrop?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="text-center p-6 rounded-md shadow hover:shadow-md transition-shadow duration-300">
              <h3 className="font-semibold mb-2 text-primary">
                Fast & Reliable
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Find blood donors quickly based on blood group and location.
              </p>
            </div>

            <div className="text-center p-6 rounded-md shadow hover:shadow-md transition-shadow duration-300">
              <h3 className="font-semibold mb-2 text-primary ">
                User Friendly
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Simple and clean interface for donors, volunteers, and admins.
              </p>
            </div>

            <div className="text-center p-6 rounded-md shadow hover:shadow-md transition-shadow duration-300">
              <h3 className="font-semibold mb-2 text-primary">
                Secure Platform
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Protected routes and authentication using modern security
                practices.
              </p>
            </div>

            <div className="text-center p-6 rounded-md shadow hover:shadow-md transition-shadow duration-300">
              <h3 className="font-semibold text-center mb-2 text-primary">
                Community Driven
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Encourages social responsibility and community involvement.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Become a Life Saver Today
          </h2>
          <p className="text-gray-600 mb-6">
            Join LifeDrop as a donor and help save lives with a simple act of
            kindness.
          </p>
          <Link
            to={"/register"}
            className="btn bg-[#c6414c] hover:bg-[#e04f5b] text-white sm:px-6 transition-all duration-500 ease-in-out"
          >
            Join as a Donor
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
