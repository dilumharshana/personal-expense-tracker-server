import database from "../config/db-connection.js";
import { ObjectId } from "mongodb";

/**
 * MasterData model - Handles database operations for master data
 */
class MasterData {
  static collection = null;

  static async getCollection() {
    // return collection if exist
    if (this.collection) return this.collection;

    // create and return master data collection
    const clusterName = process.env.MASTER_DATA_CLUSTER;
    const db = await database.getDb();
    this.collection = await db.collection(clusterName);
    return this.collection;
  }

  /**
   * Get all master data items
   * @returns {Promise<Array>} - Array of master data items
   */
  static async findAll() {
    try {
      const collection = await this.getCollection();

      return await collection.find({}).sort({ createdAt: -1 }).toArray();
    } catch (error) {
      throw new Error(`Error finding master data: ${error.message}`);
    }
  }

  /**
   * Find a master data item by ID
   * @param {string} id - Master data ID
   * @returns {Promise<Object|null>} - Master data object or null
   */
  static async findById(id) {
    try {
      const collection = await this.getCollection();
      return await collection.findOne({ _id: new ObjectId(id) });
    } catch (error) {
      throw new Error(`Error finding master data by ID: ${error.message}`);
    }
  }

  /**
   * Create a new master data item
   * @param {Object} data - Master data to create
   * @returns {Promise<Object>} - Created item
   */
  static async create(data) {
    try {
      const newItem = {
        title: data,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const collection = await this.getCollection();
      const result = await collection.insertOne(newItem);
      return await this.findById(result.insertedId);
    } catch (error) {
      throw new Error(`Error creating master data: ${error.message}`);
    }
  }

  /**
   * Update a master data item
   * @param {string} id - ID of the item to update
   * @param {Object} data - Data to update
   * @returns {Promise<Object|null>} - Updated item or null
   */
  static async update(id, data) {
    try {
      const updateData = {
        title: data,
        updatedAt: new Date()
      };

      const collection = await this.getCollection();

      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
      );

      if (result?.matchedCount === 0) return null;

      return await this.findById(id);
    } catch (error) {
      throw new Error(`Error updating master data: ${error.message}`);
    }
  }

  /**
   * Delete a master data item
   * @param {string} id - ID of the item to delete
   * @returns {Promise<boolean>} - True if deleted, false otherwise
   */
  static async delete(id) {
    try {
      const collection = await this.getCollection();
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      console.log(result);

      return result.deletedCount > 0;
    } catch (error) {
      throw new Error(`Error deleting master data: ${error.message}`);
    }
  }
}

export default MasterData;
