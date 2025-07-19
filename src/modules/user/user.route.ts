import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "./user.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { UserSchema } from "./user.validation";
import AppError from "../../errorHandler/AppError";
import { verifyToken } from "../../utils/jwt";
import config from "../../config";
import { JwtPayload } from "jsonwebtoken";
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
const router = Router();

const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers.authorization;
        if (!accessToken) {
            throw new AppError(403, "No Token Recieved")
        }
        const verifiedToken = verifyToken(accessToken, config.jwt.secret) as JwtPayload;
        if (!authRoles.includes(verifiedToken.role)) {
            throw new AppError(403, "You are not permitted to view this route!!!")
        }
        req.user = verifiedToken 
        next()
    } catch (error) {
        console.log("jwt error", error);
        next(error)
    }
}

router.post("/register", validateRequest(UserSchema), UserController.createUser);
router.get("/get-all-user", checkAuth("USER"), UserController.getAllUser);

export const UserRoutes = router