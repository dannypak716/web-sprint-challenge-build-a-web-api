const express = require('express');
const {
    validateActionId,
    validateAction,
    validateActionUpdate
} = require('./actions-middlware')

const Action = require('./actions-model')

const router = express.Router();

router.get('/', (req, res, next) => {
    Action.get()
        .then(actions => {
            res.json(actions);
        })
        .catch(next)
})

router.get('/:id', validateActionId, (req, res) => {
    res.json(req.action)
})

router.post('/', validateAction, async (req, res, next) => {
    try{
        const newAction = await Action.insert({
            project_id: req.body.project_id,
            description: req.body.description,
            notes: req.body.notes,
            completed: req.body.completed || false
        })
        res.status(201).json(newAction)
    } catch(err) {
        next(err)
    }
})

router.put('/:id', validateActionId, validateActionUpdate, async (req, res, next) => {
    try{ 
        const updatedAction = await Action.update(req.params.id, req.body)
        res.status(200).json(updatedAction)
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', validateActionId, async (req, res, next) => {
    try {
        await Action.remove(req.params.id)
        res.json(req.action)
    } catch (err) {
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