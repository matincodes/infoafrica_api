const express = require('express')
const path = require('path')
const logger = require('morgan')
const cors = require('cors')

const resourcesRouter = require('./routes/resources/resources.router')
const companiesRouter = require('./routes/companies/companies.router')

const app = express()

app.use(cors({ origin: 'https://info-africa.vercel.app' }))
app.use(logger('dev'))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/resources', resourcesRouter)
app.use('/companies', companiesRouter)

module.exports = app
