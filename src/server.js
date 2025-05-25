import express from "express";
import dotenv from "dotenv";
import postgres from "postgres";
import rateLimiter from "./middleware/rateLimiter.js"; 
import transactionsRoute from "./routes/transactionsRoute.js";
import { initDb } from "./config/db.js";
import job from "./config/cron.js";

//Initialize .env file
dotenv.config();

if(proces.env.NODE_ENV ==="production") job.start(); // Make the Server alive every 14 minutes

const app = express();
const PORT = process.env.PORT || 5001;

app.get("/api", (req,res) => {
  res.status(200).json({status: "ok"})
});

// Middleware
app.use(rateLimiter);
app.use(express.json());
app.use("/api/transactions", transactionsRoute); 

// PostgreSQL connection
const sql = postgres(process.env.DATABASE_URL);



// Start server after DB init
initDb().then(() => {
  app.listen(PORT, () => {
    console.log("Server is Up and Running on PORT:", PORT);
  });
});

app.get("/health",  (req,res) => {
    res.send("It is Working")

})
console.log("My Port:", process.env.PORT);
