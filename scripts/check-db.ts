// scripts/check-db.ts
import dotenv from "dotenv";

// Load environment variables FIRST
dotenv.config({ path: ".env.local" });

import connectDB from "../lib/db";
import User from "../models/User";

async function checkConnection() {
  try {
    console.log("Connecting to MongoDB...");

    await connectDB({ serverSelectionTimeoutMS: 8000 });
    console.log("MongoDB Connected Successfully!");

    // Check seeded users
    const users = await User.find({});
    console.log(`Found ${users.length} users in database`);

    users.forEach((user) => {
      console.log(` -> ${user.name} (${user.role}) - ${user.email}`);
    });
  } catch (error: any) {
    console.error("MongoDB Connection Failed:");
    console.error(error.message);

    if (error.message.includes("bad auth")) {
      console.error("Tip: Check your username/password in MONGODB_URI");
    } else if (
      error.message.includes("ENOTFOUND") ||
      error.message.includes("Could not connect to any servers")
    ) {
      console.error("Tip: Check your internet connection or MongoDB Atlas IP whitelist");
    }
  } finally {
    process.exit();
  }
}

checkConnection();
