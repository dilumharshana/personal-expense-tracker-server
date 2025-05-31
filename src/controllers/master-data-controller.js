import MasterDataService from "../services/master-data-service.js";
import { validateRecordId } from "../utils/validators.js";

/**
 * MasterData Controller - Handles HTTP requests for master data operations
 */
class MasterDataController {
  /**
   * Get all master data items
   */
  static async getAllMasterData(req, res, next) {
    try {
      const items = await MasterDataService.getAll();
      res.status(200).json(items);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create a new master data item
   */
  static async create(req, res, next) {
    try {
      const newItem = await MasterDataService.create(req.body);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update a master data item
   */
  static async update(req, res, next) {
    try {
      const { id } = req.params;

      const { error, value } = validateRecordId(id);
      if (error) {
        return res.status(400).json({ error: error.message });
      }

      const updatedItem = await MasterDataService.update(value, req.body);
      res.status(200).json(updatedItem);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete a master data item
   */
  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      const { error, value } = validateRecordId(id);
      if (error) {
        return res.status(400).json({ error: error.message });
      }

      await MasterDataService.delete(value);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

export default MasterDataController;
