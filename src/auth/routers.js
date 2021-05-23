'use strict';
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const express = require('express');
const server = require('../server.js');
const User = require('../models/users-model.js');
const mongoose = require('mongoose');
const router = express.Router();
const basicAuth = require('../middleware/basic.js');
router.post('/signup',signup);
router.post('/signin',signin);

async function signup(req,res,next){
  try {
    const { username, password} = req.body;
    const user = new User({username,password});
    const insert = await user.save();
    res.status(201).json(insert);
  } catch (error) {
    res.status(403).json({error:error.message});
  }
}

function signin(req,res,next){
  res.status(200).json(req.user);
}

module.exports = router; 