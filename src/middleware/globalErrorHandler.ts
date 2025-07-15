import { NextFunction, Request, Response } from "express";
import config from "../config";

const globalErrorHandler = (error: any, req: Request, res: Response, _next: NextFunction) => {
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        message: errorMessage,
        stack: config.node_env === "development" ? error.stack : undefined
    });
};

export default globalErrorHandler;
