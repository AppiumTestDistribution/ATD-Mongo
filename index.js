#!/usr/bin/env node

import express from 'express';
import { urlencoded, json } from 'body-parser';
import deviceRoutes from './api/routes/devices';
import resultsRoutes from './api/routes/testResults';
import envRoutes from './api/routes/envInfo';
import dbHelpers from './db';
const app = express();

app.use(urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.use(json());
app.use('/devices', deviceRoutes);
app.use('/testresults', resultsRoutes);
app.use('/envInfo', envRoutes);
app.use('/drop', (req, res) => {
  var dbs = dbHelpers.get().dropDatabase();
  res.send('Dropped DB!!!');
});
export default app;
