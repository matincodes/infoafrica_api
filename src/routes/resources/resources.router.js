const express = require('express')
const passport = require('passport')

const resourcesRouter = express.Router()
const {
  httpGetAllResources,
  httpGetAllResourcesByCountry,
  httpGetAllResourcesByUser,
  httpAddResources,
  httpUpateResources,
  httpDeleteResource,
} = require('./resources.controller')

resourcesRouter.get('/', httpGetAllResources)
resourcesRouter.get(
  '/user',
  passport.authenticate('jwt', { session: false }),
  httpGetAllResourcesByUser,
)
resourcesRouter.get('/:country', httpGetAllResourcesByCountry)
resourcesRouter.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  httpAddResources,
)
resourcesRouter.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  httpUpateResources,
)
resourcesRouter.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  httpDeleteResource,
)

module.exports = resourcesRouter
