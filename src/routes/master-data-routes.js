import express from "express";
import MasterDataController from "../controllers/master-data-controller.js";

const router = express.Router();

/**
 * @route   GET /api/masterdata
 * @desc    Get all master data items
 */
router.get("/", MasterDataController.getAllMasterData);

/**
 * @route   POST /api/masterdata
 * @desc    Create a new master data item
 */
router.post("/", MasterDataController.createMasterData);

/**
 * @route   PUT /api/masterdata/:id
 * @desc    Update a master data item
 */
router.patch("/:id", MasterDataController.updateMasterData);

/**
 * @route   DELETE /api/masterdata/:id
 * @desc    Delete a master data item
 */
router.delete("/:id", MasterDataController.deleteMasterData);

export default router;
