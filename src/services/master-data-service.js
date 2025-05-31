import MasterData from "../models/masterData.js";
import { validateMasterDataInput } from "../utils/validators.js";

/**
 * Master Data Service - Business logic for master data operations
 */
class MasterDataService {
  /**
   * Get all master data items
   * @returns {Promise<Array>} - Array of master data items
   */
  static async getAllMasterData() {
    return await MasterData.findAll();
  }

  /**
   * Get a master data item by ID
   * @param {string} id - Master data item ID
   * @returns {Promise<Object>} - Master data item
   * @throws {Error} - If item not found
   */
  static async getMasterDataById(id) {
    const item = await MasterData.findById(id);

    if (!item) {
      const error = new Error("Master data item not found");
      error.statusCode = 404;
      throw error;
    }

    return item;
  }

  /**
   * Create a new master data item
   * @param {Object} data - Input data for master data
   * @returns {Promise<Object>} - Created item
   * @throws {Error} - If validation fails
   */
  static async createMasterData(data) {
    const { error, value } = validateMasterDataInput(data);

    if (error) {
      const validationError = new Error(error.message);
      validationError.statusCode = 400;
      throw validationError;
    }

    return await MasterData.create(value);
  }

  /**
   * Update a master data item
   * @param {string} id - Item ID
   * @param {Object} data - Data to update
   * @returns {Promise<Object>} - Updated item
   * @throws {Error} - If item not found
   */
  static async updateMasterData(id, data) {
    await this.getById(id);

    return await MasterData.update(id, data);
  }

  /**
   * Delete a master data item
   * @param {string} id - Item ID
   * @returns {Promise<boolean>} - Whether deletion was successful
   * @throws {Error} - If item not found
   */
  static async deleteMasterData(id) {
    await this.getById(id);

    return await MasterData.delete(id);
  }
}

export default MasterDataService;
