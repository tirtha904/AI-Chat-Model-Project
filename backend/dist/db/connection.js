import { connect, disconnect } from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
async function connectToDatabase() {
    //  console.log(process.env.MONGODB_URL)
    try {
        await connect(process.env.MONGODB_URL);
    }
    catch (error) {
        console.log(error);
        throw new Error("Could not Connect To MongoDB");
    }
}
async function disconnectFromDatabase() {
    try {
        await disconnect();
    }
    catch (error) {
        console.log(error);
        throw new Error("could not disconnect from mongodb");
    }
}
export { connectToDatabase, disconnectFromDatabase };
//# sourceMappingURL=connection.js.map