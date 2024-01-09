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

async function addCompanies(companies) {
  const newCompanies = await prisma.companies.createMany({
    data: companies.map(company => ({
      ...company,
      country: company.country.toLowerCase(),
    })),
  })
}

async function updateCompanies(id, company) {
  const updatedCompany = await prisma.companies.update({
    where: {
      id: parseInt(id),
    },
    data: {
      ...company,
      country: company.country.toLowerCase(),
    },
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
  addCompanies,
  updateCompanies,
  deleteCompany,
}
