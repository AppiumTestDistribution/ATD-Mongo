import { Router } from 'express';
import dbHelpers from '../../db';
import assert from 'assert';
const router = Router();
router.post('/', async (req, res) => {
  await insertEnv(req.body, res);
});

router.get('/', async (req, res) => {
  await getEnvInfo(req.body, res);
});

async function insertEnv(data, res) {
  const collection = await dbHelpers.get().collection('envInfo');
  await collection.insertOne(data, function(error, response) {
    if (error) {
      res.send('Error occurred while inserting');
    } else {
      res.send('Success');
    }
  });
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

async function getEnvInfo(data, res) {
  const collection = await dbHelpers.get().collection('envInfo');
  await collection.find().toArray(function(err, docs) {
    res.send(docs);
  });
}
export default router;
