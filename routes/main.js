'use strict';

const express = require('express');

const tokenMan = require('./mods/managers/token');
const profMan = require('./mods/managers/profile');
const settings = require('./mods/settings');

const router = express.Router();


router.get('/', (req, res) => {
  const jwt = req.cookies[settings.COOKIE_NAME];
  if (!jwt) {
    console.log('Not authenticated.');
    res.redirect('/login');
  }
  else {
    console.log('jwt is: ' + jwt);
    tokenMan.verify(jwt, (token) => {
      if (!token) {
        console.log('Authorization failed. Redirect to login form.');
        res.redirect('/login');
      } else {
        console.log('Authorization succeeded. Show main screen.');
        const caller = '';
        profMan.fetch(caller, jwt, (profile) => {
          const args = {
            profile: profile,
            pretty: true
          };
          res.render('main', args);
        });
      }
    });
  }
  console.log('Exit procedure: GET /main');
});

module.exports = router;
