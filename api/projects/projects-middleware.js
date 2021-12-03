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

function validatePost(req, res, next) {
    if (!req.body.name || !req.body.name.trim()) {
      res.status(400).json({
        message: 'missing required name field'
      })
    } else if (!req.body.description || !req.body.description.trim()){
        res.status(400).json({
            message: 'missing required description field'
        })
    } else {
      req.name = req.body.name.trim();
      req.description = req.body.description.trim();
      next();
    }
}

module.exports = {
    validateProjectId,
    validatePost
}

