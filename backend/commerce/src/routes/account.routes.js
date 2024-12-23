import express from "express";
import * as accountController from "../controllers/account.controller.js";

const UserAccountRouter = express.Router();

UserAccountRouter.get("/profile", accountController.profile);

UserAccountRouter.put("/update", accountController.update);

export default UserAccountRouter;
