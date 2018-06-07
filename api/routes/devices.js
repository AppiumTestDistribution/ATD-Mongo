import { Router } from "express";
import dbHelpers from "../../db";
import assert from "assert";
const router = Router();
router.get("/", async (req, res) => {
  await getDevices(res);
});

router.get("/drop", async (req, res) => {
  await dropCollection(res);
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

async function dropCollection(res) {
  await dbHelpers
    .get()
    .collection("devices")
    .drop(function(err, delOK) {
      if (err) res.send("Nothing to Delete");
      if (delOK) res.send("Collection deleted");
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
