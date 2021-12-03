const express = require('express');

const Action = require('./actions-model')

const router = express.Router();



router.use((err, req, res, next) => {   // eslint-disable-line
    res.status(err.status || 500).json({
      custom: 'something went wrong in the router',
      message: err.message,
      stack: err.stack
    });
  });
  
  module.exports = router;