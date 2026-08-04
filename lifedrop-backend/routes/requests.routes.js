const express = require("express");
const { ObjectId } = require("mongodb");
const verifyFBToken = require("../middleware/verifyFBToken");
const { getDB } = require("../config/db");

const router = express.Router();

router.post("/requests", async (req, res) => {
  const requestCollections = getDB().collection("request");
  const data = req.body;
  const result = await requestCollections.insertOne(data);
  res.send(result);
});

router.get("/my-request", verifyFBToken, async (req, res) => {
  const requestCollections = getDB().collection("request");
  try {
    const email = req.decoded_email;
    const size = Number(req.query.size) || 10;
    const page = Number(req.query.page) || 0;
    const status = req.query.status;

    const query = { requesterEmail: email };
    if (status) {
      query.status = status;
    }

    const totalRequest = await requestCollections.countDocuments(query);

    const request = await requestCollections
      .find(query)
      .skip(size * page)
      .limit(size)
      .sort({ createdAt: -1 })
      .toArray();

    res.send({
      request,
      totalRequest,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/all-request", verifyFBToken, async (req, res) => {
  const requestCollections = getDB().collection("request");
  const request = await requestCollections.find({}).toArray();
  res.send(request);
});

router.get("/requests/:id", verifyFBToken, async (req, res) => {
  const requestCollections = getDB().collection("request");
  const { id } = req.params;

  try {
    const request = await requestCollections.findOne({
      _id: new ObjectId(id),
    });
    if (!request)
      return res.status(404).send({ message: "Request not found" });

    res.send(request);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/all-requests", verifyFBToken, async (req, res) => {
  const requestCollections = getDB().collection("request");
  try {
    const page = Number(req.query.page) || 0;
    const size = Number(req.query.size) || 10;
    const status = req.query.status;

    const query = {};
    if (status) query.status = status;

    const totalRequest = await requestCollections.countDocuments(query);

    const request = await requestCollections
      .find(query)
      .skip(page * size)
      .limit(size)
      .sort({ createdAt: -1 })
      .toArray();

    res.send({ request, totalRequest });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.patch("/requests/status/:id", verifyFBToken, async (req, res) => {
  const requestCollections = getDB().collection("request");
  const { id } = req.params;
  const { status } = req.body;

  const result = await requestCollections.updateOne(
    { _id: new ObjectId(id) },
    { $set: { status } },
  );

  res.send(result);
});

router.patch("/requests/:id", verifyFBToken, async (req, res) => {
  const requestCollections = getDB().collection("request");
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const result = await requestCollections.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData },
    );

    if (result.modifiedCount > 0) {
      res.send({
        modifiedCount: result.modifiedCount,
        message: "Request updated successfully",
      });
    } else {
      res
        .status(400)
        .send({ modifiedCount: 0, message: "No changes made" });
    }
  } catch (err) {
    console.error("Error updating request:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.patch("/requests/donate/:id", verifyFBToken, async (req, res) => {
  const requestCollections = getDB().collection("request");
  const { id } = req.params;
  const { donorName, donorEmail } = req.body;
  const loggedInEmail = req.decoded_email;

  const request = await requestCollections.findOne({
    _id: new ObjectId(id),
  });

  if (!request) {
    return res.status(404).send({ message: "Request not found" });
  }

  if (request.requesterEmail === loggedInEmail) {
    return res
      .status(403)
      .send({ message: "Requester cannot donate own request" });
  }

  if (request.status !== "pending") {
    return res.status(400).send({ message: "Donation already accepted" });
  }

  const result = await requestCollections.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        status: "inprogress",
        donorName,
        donorEmail,
        donatedAt: new Date(),
      },
    },
  );

  res.send(result);
});

router.delete("/requests/:id", verifyFBToken, async (req, res) => {
  const requestCollections = getDB().collection("request");
  const { id } = req.params;

  const result = await requestCollections.deleteOne({
    _id: new ObjectId(id),
  });

  res.send(result);
});

module.exports = router;