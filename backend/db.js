const mongoose = require("mongoose");

async function mongoDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/MERNFoodApp", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected....");

    const foodDataCollection = mongoose.connection.db.collection("foodData");

    const data = await foodDataCollection.find({}).toArray();
    console.log();
  } catch (err) {
    console.error(err);
  }
}

module.exports = mongoDB;
