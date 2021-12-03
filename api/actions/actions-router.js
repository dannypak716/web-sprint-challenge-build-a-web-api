const express = require('express');

const Action = require('./actions-model')

const router = express.Router();

router.get('/', (req, res, next) => {
    Action.get()
        .then(actions => {
            res.json(actions);
        })
        .catch(next)
})

router.get('/', (req, res) => {
    
})

// router.get('/:id', (req, res) => {
    
// })

// router.post('/', (req, res) => {
    
// })

// router.put('/:id', (req, res) => {
    
// })

// router.delete('/:id', (req, res) => {
    
// })






router.use((err, req, res, next) => {   // eslint-disable-line
    res.status(err.status || 500).json({
      custom: 'something went wrong in the router',
      message: err.message,
      stack: err.stack
    });
  });
  
  module.exports = router;