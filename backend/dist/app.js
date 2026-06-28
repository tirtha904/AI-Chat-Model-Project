import express from 'express';
import morgan from 'morgan';
import appRouter from './routes/index.js';
import { config } from "dotenv";
import cookieParser from 'cookie-parser';
import cors from 'cors';
config();
const app = express();
//middlewares
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET)); //to invoke cookie from backend to frontend
app.use(cors({ origin: "http://localhost:5173", credentials: true })); //cors-we can now access the server by this domain 
//remove it in production
app.use(morgan("dev"));
app.use("/api/v1", appRouter);
export default app;
//# sourceMappingURL=app.js.map