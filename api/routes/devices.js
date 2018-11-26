import { Router } from "express";
import dbHelpers from "../../db";
import helpers from "../../utils/helpers";
import _ from 'lodash';
const router = Router();
router.get("/", async (req, res) => {
  await getDevices(req, res);
});

router.post("/", async (req, res) => {
  console.log("receiving data...");
  await insertDevices(req.body, res);
});

async function getDevices(req, res) {
  const collection = await dbHelpers.get().collection("devices");
  if (req.query.udid != null) {
    await collection.find().toArray(function(err, deviceList) {
      let devices = deviceList[0].allDevices;
      res.send(_.find(devices, ["device.udid", req.query.udid]));
    });
  } else {
    await collection.find().toArray(function(err, docs) {
      res.send(docs[0].allDevices);
    });
  }
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
  helpers.insertData(data, res, "devices");
}

export default router;
