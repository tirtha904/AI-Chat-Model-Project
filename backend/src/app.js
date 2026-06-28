import express from 'express';
import morgan from 'morgan';
import appRouter from './routes/index.js';
import { config } from "dotenv";
config();
const app = express();
//middlewares
app.use(express.json());
//remove it in production
app.use(morgan("dev"));
app.use("/api/v1", appRouter);
export default app;
//# sourceMappingURL=app.js.map