import dbHelpers from '../db';

const helpers = {
  async insertData(data, res, collection) {
    const collectionValue = await dbHelpers.get().collection(collection);
    await collectionValue.insertOne(data, function(error, response) {
      if (error) {
        res.send('Error occurred while inserting');
      } else {
        res.send('Success');
      }
    });
  },

  async findData(data, res, collection) {
    const collectionValue = await dbHelpers.get().collection(collection);
    await collectionValue.find().toArray(function(err, docs) {
      res.send(docs);
    });
  }
};

export default helpers;
