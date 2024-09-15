const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb://localhost:27017";

const dbName = 'fruitsDB';

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect(); // Connect to the MongoDB server
    console.log("Connected to the MongoDB server");

    const database = client.db(dbName); // Use the specified database
    const movies = database.collection('movies');

    // Query for a movie that has the title 'Back to the Future'
    const query = { title: 'Back to the Future' };
    const movie = await movies.findOne(query);

    console.log(movie);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
    console.log("Connection closed");
  }
}

run().catch(console.dir);
