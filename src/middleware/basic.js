'use strict';

const bcrypt = require('bcrypt');
const base64 = require('base-64');
const User = require('../models/users-model.js');
module.exports = async (req,res,next) =>  {
  try {
    const encoded = req.headers.authorization.split(' ')[1];
    const decoded = base64.decode(encoded);
    const [username,password] = decoded.split(':');
    const user = await User.findOne({username});
    const isValid = await bcrypt.compare(password,user.password);
    if(isValid){
      req.user = user; 
      next();
    }
    else{
      next({error:'Incorrect username or password'});
    }
  } catch (error) {
    next({error:'Incorrect username or password'});
  }
};