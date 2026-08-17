const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: ".env.local" });

const { connectDB } = require("./config/db");

const userRoutes = require("./routes/users.routes");
const requestRoutes = require("./routes/requests.routes");
const publicRoutes = require("./routes/public.routes");
const paymentRoutes = require("./routes/payment.routes");

const port = process.env.PORT || 3000;

const app = express();
app.use(
  cors({
    origin: process.env.SITE_DOMAIN,
    credentials: true,
  }),
);
app.use(express.json());

app.use(userRoutes);
app.use(requestRoutes);
app.use(publicRoutes);
app.use(paymentRoutes);

app.get("/", (req, res) => {
  res.send("LifeDrop Donation");
});

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on ${port}`);
    });
  })
  .catch(console.dir);
