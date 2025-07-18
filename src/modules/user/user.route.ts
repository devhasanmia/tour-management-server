import { Router } from "express";
import { UserController } from "./user.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { UserSchema } from "./user.validation";

const router = Router();


router.post("/register", validateRequest(UserSchema), UserController.createUser);
router.get("/get-all-user", UserController.getAllUser);

export const UserRoutes = router