import mongoose from "mongoose"
import { MongoMemoryServer } from "mongodb-memory-server"
import * as dotenv from 'dotenv';

dotenv.config({ path: "../vars/.env" })

const connect = async() => {
    const mongod = await MongoMemoryServer.create();
    const getUri = mongod.getUri();

    mongoose.set("strictQuery", true)
    // const db = await mongoose.connect(getUri)
    const db = await mongoose.connect(process.env.ATLAS_URI)

    console.log('Database Connected');
    return db;
}

export default connect