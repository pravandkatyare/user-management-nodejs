const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI+"/"+process.env.DB_NAME, );
        console.log("MongoDB Connected:", conn.connection.host);      
        console.log('Connection established successfully!');
    } catch (err) {
        console.log(`Error: ${err.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;