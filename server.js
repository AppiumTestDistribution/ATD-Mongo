#!/usr/bin/env node
import http from 'http';
import app from './index';
import dbHelpers from './db';
import chalk from 'chalk';

const port = process.env.MONGOAPIPORT || 3000;
const mongoPort = process.env.MONGOPORT || 27017;
const mongoIP = process.env.MONGOIP || 'localhost';

dbHelpers.connect(
  `mongodb://${mongoIP}:${mongoPort}/report`,
   err => {
    if (err) {
      console.log(chalk.blue(`Unable to connect to Mongo ${err}`));
      process.exit(1);
    } else {
      app.listen(port, function() {
        console.log(chalk.blue(`Listening on port ${mongoPort} and IP ${mongoIP}`));
      });
    }
  }
);
