import { Pool } from "pg"
import { config } from "dotenv"

// Load environment variables
config()

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.pgdb,
})

// Function to create the avengers table
export async function createAvengersTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS avengers (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      power VARCHAR(100) NOT NULL,
      team VARCHAR(100) NOT NULL
    );
  `

  try {
    const client = await pool.connect()
    await client.query(createTableQuery)
    console.log("\n\t Avengers table created successfully")
    client.release()
    return true
  } catch (error) {
    console.error("\n\t Error creating avengers table:", error)
    return false
  }
}

// Export the pool for use in other files
export { pool }

