import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AuthService } from "./auth.service";
import httpStatus from "http-status-codes";

const credentialsLogin = catchAsync(async (req: Request, res: Response) => {
    const user = await AuthService.credentialsLogin(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User Loging successfully",
        data: user,
    });
});


export const AuthController = {
    credentialsLogin
}