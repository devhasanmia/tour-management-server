import { NextFunction, Request, Response } from "express";
import config from "../config";
import AppError from "../errorHandler/AppError";

const globalErrorHandler = (error: any, req: Request, res: Response, _next: NextFunction) => {
    let statusCode = error.statusCode || 500;
    let errorMessage = error.message || "Internal Server Error";
    if (error instanceof AppError) {
        statusCode = error.statusCode;
        errorMessage = error.message
    } else if (error instanceof Error) {
        statusCode = 500;
        errorMessage = error.message
    }
    res.status(statusCode).json({
        success: false,
        message: errorMessage,
        stack: config.node_env === "development" ? error.stack : undefined
    });
};

export default globalErrorHandler;
