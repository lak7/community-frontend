// filepath: /c:/dsc/Gdsc/backend/src/shared/db.js
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function Connection() {
  try {
    const databaselink = process.env.DATABASEURL;
    if (!databaselink) {
      throw new Error("DATABASEURL environment variable is not set");
    }
    await mongoose.connect(databaselink);
    console.log("Database is connected");
  } catch (err) {
    console.error("Database connection error:", err.message);
  }
}

export default Connection;
