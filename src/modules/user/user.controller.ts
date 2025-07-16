import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes"
import { UserServices } from "./user.service";
import catchAsync from "../../utils/catchAsync";

const createUser = catchAsync(async (req: Request, res: Response) => {
    const user = await UserServices.createUser(req.body);
    res.status(httpStatus.CREATED).json({
        success: true,
        message: "User created successfully",
        data: user,
    });
});

const getAllUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const user = await UserServices.getAllUser();
        res.status(httpStatus.OK).json({
            success: true,
            message: "All users retrieved successfully",
            data: user,
        });
    }
);


export const UserController = {
    createUser,
    getAllUser
}