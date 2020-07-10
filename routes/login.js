'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const settings = require('./mods/settings');
const tokenMan = require('./mods/managers/token');

const urlencodedParser = bodyParser.urlencoded({ extended: true });
const router = express.Router();


const CALLER = '';

router.get('/', (req, res) => {
  const cookie = req.cookies[settings.COOKIE_NAME];
  if (!cookie) {
    console.log('Cookie not found. Render login form.');
    res.render('login');
  }
  else {
    tokenMan.verify(cookie, (token) => {
      if (token) {
        console.log('Login screen: Still authenticated: ' + token);
        res.redirect('/main');
      }
      else {
        console.log('Not logged-in. Render login form.');
        res.render('login');
      }
    });
  }
  console.log('Exit procedure: GET /login');
});


router.post('/', urlencodedParser, (req, res) => {
  if (!req.body) {
    res.status(400).send('Bad request.');
  }

  const login_id = req.body.login_id;
  const password = req.body.password;

  tokenMan.authenticate(CALLER, login_id, password, (token) => {
    if (!token) {
      console.log('Login failed. Return to login form');
      res.clearCookie(settings.COOKIE_NAME);
      return res.redirect('/login');
    } else {
      console.log('Login successfully.');
      const expires = new Date(Date.now() + settings.COOKIE_EXPIRING_DATE);
      res.cookie(settings.COOKIE_NAME, token, { expires: expires });
      return res.redirect('/main');
    }
  });

  console.log('Exit procedure: POST /login');
});

module.exports = router;
