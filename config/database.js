const mongoose = require('mongoose');

const uri = process.env.MONGO_URI; // already using require dotenv from server.js.

mongoose.set('runValidators', true); // const userSchema = new mongoose.Schema( . . . , {runValidators: true}); if want schema-specific.  But I don't want that.

const connectMongooseToMongoDB = async () => {
  await mongoose.connect(uri)
    .then(() => console.log('Successfully connected to MongoDB! ', mongoose.connection.name))
    .catch(err => {
      console.error('Failed to connect to MongoDB:', err.message);
      process.exit(1); // to shut down server
    });
  // mongoose.connection.on("error", error => {
  //   console.error("MongoDB connection error:", error.message); // mid-process.  Similar to 
  // });

}

module.exports = connectMongooseToMongoDB;