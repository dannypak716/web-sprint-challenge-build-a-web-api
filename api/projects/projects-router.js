const express = require('express');
const {
    validateProjectId,
    validateProject
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

router.post('/', validateProject, async (req, res, next) => {
    try {
        const newProject = await Project.insert({
            name: req.body.name,
            description: req.body.description,
            completed: req.body.completed || false
        })
        res.status(201).json(newProject)
    } catch (err){
        next(err)
    }
})

// router.put('/:id', (req, res) => {
    
// })

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