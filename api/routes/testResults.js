import { Router } from "express";
import dbHelpers from "../../db";
import assert from "assert";
const router = Router();
router.get("/", async (req, res) => {
  await getTestResults(req, res);
});

router.post("/", async (req, res) => {
  console.log("receiving data...");
  await insertTestResults(req.body, res);
});

router.get("/drop", async (req, res) => {
  await dropCollection(res);
});

async function getTestResults(req, res) {
  const collection = await dbHelpers.get().collection("testresults");
  if (req.query.udid != null) {
    await collection
      .find({
        "deviceinfo.device.udid": req.query.udid
      })
      .toArray(function(err, details) {
        res.send(details);
      });
  } else {
    await collection.find().toArray(function(err, docs) {
      res.send(docs);
    });
  }
}

async function dropCollection(res) {
  await dbHelpers
    .get()
    .collection("testresults")
    .drop(function(err, delOK) {
      if (err) res.send("Nothing to Delete");
      if (delOK) res.send("Collection deleted");
    });
}

async function insertTestResults(data, res) {
  const collection = await dbHelpers.get().collection("testresults");
  await collection.insertOne(data, function(error, response) {
    if (error) {
      res.send("Error occurred while inserting");
    } else {
      res.send("Success");
    }
  });
}

export default router;
