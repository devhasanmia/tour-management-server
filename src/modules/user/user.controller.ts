import { NextFunction, Request, Response } from "express";
import User from "./user.model";
import httpStatus from "http-status-codes"
import { UserServices } from "./user.service";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserServices.createUser(req.body)
        res.status(httpStatus.CREATED).json({
            message: "User Created Successful",
            user
        })
    } catch (error: unknown) {
       next(error)
    }
}


export const UserController = {
    createUser
}