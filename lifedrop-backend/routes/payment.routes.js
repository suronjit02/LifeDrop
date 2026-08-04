const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRATE);

const router = express.Router();

router.post("/create-payment-checkout", async (req, res) => {
  try {
    const { donateAmount, donorEmail, donorName } = req.body;
    if (!donateAmount || !donorEmail || !donorName) {
      return res.status(400).send({ message: "All fields required" });
    }
    const amount = parseInt(donateAmount) * 100;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: amount,
            product_data: {
              name: "Donation",
              description: `Donation by ${donorName}`,
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: donorEmail,
      metadata: { donorName },
      success_url: `${process.env.SITE_DOMAIN}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.SITE_DOMAIN}/payment-cancel`,
    });

    res.send({ url: session.url });
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/verify-payment", async (req, res) => {
  try {
    const { session_id } = req.query;

    if (!session_id) {
      return res
        .status(400)
        .send({ success: false, message: "session_id required" });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === "paid") {
      return res.send({
        success: true,
        amount: session.amount_total / 100,
        email: session.customer_email,
      });
    } else {
      return res.send({ success: false, message: "Payment not completed" });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;