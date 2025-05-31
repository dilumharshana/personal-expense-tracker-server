import express from "express";

// Import api routes
import masterDataRoutes from "./master-data-routes.js";
import expenseRoutes from "./expense-routes.js";

const router = express.Router();

router.use("/master-data", masterDataRoutes);
router.use("/expense", expenseRoutes);

export default router;
