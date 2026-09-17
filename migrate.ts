import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-serverless";
import { migrate } from "drizzle-orm/neon-serverless/migrator";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import * as schema from "./db/schema";

config({ path: [".env.local", ".env"] });

neonConfig.webSocketConstructor = ws;

async function runMigrations() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
  const db = drizzle(pool, { schema });

  try {
    await migrate(db, { migrationsFolder: "./db/migrations" });
    console.log("Migrations applied successfully");
  } catch (error) {
    console.error("Migration failed: ", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runMigrations();
