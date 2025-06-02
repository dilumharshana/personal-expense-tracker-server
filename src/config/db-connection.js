import { MongoClient, ServerApiVersion } from "mongodb";

class Database {
  constructor() {
    this.client = null;
    this.db = null;
  }

  // create database connection with mongo client
  async connect() {
    // if mongo client is already created then return that client
    if (this.client) {
      return this.db;
    }

    // if mongo client is not created then create a new client
    try {
      const uri = process.env.MONGODB_URI;
      const dbName = process.env.DB_NAME;

      this.client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      });

      await this.client.connect();
      this.db = this.client.db(dbName);

      console.log("Connected to MongoDB");
      return this.db;
    } catch (error) {
      console.error("MongoDB connection failed:", error);
      throw error;
    }
  }

  // disconnect database connection
  async disconnect() {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.db = null;
      console.log("Disconnected from MongoDB");
    }
  }

  // return database connection
  getDb() {
    if (!this.db) {
      throw new Error("Database not connected");
    }
    return this.db;
  }
}

const database = new Database();

export default database;
