import { Router } from 'express';
import dbHelpers from '../../db';
import assert from 'assert';
import helpers from '../../utils/helpers';
const router = Router();
router.post('/', async (req, res) => {
  await insertEnv(req.body, res);
});

router.get('/', async (req, res) => {
  await getEnvInfo(req.body, res);
});

router.post('/appium/logs', async (req, res) => {
  await insertAppumLogs(req.body, res);
});

router.get('/appium/logs', async (req, res) => {
  await getAppiumLogs(req.body, res);
});

async function insertEnv(data, res) {
  helpers.insertData(data, res, 'envInfo');
}

async function insertAppumLogs(data, res) {
  helpers.insertData(data, res, 'logs');
}

router.get('/drop', async (req, res) => {
  await dropCollection(res);
});

async function dropCollection(res) {
  await dbHelpers
    .get()
    .collection('envInfo')
    .drop(function(err, delOK) {
      if (err) res.send('Nothing to Delete');
      if (delOK) res.send('Collection deleted');
    });
}

async function getAppiumLogs(data, res) {
  helpers.findData(data, res, 'logs');
}

async function getEnvInfo(data, res) {
  const collection = await dbHelpers.get().collection('envInfo');
  await collection.find().toArray(function(err, docs) {
    res.send(docs);
  });
}
export default router;
