#!/usr/bin/env node

import express from "express";
import { urlencoded, json } from "body-parser";
import deviceRoutes from "./api/routes/devices";
import resultsRoutes from "./api/routes/testResults";
const app = express();

app.use(urlencoded({ extended: false }));
app.use(json());
app.use("/devices", deviceRoutes);
app.use("/testresults", resultsRoutes);
export default app;
