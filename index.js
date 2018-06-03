#!/usr/bin/env node

import express from "express";
const app = express();
import deviceRoutes from "./api/routes/devices";

app.use('/devices', deviceRoutes);

export default app;