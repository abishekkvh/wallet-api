import express from "express";
import { getTransactionsByUserId } from "../controllers/transactionsController.js";
import { createTransaction } from "../controllers/transactionsController.js"
import { deleteTransaction } from "../controllers/transactionsController.js";
import { getSummaryByUserId  } from "../controllers/transactionsController.js";


const router = express.Router();

// 🔹 Get transactions by user
router.get("/:userId", getTransactionsByUserId);
  
  // 🔹 Create a new transaction
router.post("/", createTransaction);
  
  // 🔹 Delete a transaction
router.delete("/:id", deleteTransaction);
  
  // 🔹 Summary of income/expenses
router.get("/summary/:userId", getSummaryByUserId);
  

export default router;