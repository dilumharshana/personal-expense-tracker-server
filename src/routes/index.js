import express from "express";

import masterDataRoutes from "./master-data-routes.js";

const router = express.Router();

router.use("/master-data", masterDataRoutes);

export default router;
