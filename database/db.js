const mongoose = require( "mongoose");

async function connectDb(){
    const mongoUrl = (process.env.MONGODB_URL);
    try {
        await mongoose.connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
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
        console.error('Error disconnecting from MongoDB:', err.message);
    }
}

//automatically disconnect on application termination
process.on('SIGINT', async () => {
    await disconnectDb();
    process.exit(0);
});

module.exports = { connectDb, disconnectDb };