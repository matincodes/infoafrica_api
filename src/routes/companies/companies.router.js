const express = require('express')
const companiesRouter = express.Router()
const {
  httpGetAllCompanies,
  httpGetAllCompaniesByCountry,
  httpAddCompanies,
  httpUpdateCompanies,
  httpDeleteCompany,
} = require('./companies.controller')

companiesRouter.get('/', httpGetAllCompanies)
companiesRouter.get('/:country', httpGetAllCompaniesByCountry)
companiesRouter.post('/', httpAddCompanies)
companiesRouter.put('/:id', httpUpdateCompanies)
companiesRouter.delete('/:id', httpDeleteCompany)

module.exports = companiesRouter
