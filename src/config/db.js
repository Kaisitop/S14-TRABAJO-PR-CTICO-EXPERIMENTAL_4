import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://KaisitopCluster:12345@cluster0.dtawezn.mongodb.net/Crud_db");
    console.log("MongoDB conectado ✅");
  } catch (error) {
    console.error("Error conectando a MongoDB:", error);
    process.exit(1);
  }
};
