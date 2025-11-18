// Site Controllers - handles HTTP requests and responses
// Controllers are like waiters - they take your order (request) and bring you food (response)

import { Request, Response } from "express"
import { SiteService } from "../services/siteService"

// Create an instance of our service
const siteService = new SiteService()

export class SiteController {
  // GET /sites - Get all sites
  getAllSites = (req: Request, res: Response) => {
    try {
      const sites = siteService.getAllSites()

      console.log(`✅ Returning ${sites.length} sites`)
      res.status(200).json(sites)
    } catch (error) {
      console.error("❌ Error getting sites:", error)
      res.status(500).json({ error: "Failed to get sites" })
    }
  }

  // GET /sites/:site_id - Get a specific site
  getSiteById = (req: Request, res: Response) => {
    try {
      const { site_id } = req.params
      const site = siteService.getSiteById(site_id)

      if (!site) {
        return res.status(404).json({ error: "Site not found" })
      }

      console.log(`✅ Returning site: ${site.name}`)
      res.status(200).json(site)
    } catch (error) {
      console.error("❌ Error getting site:", error)
      res.status(500).json({ error: "Failed to get site" })
    }
  }

  // POST /sites - Create a new site
  createSite = (req: Request, res: Response) => {
    try {
      // req.body is already validated by middleware
      const newSite = siteService.createSite(req.body)

      console.log(`✅ Site created with ID: ${newSite.site_id}`)
      res.status(201).json(newSite)
    } catch (error) {
      console.error("❌ Error creating site:", error)
      res.status(500).json({ error: "Failed to create site" })
    }
  }

  // PUT /sites/:site_id - Update a site
  updateSite = (req: Request, res: Response) => {
    try {
      const { site_id } = req.params
      const updatedSite = siteService.updateSite(site_id, req.body)

      if (!updatedSite) {
        return res.status(404).json({ error: "Site not found" })
      }

      console.log(`✅ Site updated: ${updatedSite.name}`)
      res.status(200).json(updatedSite)
    } catch (error) {
      console.error("❌ Error updating site:", error)
      res.status(500).json({ error: "Failed to update site" })
    }
  }

  // DELETE /sites/:site_id - Delete a site
  deleteSite = (req: Request, res: Response) => {
    try {
      const { site_id } = req.params
      const deleted = siteService.deleteSite(site_id)

      if (!deleted) {
        return res.status(404).json({ error: "Site not found" })
      }

      // Return 204 (No Content) for successful deletion
      res.status(204).send()
    } catch (error) {
      console.error("❌ Error deleting site:", error)
      res.status(500).json({ error: "Failed to delete site" })
    }
  }
}
