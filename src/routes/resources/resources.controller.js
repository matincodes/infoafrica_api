const {
  getAllResources,
  getAllResourcesByCountry,
  addResources,
  updateResources,
  deleteResource,
} = require('../../models/resources.model')

async function httpGetAllResources(req, res) {
  try {
    const resources = await getAllResources()

    return res.json(resources)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

async function httpGetAllResourcesByCountry(req, res) {
  const { country } = req.params

  try {
    const resources = await getAllResourcesByCountry(country)

    return res.json(resources)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

async function httpAddResources(req, res) {
  if (!req.body)
    return res.status(400).json({ error: 'No resource sent to add' })

  const resources = Array.isArray(req.body) ? req.body : [req.body]
  try {
    for (const resource of resources) {
      await addResources(resource)
    }

    return res.status(201).json({ msg: 'Resources added' })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

async function httpUpateResources(req, res) {
  const { id } = req.params

  if (!req.body || !id)
    return res.status(400).json({ error: 'No resource sent to update' })

  try {
    const resource = await updateResources(id, req.body)

    return res.json(resource)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

async function httpDeleteResource(req, res) {
  const { id } = req.params

  try {
    const resource = await deleteResource(id)

    return res.json(resource)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

module.exports = {
  httpGetAllResources,
  httpGetAllResourcesByCountry,
  httpAddResources,
  httpUpateResources,
  httpDeleteResource,
}
