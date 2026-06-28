import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";
import dotenv from "dotenv";
dotenv.config();
// app.get('/hello',(req,res,next)=>{
//   return res.send('hello');
// })
const PORT = process.env.PORT || 5000;
connectToDatabase()
    .then(() => {
    app.listen(PORT, () => console.log("server open & connected to database"));
})
    .catch((err) => console.log(err));
//# sourceMappingURL=index.js.map