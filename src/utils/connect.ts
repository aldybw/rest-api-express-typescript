import config from "config";
import mongoose from "mongoose";
import logger from "./logger";

async function connect() {
  const dbUri = config.get<string>("dbUri");

  try {
    await mongoose.connect(dbUri);
    logger.info("DB connected");
  } catch (error: any) {
    logger.error("Could not connect to db");
    process.exit(1);
  }
}

export default connect;
