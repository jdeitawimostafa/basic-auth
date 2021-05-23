'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userschema = mongoose.Schema({
  username:{type:String,required:true},
  password:{type:String,required:true},
});

userschema.pre('save', async function(next) {
  const hash = await bcrypt.hash(this.password,10);
  this.password = hash;
  next();
});

const User = mongoose.model('users',userschema);

module.exports = User;

