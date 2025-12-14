import React from "react";

const FeturedSection = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-2">
        <h2 className="text-3xl font-bold text-center mb-10">
          What Do LifeDrop?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="card bg-base-100 shadow-md p-6 text-center">
            <h3 className="text-xl font-semibold text-primary">Quick Search</h3>
            <p className="mt-2 text-gray-600">
              Find blood donors easily by blood group and location.
            </p>
          </div>

          <div className="card bg-base-100 shadow-md p-6 text-center">
            <h3 className="text-xl font-semibold text-primary">
              Trusted Donors
            </h3>
            <p className="mt-2 text-gray-600">
              Verified donors ensure safe and reliable blood donation.
            </p>
          </div>

          <div className="card bg-base-100 shadow-md p-6 text-center">
            <h3 className="text-xl font-semibold text-primary">Save Lives</h3>
            <p className="mt-2 text-gray-600">
              Your single donation can save multiple lives.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeturedSection;
