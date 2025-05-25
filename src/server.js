import express from "express";
import dotenv from "dotenv";
import postgres from "postgres";
import rateLimiter from "./middleware/rateLimiter.js"; 
import transactionsRoute from "./routes/transactionsRoute.js";
import { initDb } from "./config/db.js";

//Initialize .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

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
