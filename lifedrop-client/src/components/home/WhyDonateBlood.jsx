const WhyDonateBlood = () => {
  return (
    <section className="mb-25 ">
      <div className="max-w-7xl mx-auto px-2 sm:px-5 text-center">
        <h2 className="text-3xl font-bold mb-2">Why Donate Blood?</h2>
        <p className="text-gray-700 mb-12">
          A small step from you can save a life. Blood donation is safe, simple,
          and powerful.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 bg-white rounded-md shadow-md">
            <h3 className="text-xl text-primary font-semibold mb-2">
              Save Lives
            </h3>
            <p className="text-gray-700 text-sm">
              One blood donation can save up to three lives in emergency
              situations.
            </p>
          </div>

          <div className="p-6 bg-white rounded-md shadow-md">
            <h3 className="text-xl text-primary font-semibold mb-2">
              Emergency Support
            </h3>
            <p className="text-gray-700 text-sm">
              Helps patients during surgery, accidents, and critical illnesses.
            </p>
          </div>

          <div className="p-6 bg-white rounded-md shadow-md">
            <h3 className="text-xl text-primary font-semibold mb-2">
              Safe & Simple
            </h3>
            <p className="text-gray-700 text-sm">
              Blood donation is a safe process supervised by professionals.
            </p>
          </div>

          <div className="p-6 bg-white rounded-md shadow-md">
            <h3 className="text-xl text-primary font-semibold mb-2">
              Community Impact
            </h3>
            <p className="text-gray-700  text-sm">
              Strengthens community bonding and social responsibility.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyDonateBlood;
