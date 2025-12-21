const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

const admin = require("firebase-admin");
const decoded = Buffer.from(process.env.FB_SERVICE_KEY, "base64").toString(
  "utf8"
);
const serviceAccount = JSON.parse(decoded);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const verifyFBToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({ message: "unauthorize access" });
  }

  try {
    const idToken = token.split(" ")[1];
    const decoded = await admin.auth().verifyIdToken(idToken);

    console.log("Decoded info: ", decoded);

    req.decoded_email = decoded.email;
    next();
  } catch (error) {
    return res.status(401).send({ message: "unauthorize access" });
  }
};

//------------------------------------------------------------------------

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.gotmti8.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection

    const database = client.db("lifedrop");
    const userCollections = database.collection("users");
    const requestCollections = database.collection("request");

    // user collection
    app.post("/users", async (req, res) => {
      const userInfo = req.body;
      userInfo.createdAt = new Date();
      userInfo.role = "donor";
      userInfo.status = "active";
      const result = await userCollections.insertOne(userInfo);
      res.send(result);
    });

    // donation request
    app.post("/requests", async (req, res) => {
      const data = req.body;
      const result = await requestCollections.insertOne(data);
      res.send(result);
    });

    // get all users
    app.get("/users", verifyFBToken, async (req, res) => {
      const users = await userCollections.find({}).toArray();
      res.send(users);
    });

    // user role get
    app.get("/users/role/:email", async (req, res) => {
      const { email } = req.params;

      const query = { email: email };
      const result = await userCollections.findOne(query);
      res.send(result);
    });

    // my request get
    app.get("/my-request", verifyFBToken, async (req, res) => {
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

    // get all request
    app.get("/all-request", verifyFBToken, async (req, res) => {
      const request = await requestCollections.find({}).toArray();
      res.send(request);
    });

    // get details
    app.get("/requests/:id", verifyFBToken, async (req, res) => {
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

    // get all request admin
    app.get("/all-requests", verifyFBToken, async (req, res) => {
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

    // pending donation request get
    app.get("/public/requests", async (req, res) => {
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

    // update status
    app.patch("/update/user/status", verifyFBToken, async (req, res) => {
      const { email, status } = req.query;

      const query = { email };
      const updateStatus = {
        $set: { status },
      };

      const result = await userCollections.updateOne(query, updateStatus);
      res.send(result);
    });

    // update role
    app.patch("/update/user/role", verifyFBToken, async (req, res) => {
      const { email, role } = req.query;

      const query = { email };
      const updateRole = {
        $set: { role },
      };

      const result = await userCollections.updateOne(query, updateRole);
      res.send(result);
    });

    // update profile
    app.patch("/update/profile", verifyFBToken, async (req, res) => {
      const email = req.decoded_email;
      const updatedData = req.body;

      delete updatedData.email;

      const result = await userCollections.findOneAndUpdate(
        { email },
        { $set: updatedData },
        { returnDocument: "after" }
      );
      console.log(result);
      res.send(result);
    });

    // update status
    app.patch("/requests/status/:id", verifyFBToken, async (req, res) => {
      const { id } = req.params;
      const { status } = req.body;

      const result = await requestCollections.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status } }
      );

      res.send(result);
    });

    // update pending to inprogress/ for public
    app.patch("/requests/donate/:id", verifyFBToken, async (req, res) => {
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
        }
      );

      res.send(result);
    });

    // delete request
    app.delete("/requests/:id", verifyFBToken, async (req, res) => {
      const { id } = req.params;

      const result = await requestCollections.deleteOne({
        _id: new ObjectId(id),
      });

      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// --------------------------------------------------------------------

app.get("/", (req, res) => {
  res.send("LifeDrop Donation");
});
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
