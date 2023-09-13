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

    const foodCategory = mongoose.connection.db.collection("foodCategory");
    const catData = await foodCategory.find({}).toArray();

    global.foodData = data;
    global.foodCategory = catData;

    // console.log(global.foodData);
    // console.log(global.foodCategory);
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

module.exports = mongoDB;
