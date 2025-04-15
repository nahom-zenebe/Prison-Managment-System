const mongoose = require("mongoose");
require("dotenv").config(); // This is enough

const connectToMongoDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MongoDB_URL, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error while connecting to MongoDB:", err.message);
    if (err.name === 'MongooseServerSelectionError') {
      console.error('Please ensure MongoDB is running locally or check your connection URL');
    }
  }
};

module.exports = connectToMongoDB;
