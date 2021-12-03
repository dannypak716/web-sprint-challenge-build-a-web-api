const Project = require('./projects-model')

async function validateProjectId(req, res, next) {
    try {
      const project = await Project.get(req.params.id);
      if (!project) {
        next({
          status: 404,
          message: 'user not found'
        })
      } else {
        req.project = project
        next()
      }
    } catch(err) {
      next(err);
    }
}

function validateProject(req, res, next) {
    try {
        if(!req.body.name || !req.body.description) {
            next({
                status: 400,
                message: 'requires a name and description'
            })
        } else {
            next()
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    validateProjectId,
    validateProject
}

