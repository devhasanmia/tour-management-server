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
const getNewAccessToken = catchAsync(async (req: Request, res: Response) => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODdjYzA4YjQ0MDM2MjBjYWI3ZjY5ZDgiLCJlbWFpbCI6InN1cGVyYWRtaW5AdG91ci1tYW5hZ2VtZW50LmNvbSIsInJvbGUiOiJTVVBFUl9BRE1JTiIsImlhdCI6MTc1MzAxNDc5NSwiZXhwIjoxNzU1NjA2Nzk1fQ.garLIqOpfuRq9SgO0HhQ0fhRVleFJZe7vl5Df_m-YFM"
    const tokenInfo = await AuthService.getNewAccessToken(token);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User Loging successfully",
        data: tokenInfo,
    });

});


export const AuthController = {
    credentialsLogin,
    getNewAccessToken
}