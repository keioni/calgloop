'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.clearCookie('calgloop');
  res.render('logout')
});

module.exports = router;
