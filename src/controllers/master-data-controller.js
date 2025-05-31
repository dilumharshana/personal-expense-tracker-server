import MasterDataService from "../services/master-data-service.js";

/**
 * MasterData Controller - Handles HTTP requests for master data operations
 */
class MasterDataController {
  /**
   * Get all master data items
   */
  static async getAllMasterData(req, res, next) {
    try {
      const items = await MasterDataService.getAllMasterData();
      res.status(200).json(items);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create a new master data item
   */
  static async createMasterData(req, res, next) {
    try {
      const newItem = await MasterDataService.createMasterData(req.body);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update a master data item
   */
  static async updateMasterData(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: error.message });
      }

      const updatedItem = await MasterDataService.updateMasterData(
        id,
        req.body
      );
      res.status(200).json(updatedItem);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete a master data item
   */
  static async deleteMasterData(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: error.message });
      }

      await MasterDataService.deleteMasterData(id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

export default MasterDataController;
