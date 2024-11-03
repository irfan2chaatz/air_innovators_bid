import mongoose from "mongoose";
import CONFIG from '../config/config.js'

const { MONGO_DB_URL, DB_NAME } = CONFIG

async function dbConnect() {
    try {
        const DB_URI = `${MONGO_DB_URL}/${DB_NAME}`
        await mongoose.connect(DB_URI);
        console.log("DB Connected")
    } catch (error) {
        console.log("DB Connection Failed")
        console.log(error)
    }
}

export { dbConnect }
