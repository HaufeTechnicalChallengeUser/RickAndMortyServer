import mongoose, { Mongoose } from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
