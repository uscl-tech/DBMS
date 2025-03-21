import { type Request, type Response } from "express"
import { pool } from "../db/db"

// Controller function to add a new avenger
export async function addAvenger(req: Request, res: Response) {
  const { name, power, team } = req.body

  // Validate request body
  if (!name || !power || !team) {
    return res.status(400).json({
      error: "Missing required fields. Please provide name, power, and team.",
    })
  }

  try {
    const client = await pool.connect()
    const result = await client.query(
      "INSERT INTO avengers (name, power, team) VALUES ($1, $2, $3) RETURNING *",
      [name, power, team]
    )
    client.release()

    res.status(201).json({
      message: "Avenger added successfully",
      avenger: result.rows[0],
    })
  } catch (error) {
    console.error("Error adding avenger:", error)
    res.status(500).json({ error: "Failed to add avenger" })
  }
}

// Controller function to get all avengers
export async function getAllAvengers(req: Request, res: Response) {
  try {
    const client = await pool.connect()
    const result = await client.query("SELECT * FROM avengers")
    client.release()

    res.json(result.rows)
  } catch (error) {
    console.error("Error retrieving avengers:", error)
    res.status(500).json({ error: "Failed to retrieve avengers" })
  }
}

// Controller function to get a specific avenger by ID
export async function getAvengerById(req: Request, res: Response) {
  const { id } = req.params

  try {
    const client = await pool.connect()
    const result = await client.query("SELECT * FROM avengers WHERE id = $1", [id])
    client.release()

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Avenger not found" })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error("Error retrieving avenger:", error)
    res.status(500).json({ error: "Failed to retrieve avenger" })
  }
}
