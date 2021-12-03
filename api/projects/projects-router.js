const express = require('express');
const {
    validateProjectId,
    validateProject,
    validateProjectUpdate
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

router.get('/:id', validateProjectId, (req, res) => {
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

router.put('/:id', validateProjectId, validateProjectUpdate, async (req, res, next) => {
    try{
        const { id } = req.params
        const { name, description, completed } = req.body
        const updatedProject = await Project.update(id, {
            name: name,
            description: description,
            completed: completed 
        })
        console.log(updatedProject)
        res.status(200).json(updatedProject)
    } catch (err) {
        console.log(err)
        next(err)
    }
})

router.delete('/:id', validateProjectId, async (req, res, next) => {
    try {
        await Project.remove(req.params.id)
        res.json(req.project)
      } catch (err) {
        next(err)
      }
})

router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    try{
        const getActions = await Project.getProjectActions(req.params.id)
        res.json(getActions)
    } catch(err) {
        next(err)
    }
})

router.use((err, req, res, next) => {   // eslint-disable-line
  res.status(err.status || 500).json({
    custom: 'something went wrong in the router',
    message: err.message,
    stack: err.stack
  });
});

module.exports = router;