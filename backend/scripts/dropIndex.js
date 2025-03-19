require("dotenv").config();
const mongoose = require("mongoose");

const dropIndex = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/todo-app",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    // Drop the username index
    await mongoose.connection.collection("users").dropIndex("username_1");
    console.log("Successfully dropped username index");

    process.exit(0);
  } catch (error) {
    console.error("Error dropping index:", error);
    process.exit(1);
  }
};

dropIndex();
