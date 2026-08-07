const mongoose = require('mongoose');


const connectDB = async () => {
    try {

        const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
        if (!mongoUri) {
            throw new Error("MongoDB URI missing in environment variables (MONGODB_URI / MONGO_URI).");
        }
        await mongoose.connect(mongoUri);

        console.log("DB connected successfully 🍃");

    } 
    catch (error) {

        console.log(error.message);

        process.exit(1);

    }
};

module.exports=connectDB;
 