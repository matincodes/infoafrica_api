const express = require('express')
const path = require('path')
const logger = require('morgan')
const cors = require('cors')

require('dotenv').config()

const resourcesRouter = require('./routes/resources/resources.router')
const companiesRouter = require('./routes/companies/companies.router')
const authRouter = require('./routes/auth/auth.router')

const passport = require('./config/passport.config')

const app = express()

app.use(cors({ origin: 'http://www.generaldimension.com' }))
app.use(logger('dev'))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(passport.initialize())

app.use('/auth', authRouter)
app.use('/resources', resourcesRouter)
app.use('/companies', companiesRouter)

module.exports = app
