import { Router } from "express";
import { getAllUsers, userSignup } from "../controllers/user-controllers.js";
const userRoutes = Router();
userRoutes.get("/", getAllUsers);
userRoutes.get("/check", (req, res) => {
    res.send("user loaded");
});
userRoutes.post("/signup", userSignup);
export default userRoutes;
//# sourceMappingURL=user-routes.js.map