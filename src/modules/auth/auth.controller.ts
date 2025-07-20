import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AuthService } from "./auth.service";
import httpStatus from "http-status-codes";
import { setCookie } from "../../utils/setCookie";

const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await AuthService.credentialsLogin(req.body);
    setCookie(res, user)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User Loging successfully",
        data: user,
    });
});
const getNewAccessToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.refreshToken;
    const tokenInfo = await AuthService.getNewAccessToken(token);
    setCookie(res, tokenInfo)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User Loging successfully",
        data: tokenInfo,
    });
});
const logout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false
    })
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false
    })
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User Logout successfully",
        data: null,
    });
});


export const AuthController = {
    credentialsLogin,
    getNewAccessToken,
    logout
}