const { PrismaClient } = require('@prisma/client')

const log = ['info', 'warn', 'error']

const prisma = new PrismaClient({ log })

const resourcesData = {
  name: 'Lithium',
  country: 'Nigeria',
  resourceLocations: ['Nasarawa', 'Kaduna'],
  miningCompanies: ['Apple'],
  governmentAgencies: ['Department of Energy'],
}

async function getAllResources() {
  const resources = await prisma.resources.findMany({
    include: {
      resourceLocations: true,
      miningCompanies: true,
      governmentAgencies: true,
    },
  })

  return resources
}

async function getAllResourcesByCountry(country) {
  const resources = await prisma.resources.findMany({
    where: {
      country: country.toLowerCase(),
    },
    include: {
      resourceLocations: true,
      miningCompanies: true,
      governmentAgencies: true,
    },
  })

  return resources
}

async function addResources(resource) {
  const newResources = await prisma.resources.create({
    data: {
      name: resource.name,
      country: resource.country.toLowerCase(),
      resourceLocations: {
        createMany: {
          data: resource.resourceLocations.map(location => ({
            location,
          })),
        },
      },
      miningCompanies: {
        createMany: {
          data: resource.miningCompanies.map(company => ({
            company,
          })),
        },
      },
      governmentAgencies: {
        createMany: {
          data: resource.governmentAgencies.map(agency => ({
            agency,
          })),
        },
      },
    },

    include: {
      resourceLocations: true,
      miningCompanies: true,
      governmentAgencies: true,
    },
  })

  return newResources
}

async function updateResources(id, resource) {
  const updatedResource = await prisma.resources.update({
    where: {
      id: parseInt(id),
    },
    data: {
      ...resource,
      country: resource.country.toLowerCase(),
    },
    include: {
      resourceLocations: true,
      miningCompanies: true,
      governmentAgencies: true,
    },
  })
  return updatedResource
}

async function deleteResource(id) {
  const deletedResource = await prisma.resources.delete({
    where: {
      id: parseInt(id),
    },
  })

  return deletedResource
}

module.exports = {
  getAllResources,
  getAllResourcesByCountry,
  addResources,
  updateResources,
  deleteResource,
}
