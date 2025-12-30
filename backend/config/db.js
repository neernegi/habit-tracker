import mongoose from "mongoose";

/**
 * Connects application to MongoDB
 * This function is separated for clean architecture
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("DB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
