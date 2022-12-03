const env = require("dotenv");
const mongoose = require("mongoose");
env.config();

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://keerthivasan:Keerthi15@cluster0.hcqnrhe.mongodb.net/?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("db connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
module.exports = connectDB;
