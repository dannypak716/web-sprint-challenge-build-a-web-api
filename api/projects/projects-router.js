const express = require('express');
const {
    validateProjectId,
    validatePost
} = require('./projects-middleware')

const Project = require('./projects-model')

const router = express.Router();

router.get('/', (req, res, next) => {
    Project.get()
        .then(projects => {
            res.json(projects);
        })
        .catch(next)
})

router.get('/:id', validateProjectId, async (req, res) => {
    res.json(req.project)
})

router.post('/', validatePost, (req, res, next) => {
    Project.insert({name: req.name, description: req.description})
        .then(project => {
            res.status(201).json(project)
        })
        .catch(next)
})

router.put('/:id', (req, res) => {
    
})

// router.delete('/:id', (req, res) => {
    
// })

// router.get('/:id/actions', (req, res) => {
    
// })

router.use((err, req, res, next) => {   // eslint-disable-line
  res.status(err.status || 500).json({
    custom: 'something went wrong in the hubs router',
    message: err.message,
    stack: err.stack
  });
});

module.exports = router;