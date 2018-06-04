import { Router } from "express";
import dbHelpers from "../../db";
import assert from "assert";
const router = Router();
router.get("/", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  await getTestResults(res);
});

router.post("/", async (req, res) => {
  console.log("receiving data...");
  await insertTestResults(req.body, res);
});

async function getTestResults(res) {
  const collection = await dbHelpers.get().collection("testresults");
  await collection.find().toArray(function(err, docs) {
    res.send(docs);
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
