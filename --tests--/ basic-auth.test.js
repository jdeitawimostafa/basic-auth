'use strict';

const supergoose = require('@code-fellows/supergoose');
const server = require('../src/server.js').server;
const basic = require('../src/middleware/basic.js');
const User = require('../src/models/users-model.js');
const mongoose = require('mongoose');

const mockRequest = supergoose(server);

const object= {
  username:'hussein',
  password:'1234',
};

const req = {};

describe('basic auth',() => {
  it('should create a new one', async() => {
    const res = await mockRequest.post('/api/v1/signup').send(object);
    const resObj = res.body;

    expect(res.status).toBe(201);
    expect(resObj.username).toEqual(object.username);
    expect(resObj.password.length).toBeGreaterThan(0);
  });

  it('should login with post method', async() => {
    const res = await mockRequest.post('/api/v1/signin').auth(object.username,object.password);
    const resObj = res.body;

    expect(res.status).toBe(200);
    expect(resObj.username).toEqual(object.username);
    expect(resObj.password.length).toBeGreaterThan(0);
  });

  it('should throw an error if there is no user and trying to sign in', async() => {

    let test = {
      username:'ahmad',
      password:'1234',
    };
    const res = await mockRequest.post('/api/v1/signin').auth(test.username,test.password);
  

    expect(res.status).toEqual(500);
  });

  it('should throw an error if the user trying to signin and the password is incorrect ', async() => {

    let test = {
      username:'hussein',
      password:'12345',
    };
    const res = await mockRequest.post('/api/v1/signin').auth(test.username,test.password);
  

    expect(res.status).toEqual(500);
  });
});




// it('can create one', async () => {

//     const response = await mockRequest.post('/signup').send(users[userType]);
//     const userObject = response.body;

//     expect(response.status).toBe(201);
//     expect(userObject.token).toBeDefined();
//     expect(userObject.user._id).toBeDefined();
//     expect(userObject.user.username).toEqual(users[userType].username)

//   });