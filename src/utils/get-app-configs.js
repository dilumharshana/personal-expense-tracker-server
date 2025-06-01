import database from "../config/db-connection.js";

//get app configs from fdb and return
export const getAppConfigs = async () => {
  const collection = database
    .getDb()
    .collection(process.env.APP_CONFIG_DATA_CLUSTER);

  const appConfigs = await collection.findOne();
  return appConfigs;
};
