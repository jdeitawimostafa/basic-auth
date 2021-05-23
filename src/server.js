'use strict';


const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const router = require('./auth/routers.js');
const notFound = require('../src/error-handlers/404.js');
const errorHandler = require('../src/error-handlers/500.js');
app.use('/api/v1',router);
app.use('*',notFound);
app.use(errorHandler);

module.exports = {
  server:app,
  start:(port) => {
    const PORT = port || 4000;
    app.listen(PORT,() => {
      console.log(`listining to port ${PORT}`);
    });
  },
};