// Application Controllers - handles HTTP requests and responses for applications

import { Request, Response } from "express"
import { ApplicationService } from "../services/applicationService"

// Create an instance of our service
const applicationService = new ApplicationService()

export class ApplicationController {
  // GET /applications - Get all applications
  getAllApplications = (req: Request, res: Response) => {
    try {
      const applications = applicationService.getAllApplications()

      console.log(`✅ Returning ${applications.length} applications`)
      res.status(200).json(applications)
    } catch (error) {
      console.error("❌ Error getting applications:", error)
      res.status(500).json({ error: "Failed to get applications" })
    }
  }

  // GET /applications/:application_id - Get a specific application
  getApplicationById = (req: Request, res: Response) => {
    try {
      const { application_id } = req.params
      const application = applicationService.getApplicationById(application_id)

      if (!application) {
        return res.status(404).json({ error: "Application not found" })
      }

      console.log(`✅ Returning application: ${application.application_name}`)
      res.status(200).json(application)
    } catch (error) {
      console.error("❌ Error getting application:", error)
      res.status(500).json({ error: "Failed to get application" })
    }
  }

  // POST /applications - Create a new application
  createApplication = (req: Request, res: Response) => {
    try {
      // req.body is already validated by middleware
      const newApplication = applicationService.createApplication(req.body)

      console.log(
        `✅ Application created with ID: ${newApplication.application_id}`
      )
      res.status(201).json(newApplication)
    } catch (error) {
      console.error("❌ Error creating application:", error)
      res.status(500).json({ error: "Failed to create application" })
    }
  }

  // PUT /applications/:application_id - Update an application
  updateApplication = (req: Request, res: Response) => {
    try {
      const { application_id } = req.params
      const updatedApplication = applicationService.updateApplication(
        application_id,
        req.body
      )

      if (!updatedApplication) {
        return res.status(404).json({ error: "Application not found" })
      }

      console.log(
        `✅ Application updated: ${updatedApplication.application_name}`
      )
      res.status(200).json(updatedApplication)
    } catch (error) {
      console.error("❌ Error updating application:", error)
      res.status(500).json({ error: "Failed to update application" })
    }
  }

  // DELETE /applications/:application_id - Delete an application
  deleteApplication = (req: Request, res: Response) => {
    try {
      const { application_id } = req.params
      const deleted = applicationService.deleteApplication(application_id)

      if (!deleted) {
        return res.status(404).json({ error: "Application not found" })
      }

      // Return 204 (No Content) for successful deletion
      res.status(204).send()
    } catch (error) {
      console.error("❌ Error deleting application:", error)
      res.status(500).json({ error: "Failed to delete application" })
    }
  }
}
