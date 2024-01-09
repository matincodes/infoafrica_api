const express = require('express')
const resourcesRouter = express.Router()
const {
  httpGetAllResources,
  httpGetAllResourcesByCountry,
  httpAddResources,
  httpUpateResources,
  httpDeleteResource,
} = require('./resources.controller')

resourcesRouter.get('/', httpGetAllResources)
resourcesRouter.get('/:country', httpGetAllResourcesByCountry)
resourcesRouter.post('/', httpAddResources)
resourcesRouter.put('/:id', httpUpateResources)
resourcesRouter.delete('/:id', httpDeleteResource)

module.exports = resourcesRouter
