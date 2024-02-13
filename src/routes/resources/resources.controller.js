const {
  getAllResources,
  getAllResourcesByCountry,
  getAllResourcesByUser,
  addResources,
  updateResources,
  deleteResource,
} = require('../../models/resources.model')

async function httpGetAllResources(req, res) {
  try {
    const resources = await getAllResources()

    return res.json(resources)
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

async function httpGetAllResourcesByCountry(req, res) {
  const { country } = req.params

  try {
    const resources = await getAllResourcesByCountry(country)

    return res.json(resources)
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

async function httpGetAllResourcesByUser(req, res) {
  const user = req.user

  try {
    const resources = await getAllResourcesByUser(user)

    return res.json(resources)
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

async function httpAddResources(req, res) {
  const user = req.user

  if (!req.body)
    return res.status(400).json({ error: 'No resource sent to add' })

  const resources = Array.isArray(req.body) ? req.body : [req.body]

  for (const resource of resources) {
    if (
      !resource.country ||
      !resource.name ||
      !resource.resourceLocations ||
      !resource.miningCompanies ||
      !resource.governmentAgencies
    )
      return res.status(400).json({ error: 'Missing required fields' })
  }

  resources.map(resource => (resource.country = resource.country.toLowerCase()))

  try {
    for (const resource of resources) {
      await addResources(resource, user)
    }

    return res.status(201).json({ msg: 'Resources added' })
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

async function httpUpateResources(req, res) {
  const { id } = req.params

  if (!req.body || !id)
    return res.status(400).json({ error: 'No resource sent to update' })

  const resource = req.body

  if (resource.country) resource.country = resource.country.toLowerCase()
  if (resource.resourceLocations)
    resource.resourceLocations = resource.resourceLocations.map(location => ({
      location,
    }))
  if (resource.miningCompanies)
    resource.miningCompanies = resource.miningCompanies.map(company => ({
      company,
    }))
  if (resource.governmentAgencies)
    resource.governmentAgencies = resource.governmentAgencies.map(agency => ({
      agency,
    }))
    

  try {
    const resource = await updateResources(id, resource)

    return res.json(resource)
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

async function httpDeleteResource(req, res) {
  const { id } = req.params

  try {
    const resource = await deleteResource(id)

    return res.json(resource)
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = {
  httpGetAllResources,
  httpGetAllResourcesByCountry,
  httpGetAllResourcesByUser,
  httpAddResources,
  httpUpateResources,
  httpDeleteResource,
}
