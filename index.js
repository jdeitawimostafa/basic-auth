'use strict';

require('dotenv').config();
const server = require('./src/server');
const express = require('express');
const mongoose = require('mongoose');


mongoose
  .connect(process.env.MONGOOSE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.start(process.env.PORT);
  })
  .catch((e) => console.error('CONNECTION ISSUE', e.message));