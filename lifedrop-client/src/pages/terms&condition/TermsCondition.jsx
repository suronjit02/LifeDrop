import React from "react";

const TermsConditions = () => {
  return (
    <div className="max-w-5xl mx-auto px-2 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-2xl sm:text-4xl font-bold mb-4">
          Terms & Conditions
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Please read these terms and conditions carefully before using
          LifeDrop.
        </p>
      </div>

      {/* Terms List */}
      <div className="space-y-6 text-gray-700 border p-6 rounded-md">
        <section>
          <h2 className="text-2xl font-semibold mb-2">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using LifeDrop, you agree to comply with these terms
            and conditions. If you do not agree, you must not use the platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">2. User Eligibility</h2>
          <p>
            Users must be at least 18 years old or meet the local age
            requirements for donating blood. All information provided must be
            accurate and truthful.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            3. Account Responsibility
          </h2>
          <p>
            Users are responsible for maintaining the confidentiality of their
            account credentials. Any activity under your account is your
            responsibility.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">4. Privacy & Data</h2>
          <p>
            LifeDrop collects and uses personal data only to facilitate blood
            donation requests. User information will not be shared with third
            parties without consent except where required by law.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">5. Use of Platform</h2>
          <p>
            Users must use LifeDrop only for its intended purpose of blood
            donation. Misuse, spamming, or fraudulent activities are strictly
            prohibited.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">6. Donation Requests</h2>
          <p>
            Blood donation requests must be genuine. Any false requests may lead
            to account suspension or termination.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            7. Limitation of Liability
          </h2>
          <p>
            LifeDrop provides a platform to connect donors and recipients but is
            not responsible for any direct or indirect outcomes of the blood
            donation.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">8. Modifications</h2>
          <p>
            LifeDrop reserves the right to modify these terms at any time. Users
            are responsible for reviewing them periodically.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">9. Governing Law</h2>
          <p>
            These terms shall be governed by and construed in accordance with
            the laws applicable in the jurisdiction where LifeDrop operates.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">10. Contact</h2>
          <p>
            For any questions regarding these terms, you can contact LifeDrop
            support through the contact page.
          </p>
        </section>
      </div>

      {/* Footer CTA */}
      <div className="mt-12 text-center">
        <p className="text-gray-600">
          By using LifeDrop, you acknowledge that you have read, understood, and
          agreed to these Terms & Conditions.
        </p>
      </div>
    </div>
  );
};

export default TermsConditions;
