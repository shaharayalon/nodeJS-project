// pnpm add mongoose

import { Logger } from "../logs/logger";
import { initDBCards } from "./initDBCards";
import { initDBUsers } from "./initDBUsers";

import mongoose from "mongoose";

const connect = async () => {
  try {
    //read the connection string from dotenv file:
    const connectionString = process.env.DB_CONNECTION_STRING;

    if (!connectionString) {
      Logger.error("DB_CONNECTION_STRING IS NOT DEFINED IN your .env file");

      return;
    }

    //connect to the database:
    await mongoose.connect(connectionString);

    Logger.debug("Database Connected");

    //init the database:
    await initDBUsers();
    await initDBCards();
  } catch (err) {
    Logger.error(`Cant Connect to database, ${err}`);
  }
};

export { connect };
