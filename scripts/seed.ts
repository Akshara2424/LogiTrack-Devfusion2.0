// scripts/seed.ts
import dotenv from "dotenv";

// Load environment variables FIRST before any other imports
dotenv.config({ path: ".env.local" });

import bcrypt from "bcryptjs";
import connectDB from "../lib/db";
import User from "../models/User";
import DeliveryAgent from "../models/DeliveryAgent";

async function seedDatabase() {
  try {
    await connectDB();
    console.log("🌱 Connecting to MongoDB...");

    // Clear existing users (optional - only for development)
    await User.deleteMany({});
    await DeliveryAgent.deleteMany({});

    console.log("🗑️  Cleared existing users");

    const salt = await bcrypt.genSalt(10);

    // 1. Business Owner
    const business = await User.create({
      name: "Akshara Sharma",
      email: "owner@logitrack.com",
      password: await bcrypt.hash("password123", salt),
      role: "business",
    });

    // 2. Delivery Agent
    const agent = await User.create({
      name: "Rahul Verma",
      email: "agent@logitrack.com",
      password: await bcrypt.hash("password123", salt),
      role: "agent",
    });

    // Create DeliveryAgent profile
    await DeliveryAgent.create({
      user: agent._id,
      currentLocation: { lat: 28.6139, lng: 77.2090 }, // Delhi coordinates
      isAvailable: true,
      earnings: 2450,
    });

    // 3. Customer
    const customer = await User.create({
      name: "Priya Malhotra",
      email: "customer@logitrack.com",
      password: await bcrypt.hash("password123", salt),
      role: "customer",
    });

    console.log("✅ Seeding completed successfully!");
    console.log("\nTest Credentials:");
    console.log("────────────────────");
    console.log("Business Owner :", "owner@logitrack.com / password123");
    console.log("Delivery Agent  :", "agent@logitrack.com / password123");
    console.log("Customer       :", "customer@logitrack.com / password123");

  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    process.exit();
  }
}

seedDatabase();