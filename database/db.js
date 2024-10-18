const mongoose = require( "mongoose");
require("dotenv").config()

async function connectDb(){
    const mongoUrl = (process.env.MONGODB_URL);
    console.log(mongoUrl)
    try {
        await mongoose.connect(mongoUrl, {
            serverSelectionTimeoutMS: 30000,
        });

        console.log('MongoDB Atlas connected!')
    } catch (err){
        console.log('Error connecting to MongoDB:', err.message);
    }

}

async function disconnectDb(){
    try {
        await mongoose.disconnect();
        console.log('MongoDB disconnected!');
    } catch (err) {
        err.message,
        console.error('Error disconnecting from MongoDB:');
    }
}

//automatically disconnect on application termination
process.on('SIGINT', async () => {
    await disconnectDb();
    process.exit(0);
});

module.exports = { connectDb, disconnectDb };