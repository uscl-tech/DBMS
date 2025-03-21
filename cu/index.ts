import express from "express"
import { config } from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"
import { createAvengersTable } from "./db/db"
import { addAvenger, getAllAvengers, getAvengerById } from "./controllers/avenger.controller"
import type { Request, Response } from "express"

// Load environment variables
config()

// Initialize express app
const app = express()

// Middleware
app.use(cors()) // Enable CORS for all routes
app.use(bodyParser.json()) // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })) // Parse URL-encoded bodies
app.use(express.json()) // This is redundant with bodyParser.json() but kept for compatibility

// Create the avengers table when the server starts
createAvengersTable()

// Root route
app.get("/", (req: Request, res: Response) => {
  res.json({ server: "index server ok", status: "running" })
})

// Avengers routes
app.post("/avengers", addAvenger)
app.get("/avengers", getAllAvengers)
app.get("/avengers/:id", getAvengerById)

// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`\n\t Server running on port ${PORT}`)
  console.log(`\n\t POST to http://localhost:${PORT}/avengers to add an avenger`)
  console.log(`\n\t Access the server at http://localhost:${PORT}`)
})

