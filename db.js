const mongoose = require('mongoose'); //informa como os dados devem ser salvos no banco de dados
require('dotenv').config();

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.CONNECTIONSTRING);
      // console.log(`MongoDB Connected: {conn.connection.host}`);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
};

module.exports = connectDB;