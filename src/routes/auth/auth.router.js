// routes/authRoutes.js
const express = require('express')
const passport = require('passport')
const { signIn, signUp } = require('./auth.controller')

const authRouter = express.Router()

// Sign-up endpoint
authRouter.post('/signup', signUp)

// Sign-in endpoint with Passport authentication middleware
authRouter.post(
  '/signin',
  passport.authenticate('local', { /* failureRedirect: '/auth/signin', */ failureMessage: true, session: false,  }),
  signIn,
)

module.exports = authRouter
