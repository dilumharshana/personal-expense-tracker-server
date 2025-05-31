import express from "express";
import MasterDataController from "../controllers/master-data-controller.js";

const router = express.Router();

/**
 * @route   GET /api/masterdata
 * @desc    Get all master data items
 */
router.get("/", MasterDataController.getAll);

/**
 * @route   POST /api/masterdata
 * @desc    Create a new master data item
 */
router.post("/", MasterDataController.create);

/**
 * @route   PUT /api/masterdata/:id
 * @desc    Update a master data item
 */
router.put("/:id", MasterDataController.update);

/**
 * @route   DELETE /api/masterdata/:id
 * @desc    Delete a master data item
 */
router.delete("/:id", MasterDataController.delete);

export default router;
