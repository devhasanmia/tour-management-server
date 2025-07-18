import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes"
import { UserServices } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createUser = catchAsync(async (req: Request, res: Response) => {
   
    const user = await UserServices.createUser(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "User Created successfully",
        data: user,
    });
});

const getAllUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result = await UserServices.getAllUser();
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "All users retrieved successfully",
            meta: result.meta,
            data: result.result
        })
    }
);


export const UserController = {
    createUser,
    getAllUser
}