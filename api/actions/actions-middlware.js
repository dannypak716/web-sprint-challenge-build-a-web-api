const Action = require('./actions-model')

async function validateActionId(req, res, next) {
    try {
      const action = await Action.get(req.params.id);
      if (!action) {
        next({
          status: 404,
          message: 'project not found'
        })
      } else {
        req.action = action
        next()
      }
    } catch(err) {
      next(err);
    }
}

function validateAction(req, res, next) {
    try {
        if(!req.body.project_id || !req.body.description || !req.body.notes) {
            next({
                status: 400,
                message: 'action requires project_id, description, and notes'
            })
        } else {
            next()
        }
    } catch (err) {
        next(err)
    }
}

function validateActionUpdate(req, res, next) {
    try {
        if(req.body.project_id && 
            req.body.name && 
            req.body.description && 
            req.body.completed !== undefined) {
            next()
        } else {
            next({
              status: 400,
              message: 'requires a project_id, description, notes, and completed status'
          })
        }
    } catch (err) {
        next(err)
    }
  }

module.exports = {
    validateActionId,
    validateAction,
    validateActionUpdate
}