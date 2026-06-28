import { connect, disconnect } from "mongoose";
async function connectToDatabase() {
    try {
        const mongoUrl = process.env.MONGODB_URL;
        if (!mongoUrl) {
            throw new Error("MONGODB_URL is not defined");
        }
        await connect(mongoUrl);
    }
    catch (error) {
        console.log(error);
        throw new Error("could not connect to mongodb");
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