import { Router } from "express";
import { MongoClient } from "mongodb";
import assert from "assert";
const router = Router();
router.get("/", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  await getDevices(res);
});

async function getDevices(res) {
  const url = "mongodb://localhost:27017";
  const dbName = "devices";
  const client = await MongoClient.connect(url);
  console.log("Connected successfully to server");
  const db = await client.db(dbName);
  const collection = await db.collection("test");
  await collection
    .find({ deviceState: "AVAILABLE" })
    .toArray(function(err, docs) {
      res.send(docs);
    });
  await client.close();
}

export default router;
