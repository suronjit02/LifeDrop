const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.gotmti8.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let database;

const connectDB = async () => {
  database = client.db("lifedrop");
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
  return database;
};

const getDB = () => database;

module.exports = { connectDB, getDB };