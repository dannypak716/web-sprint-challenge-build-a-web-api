const express = require('express');
const projectsRouter = require('./projects/projects-router')
const server = express();

server.use(express.json());
server.use(logger);



// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.use('/api/projects', projectsRouter);
// server.use('/api/actions', actionsRouter);



function logger(req, res, next) {
    const timestamp = new Date().toLocaleDateString();
    const method = req.method;
    const url = req.originalUrl;
    console.log(`[${timestamp}] ${method} to ${url}`);
    next();
  }

module.exports = server;

