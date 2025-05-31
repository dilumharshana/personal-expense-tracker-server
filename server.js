import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
// Load environment variables
dotenv.config();

// Import db connector
import database from "./src/config/db-connection.js";

// Import api route handler
import apiRoutes from "./src/routes/index.js";

// Initialize express app
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

//Routes
app.use("/api", apiRoutes);

// Start server
app.listen(PORT, async () => {
  await database.connect();
  console.log(`🚀 Server running on port : http://localhost:${PORT}/`);
});

export default app;
