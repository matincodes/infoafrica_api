const {
  getAllCompanies,
  getAllCompaniesByCountry,
  addCompanies,
  updateCompanies,
  deleteCompany,
} = require('../../models/companies.model')

async function httpGetAllCompanies(req, res) {
  try {
    const companies = await getAllCompanies()

    return res.json(companies)
  } catch (error) {
    return res.status(400).json({ error: error.message })
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
    return res.status(400).json({ error: error.message })
  }
}

async function httpAddCompanies(req, res) {
  if (!req.body)
    return res.status(400).json({ error: 'No company sent to add' })

  try {
    const newCompany = await addCompanies(
      Array.isArray(req.body) ? req.body : [req.body],
    )

    return res.status(201).json('Added companies')
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

async function httpUpdateCompanies(req, res) {
  const { id } = req.params
  if (!req.body || !id)
    return res.status(400).json({ error: 'No company sent to update' })

  try {
    const company = await updateCompanies(id, req.body)

    return res.json(company)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

async function httpDeleteCompany(req, res) {
  const { id } = req.params
  if (!id) return res.status(400).json({ error: 'No company sent to delete' })

  try {
    const company = await deleteCompany(id)

    return res.json(company)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

module.exports = {
  httpGetAllCompanies,
  httpGetAllCompaniesByCountry,
  httpAddCompanies,
  httpUpdateCompanies,
  httpDeleteCompany,
}
