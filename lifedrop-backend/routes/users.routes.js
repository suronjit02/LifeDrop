const express = require("express");
const verifyFBToken = require("../middleware/verifyFBToken");
const { getDB } = require("../config/db");

const router = express.Router();

router.post("/users", async (req, res) => {
  const userCollections = getDB().collection("users");
  const userInfo = req.body;
  userInfo.createdAt = new Date();
  userInfo.role = "donor";
  userInfo.status = "active";
  const result = await userCollections.insertOne(userInfo);
  res.send(result);
});

router.get("/users", verifyFBToken, async (req, res) => {
  const userCollections = getDB().collection("users");
  const users = await userCollections.find({}).toArray();
  res.send(users);
});

router.get("/users/role/:email", async (req, res) => {
  const userCollections = getDB().collection("users");
  const { email } = req.params;

  console.log("Requested email:", email);

  const query = { email: email };
  const result = await userCollections.findOne(query);

  console.log("Found user:", result);

  res.send(result);
});

router.patch("/update/user/status", verifyFBToken, async (req, res) => {
  const userCollections = getDB().collection("users");
  const { email, status } = req.query;

  const query = { email };
  const updateStatus = {
    $set: { status },
  };

  const result = await userCollections.updateOne(query, updateStatus);
  res.send(result);
});

router.patch("/update/user/role", verifyFBToken, async (req, res) => {
  const userCollections = getDB().collection("users");
  const { email, role } = req.query;

  const query = { email };
  const updateRole = {
    $set: { role },
  };

  const result = await userCollections.updateOne(query, updateRole);
  res.send(result);
});

router.patch("/update/profile", verifyFBToken, async (req, res) => {
  const userCollections = getDB().collection("users");
  const email = req.decoded_email;
  const updatedData = req.body;

  delete updatedData.email;

  const result = await userCollections.findOneAndUpdate(
    { email },
    { $set: updatedData },
    { returnDocument: "after" },
  );
  console.log(result);
  res.send(result);
});

module.exports = router;
