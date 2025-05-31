import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

import database from "./src/config/dbConnection.js";

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Start server
app.listen(PORT, async () => {
  await database.connect();
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;
