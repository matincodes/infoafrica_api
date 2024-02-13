const bcrypt = require('bcrypt')
const { PrismaClient } = require('@prisma/client')

const log = ['info', 'warn', 'error']
const prisma = new PrismaClient({ log })

async function createUser(firstName, lastName, email, username, password) {
  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      username,
      password: {
        create: {
          hashed: hashedPassword,
        },
      },
    },
  })

  return newUser
}

async function findUserByUsername(username) {
  return await prisma.user.findUnique({ where: { username } })
}

async function findUserByEmail(email) {
  return await prisma.user.findUnique({ where: { email } })
}

async function findUserById(id) {
  return await prisma.user.findUnique({ where: { id } })
}

async function findUserWithPassword(username) {
  return await prisma.user.findUnique({
    where: { username },
    include: {
      password: true,
    },
  })
}

module.exports = {
  createUser,
  findUserByUsername,
  findUserByEmail,
  findUserById,
  findUserWithPassword,
}