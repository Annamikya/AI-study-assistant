const mongoose = require("mongoose");
const dns = require("dns");

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");

    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables.");
    }

    // Ensure Node uses a public DNS resolver for Atlas SRV records.
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
    console.log("DNS servers set to", dns.getServers());

    console.log(process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;