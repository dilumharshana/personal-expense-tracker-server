// Import modules using ES Modules syntax
import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

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
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;
