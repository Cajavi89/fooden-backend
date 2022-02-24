const mongoose = require('mongoose');

const DB_URI= process.env.DB_URI;

async function connectDB() {
  try {
    await mongoose.connect(DB_URI || 'mongodb://localhost:27017', {
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
