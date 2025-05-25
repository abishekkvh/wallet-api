import { sql } from "../config/db.js";
 
export async function getTransactionsByUserId(req,res) {
    try {
      const { userId } = req.params;
      const transactions = await sql`
        SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC
      `;
      res.status(200).json(transactions);
    } catch (error) {
      console.error("Error Getting Transactions:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
}

 export async function createTransaction(req,res) {
        try {
          const { title, amount, category, user_id } = req.body;
      
          if (!title || amount === undefined || !category || !user_id) {
            return res.status(400).json({ message: "All Fields are Required" });
          }
      
          const transaction = await sql`
            INSERT INTO transactions (user_id, title, amount, category)
            VALUES (${user_id}, ${title}, ${amount}, ${category})
            RETURNING *
          `;
      
          res.status(201).json(transaction[0]);
        } catch (error) {
          console.error("Error Creating Transaction:", error);
          res.status(500).json({ message: "Internal Server Error" });
        }
 } 

 export async function deleteTransaction(req,res) {
        try {
          const { id } = req.params;
      
          if (isNaN(parseInt(id))) {
            return res.status(400).json({ message: "Invalid Transaction ID" });
          }
      
          const result = await sql`
            DELETE FROM transactions WHERE id = ${id} RETURNING *
          `;
      
          if (result.length === 0) {
            return res.status(404).json({ message: "Transaction Not Found" });
          }
      
          res.status(200).json({ message: "Transaction deleted successfully" });
        } catch (error) {
          console.error("Error Deleting Transaction:", error);
          res.status(500).json({ message: "Internal Server Error" });
        }
 }

 export  async function getSummaryByUserId(req,res) { 
    try {
      const { userId } = req.params;
  
      const balanceResult = await sql`
        SELECT COALESCE(SUM(amount), 0) AS balance FROM transactions WHERE user_id = ${userId}
      `;
  
      const incomeResult = await sql`
        SELECT COALESCE(SUM(amount), 0) AS income FROM transactions WHERE user_id = ${userId} AND amount > 0
      `;
  
      const expenseResult = await sql`
        SELECT COALESCE(SUM(amount), 0) AS expense FROM transactions WHERE user_id = ${userId} AND amount < 0
      `;
  
      res.status(200).json({
        balance: balanceResult[0].balance,
        income: incomeResult[0].income,
        expense: expenseResult[0].expense,
      });
    } catch (error) {
      console.error("Error Getting Summary:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
}

