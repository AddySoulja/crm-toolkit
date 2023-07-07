const mongoose = require("mongoose");

const dbInit = async () => {
  try {
    await mongoose.connect(process.env.PORT_DB);
    console.log(`Database connected`);
  } catch (error) {
    console.log("Error connecting to database: ", error);
  }
};

module.exports = dbInit;
