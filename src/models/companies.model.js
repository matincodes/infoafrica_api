const { PrismaClient } = require('@prisma/client')

const log = ['info', 'warn', 'error']

const prisma = new PrismaClient({ log })

const companyData = {
  country: 'United States',
  name: 'Apple Inc.',
  address: '1 Apple Park Way, Cupertino, CA 95014, United States',
  sector: 'Technology',
  website: 'https://www.apple.com',
  email: 'apple@gmail.com',
  phoneNumber: '1-408-996-1010',
}

async function getAllCompanies() {
  const companies = await prisma.companies.findMany({})

  return companies
}

async function getAllCompaniesByCountry(country) {
  // use prisma to get all companies by country from the database
  const companies = await prisma.companies.findMany({
    where: {
      country: country.toLowerCase(),
    },
  })

  return companies
}

async function getAllCompaniesByUser(user) {
  const companies = await prisma.companies.findMany({
    where: {
      user: {
        is: {
          id: user.id,
        },
      },
    },
  })

  return companies
}

async function addCompanies(companies, user) {
  const newCompanies = await prisma.companies.create({
    data: {
      ...companies[0],
      user: {
        connect: {
          id: user.id,
        },
      },
    }
  })

  return newCompanies
}

async function updateCompany(id, company) {
  const updatedCompany = await prisma.companies.update({
    where: {
      id: parseInt(id),
    },
    data: company,
  })

  return updatedCompany
}

async function deleteCompany(id) {
  const company = await prisma.companies.delete({
    where: {
      id: parseInt(id),
    },
  })

  return company
}

module.exports = {
  getAllCompanies,
  getAllCompaniesByCountry,
  getAllCompaniesByUser,
  addCompanies,
  updateCompany,
  deleteCompany,
}
