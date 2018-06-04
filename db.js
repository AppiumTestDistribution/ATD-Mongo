import { MongoClient } from "mongodb";
var state = {
  db: null
};
const dbHelper = {
  connect(url, done) {
    if (state.db) return done();
    MongoClient.connect(url, function(err, client) {
      if (err) return done(err);
      state.db = client.db("report");
      done();
    });
  },

  get() {
    return state.db;
  },

  close(done) {
    if (state.db) {
      state.db.close(function(err, result) {
        state.db = null;
        state.mode = null;
        done(err);
      });
    }
  }
};
export default dbHelper;
