const express = require("express");
const { getDB } = require("../config/db");

const router = express.Router();

router.get("/public/requests", async (req, res) => {
  const requestCollections = getDB().collection("request");
  try {
    const requests = await requestCollections
      .find({ status: "pending" })
      .sort({ createdAt: -1 })
      .toArray();

    res.send(requests);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/public/search", async (req, res) => {
  const userCollections = getDB().collection("users");
  const { bloodGroup, district, upazila } = req.query;

  const query = {
    role: "donor",
    status: "active",
  };

  if (bloodGroup) query.blood = bloodGroup;
  if (district) query.district = district;
  if (upazila) query.upazila = upazila;

  try {
    const donors = await userCollections
      .find(query)
      .project({
        name: 1,
        blood: 1,
        district: 1,
        upazila: 1,
      })
      .toArray();

    res.send(donors);
  } catch (err) {
    res.status(500).send([]);
  }
});

module.exports = router;