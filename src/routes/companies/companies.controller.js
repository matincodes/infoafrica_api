const {
  getAllCompanies,
  getAllCompaniesByCountry,
  getAllCompaniesByUser,
  addCompanies,
  updateCompany,
  deleteCompany,
} = require('../../models/companies.model')

async function httpGetAllCompanies(req, res) {
  try {
    const companies = await getAllCompanies()

    return res.json(companies)
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

async function httpGetAllCompaniesByCountry(req, res) {
  const { country } = req.params

  if (!country)
    return res.status(400).json({ error: 'No country sent to get companies' })

  try {
    const companies = await getAllCompaniesByCountry(country)

    return res.json(companies)
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

async function httpGetAllCompaniesByUser(req, res) {
  const user = req.user

  if (!country || !username)
    return res
      .status(400)
      .json({ error: 'No country or username sent to get companies' })

  try {
    const companies = await getAllCompaniesByUser(user)

    return res.json(companies)
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

async function httpAddCompanies(req, res) {
  const user = req.user
  
  if (!req.body)
    return res.status(400).json({ error: 'No company sent to add' })

  const companies = Array.isArray(req.body) ? req.body : [req.body]

  for (const company of companies) {
    if (
      !company.country ||
      !company.name ||
      !company.email ||
      !company.phoneNumber ||
      !company.address ||
      !company.sector ||
      !company.website
    )
      return res.status(400).json({ error: 'Missing required fields' })
  
  }

  companies.map(company => (company.country = company.country.toLowerCase()))

  try {
    await addCompanies(companies, user)

    return res.status(201).json({ msg: 'Added companies' })
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

async function httpUpdateCompany(req, res) {
  const { id } = req.params

  if (!req.body || !id)
    return res.status(400).json({ error: 'No company sent to update' })

  const company = req.body

  if (company.country) company.country = company.country.toLowerCase()

  try {
    const updatedCompany = await updateCompany(id, company)

    return res.json(updatedCompany)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

async function httpDeleteCompany(req, res) {
  const { id } = req.params

  if (!id) return res.status(400).json({ error: 'No company sent to delete' })

  try {
    const company = await deleteCompany(id)

    return res.json(company)
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = {
  httpGetAllCompanies,
  httpGetAllCompaniesByCountry,
  httpGetAllCompaniesByUser,
  httpAddCompanies,
  httpUpdateCompany,
  httpDeleteCompany,
}
