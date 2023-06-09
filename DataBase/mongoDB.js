const mongoose = require('mongoose');

const connectionMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Successful connection to MongoDB😎');
  } catch (error) {
    console.error('Error connecting to MongoDB😱☠:', error);
  }
};

module.exports = { connectionMongo }