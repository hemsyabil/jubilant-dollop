// Business logic for Sites
// This is where we handle all the operations for sites data

import { Site, CreateSiteRequest, UpdateSiteRequest } from "../types"
import { sitesData, generateId } from "../data/mockData"

export class SiteService {
  // Get all sites
  getAllSites(): Site[] {
    console.log("📋 Getting all sites from data")
    return sitesData
  }

  // Get a specific site by ID
  getSiteById(siteId: string): Site | null {
    console.log(`🔍 Looking for site with ID: ${siteId}`)
    const site = sitesData.find((site) => site.site_id === siteId)

    if (!site) {
      console.log(`❌ Site with ID ${siteId} not found`)
    }

    return site || null
  }

  // Create a new site
  createSite(siteData: CreateSiteRequest): Site {
    // Generate a new unique ID
    const newId = generateId("S", sitesData)
    console.log(`✨ Creating new site with ID: ${newId}`)

    const newSite: Site = {
      site_id: newId,
      ...siteData,
      instruments: siteData.instruments || [],
      comments: siteData.comments || "",
    }

    // Add to our data array
    sitesData.push(newSite)
    console.log(`✅ Site created successfully: ${newSite.name}`)

    return newSite
  }

  // Update an existing site
  updateSite(siteId: string, updateData: UpdateSiteRequest): Site | null {
    console.log(`🔄 Updating site with ID: ${siteId}`)

    const siteIndex = sitesData.findIndex((site) => site.site_id === siteId)

    if (siteIndex === -1) {
      console.log(`❌ Site with ID ${siteId} not found for update`)
      return null
    }

    // Merge existing data with update data
    sitesData[siteIndex] = {
      ...sitesData[siteIndex],
      ...updateData,
    }

    console.log(`✅ Site updated successfully: ${sitesData[siteIndex].name}`)
    return sitesData[siteIndex]
  }

  // Delete a site
  deleteSite(siteId: string): boolean {
    console.log(`🗑️  Attempting to delete site with ID: ${siteId}`)

    const siteIndex = sitesData.findIndex((site) => site.site_id === siteId)

    if (siteIndex === -1) {
      console.log(`❌ Site with ID ${siteId} not found for deletion`)
      return false
    }

    const deletedSite = sitesData.splice(siteIndex, 1)[0]
    console.log(`✅ Site deleted successfully: ${deletedSite.name}`)

    return true
  }
}
