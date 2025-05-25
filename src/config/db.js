import {neon} from "@neondatabase/serverless";

import "dotenv/config";

// Initialize DB
export async function initDb() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS transactions (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        category VARCHAR(255) NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log("Database Initialized Successfully");
  } catch (error) {
    console.error("Error Initializing DB:", error);
    process.exit(1);
  }
}

// Create a connection using our database connection string
export const sql = neon(process.env.DATABASE_URL)