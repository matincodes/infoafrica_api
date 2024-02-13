const jwt = require('jsonwebtoken')
const {
  createUser,
  findUserByUsername,
  findUserByEmail,
} = require('../../models/auth.model')

function generateToken(user) {
  return jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  })
}

async function signUp(req, res) {
  const { firstName, lastName, email, username, password } = req.body

  try {
    if (!firstName || !lastName || !email || !username || !password) {
      return res
        .status(400)
        .json({ error: 'Please provide all required fields' })
    }

    // Check if username is already in use
    const existingUser = await findUserByUsername(username)
    if (existingUser) {
      return res.status(400).json({ error: 'Username is already in use' })
    }

    // Check if email is already in use
    const existingEmail = await findUserByEmail(email)
    if (existingEmail) {
      return res.status(400).json({ error: 'Email is already in use' })
    }

    // If not in use, proceed with user creation
    const newUser = await createUser(
      firstName,
      lastName,
      email,
      username,
      password,
    )

    const token = generateToken(newUser)
    res.json({ message: 'User created successfully', user: newUser, token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

async function signIn(req, res) {
  // Passport authentication middleware handles sign-in
  const token = generateToken(req.user)
  res.json({ message: 'Login successful', user: req.user, token })
}

module.exports = {
  signUp,
  signIn,
}
