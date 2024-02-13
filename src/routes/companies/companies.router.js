const express = require('express')
const passport = require('passport')

const companiesRouter = express.Router()
const {
  httpGetAllCompanies,
  httpGetAllCompaniesByCountry,
  httpGetAllCompaniesByUser,
  httpAddCompanies,
  httpUpdateCompany,
  httpDeleteCompany,
} = require('./companies.controller')

companiesRouter.get('/', httpGetAllCompanies)
companiesRouter.get(
  '/user',
  passport.authenticate('jwt', { session: false }),
  httpGetAllCompaniesByUser,
)
companiesRouter.get('/:country', httpGetAllCompaniesByCountry)
companiesRouter.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  httpAddCompanies,
)
companiesRouter.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  httpUpdateCompany,
)
companiesRouter.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  httpDeleteCompany,
)

module.exports = companiesRouter
