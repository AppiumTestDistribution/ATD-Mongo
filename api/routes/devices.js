import { Router } from "express";
import dbHelpers from "../../db";
import assert from "assert";
const router = Router();
router.get("/", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  await getDevices(res);
});

router.post("/", async (req, res) => {
  console.log("receiving data...");
  await insertDevices(req.body, res);
});

async function getDevices(res) {
  const collection = await dbHelpers.get().collection("devices");
  await collection.find().toArray(function(err, docs) {
    res.send(docs);
  });
}

async function insertDevices(data, res) {
  const collection = await dbHelpers.get().collection("devices");
  await collection.insertOne(data, function(error, response) {
    if (error) {
      res.send("Error occurred while inserting");
    } else {
      res.send("Success");
    }
  });
}

export default router;
