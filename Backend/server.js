import { DB_PASSD } from "./.env";
import { MongoClient, ServerApiVersion } from "mongodb";
const uri = `mongodb+srv://recluzedev:${DB_PASSD}@user.eruveun.mongodb.net/?appName=user`;
console.log(uri);
// const uri = `mongodb+srv://recluzedev<i2vCNhwr^BsgQ0x*l%IK8u$a#xw8ceRT^G*Msxx34Qtkpl7Jv!4TayD7rGJ>@user.eruveun.mongodb.net/?appName=user`;

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
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

// export { run };
