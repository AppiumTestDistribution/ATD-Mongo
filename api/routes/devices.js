import { Router } from "express";
import dbHelpers from "../../db";
import assert from "assert";
const router = Router();
router.get("/", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  await getDevices(res);
});

async function getDevices(res) {
  const collection = await dbHelpers.get().collection("devices");
  await collection
    .find({ deviceState: "AVAILABLE" })
    .toArray(function(err, docs) {
      res.send(docs);
    });
}

export default router;
