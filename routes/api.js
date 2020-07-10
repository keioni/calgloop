'use strict';

const express = require('express');
const console = require('console');
const jwt = require('jsonwebtoken');

const settings = require('./mods/api_settings');

const router = express.Router();

function apiLogger(api_name, message, var_name) {
  if (var_name) {
    var_name = ' ' + var_name;
  }
  else {
    var_name = ''
  }
  console.log('API(' + api_name + ')' + var_name + ': ' + message);
}

function auth(body) {
  if (!body) {
    return 400;
  }
  if (!body.jwt) {
    return 401;
  }
  try {
    jwt.verify(body.jwt, settings.JWT_SECRET);
  }
  catch (e) {
    console.log('verify_token: failed.');
    console.log(e.name);
    console.log(e.message);
    return 401;
  }
  return 200;
}

function login_return_value(unique_id) {
  const data = { unique_id: unique_id };
  const secret = settings.JWT_SECRET;
  const options = settings.JWT_SIGNING_OPTIONS;
  return {
    status: true,
    result: {
      jwt: jwt.sign(data, secret, options),
    },
  };
}

router.post('/v1/login', (req, res) => {
  let return_value = {
    status: false,
    result: {},
  };
  console.log('API(/v1/token) login_id: ' + req.body.login_id);
  console.log('API(/v1/token) password: ' + req.body.password);
  if (!req.body.login_id) {
    res.status(400).json(return_value).end();
    return;
  }
  if (req.body.password !== 'password') {
    res.status(401).json(return_value).end();
    return;
  }
  res.json(login_return_value(req.body.login_id));
});
router.get('/v1/login', (req, res) => {
  let return_value = {
    status: false,
    result: {},
  };
  console.log('API(/v1/token) login_id: ' + req.body.login_id);
  console.log('API(/v1/token) password: ' + req.body.password);
  if (!req.body.login_id) {
    res.status(400).json(return_value).end();
    return;
  }
  if (req.body.password !== 'password') {
    res.status(401).json(return_value).end();
    return;
  }
  res.json(login_return_value(req.body.login_id));
});



router.post('/v1/getSensingGadgetInfo', (req, res) => {
  const api_name = '/v1/getSensingGadgetInfo';
  let return_value = {
    status: false,
    result: {},
  };
  apiLogger(api_name, req.body.jwt, 'jwt');
  const response_code = auth(req.body);
  if (response_code !== 200) {
    res.status(response_code).json(return_value).end();
    return;
  }
  apiLogger(api_name, 'authorization succeeded.');
  return_value = {
    status: true,
    result: settings.GADGET_SENSING_SAMPLE_RESULT,
  };
  res.json(return_value);
});
router.get('/v1/getSensingGadgetInfo', (req, res) => {
  const return_value = {
    status: true,
    result: settings.GADGET_SENSING_SAMPLE_RESULT,
  };
  res.send(return_value);
});


router.post('/v1/getMainInfo', (req, res) => {
  const api_name = '/v1/getMainInfo';
  let return_value = {
    status: false,
    result: {}
  };
  apiLogger(api_name, req.body.jwt, 'jwt');
  const response_code = auth(req.body);
  if (response_code !== 200) {
    res.json(return_value).status(response_code).end();
    return;
  }
  apiLogger(api_name, 'authorization succeeded.');
  return_value = {
    status: true,
    result: settings.PROFILE_SAMPLE_RESULT,
  };
  res.json(return_value);
});
router.get('/v1/getMainInfo', (req, res) => {
  const api_name = '/v1/getMainInfo';
  apiLogger(api_name, 'authorization succeeded.');
  const return_value = {
    status: true,
    result: settings.PROFILE_SAMPLE_RESULT,
  };
  res.send(return_value);
});


module.exports = router;
