import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { contactSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate incoming data against the schema
      const contactData = contactSchema.parse(req.body);

      // Log the contact submission (in a production app, you would send an email or store in DB)
      console.log("Contact form submission:", contactData);

      // Send successful response
      res.status(200).json({ 
        success: true, 
        message: "Message received successfully" 
      });
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.format() 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to process contact form" 
        });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
