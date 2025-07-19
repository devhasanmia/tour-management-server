import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "./user.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { UserSchema } from "./user.validation";
import AppError from "../../errorHandler/AppError";
import { verifyToken } from "../../utils/jwt";
import config from "../../config";
import { JwtPayload } from "jsonwebtoken";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "./user.interface";
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
const router = Router();



router.post("/register", validateRequest(UserSchema), UserController.createUser);
router.get("/get-all-user", checkAuth(Role.ADMIN, Role.USER), UserController.getAllUser);

export const UserRoutes = router 