const mongoose = require('mongoose');

const URI= process.env.DB_URI;

async function connectDB() {
  try {
    await mongoose.connect(URI || 'mongodb://localhost:27017', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.log(error);
    process.exit(1)
  };
};

module.exports = connectDB;
