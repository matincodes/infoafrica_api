const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const passportJWT = require('passport-jwt')
const bcrypt = require('bcrypt')

const {
  findUserById,
  findUserWithPassword,
} = require('../models/auth.model')

const localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    let user = await findUserWithPassword(username)
    if (!user) return done(null, false, { messages: 'Incorrect username.' })

    const isPasswordValid = await bcrypt.compare(password, user.password.hashed)
    if (!isPasswordValid)
      return done(null, false, { messages: 'Incorrect password.' })

    user = await findUserById(user.id)
    return done(null, user)
  } catch (error) {
    return done(error)
  }
})

const JwtStrategy = passportJWT.Strategy
const ExtractJwt = passportJWT.ExtractJwt

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  jsonWebTokenOptions: {
    expiresIn: '1h',
  },
}

const jwtStrategy = new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
  try {
    const user = await findUserById(jwtPayload.userId)
    if (!user) {
      return done(null, false, { messages: 'User not found' })
    }
    return done(null, user)
  } catch (error) {
    return done(error, false)
  }
})

passport.use(localStrategy)
passport.use(jwtStrategy)

module.exports = passport
