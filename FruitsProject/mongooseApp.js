const mongoose = require('mongoose')

// Connect to the MongoDB database
mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to the MongoDB database");
    // Run your database operations here
    run();
  })
  .catch(error => {
    console.error("Error connecting to the database:", error);
  });

async function run() {
  try {
    const fruitSchema = new mongoose.Schema({
      name: String,
      score: {
        type:Number,
        // adding validation 
        min:1,
        max:10
      },
      review: String
    });

    // C -> Create the Fruit model
    const Fruit = mongoose.model("Fruit", fruitSchema);

    // Create a new Fruit document
    const fruit = new Fruit({
      name: "apple",
      score: 8,
      review: "great"
    });

    // Save the Fruit document to the database
    await fruit.save();
    console.log("Fruit document saved successfully.");

    // R -> Read all fruits from the database
    const fruits = await Fruit.find();
    console.log("All fruits in the database:", fruits);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
    console.log("Database connection closed.");
  }
}


// U -> update
Fruit.updateOne({_id:"65fea0e6c87433ebda9f3704"},{name : "peach"},function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("Updated")
    }
})


// D -> delete