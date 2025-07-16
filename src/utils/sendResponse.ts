import { Response } from "express";

interface IMeta {
    total: number;
}

interface IResponse<T> {
    statusCode: number;
    success: boolean;
    message: string;
    meta?: IMeta;
    data: T;
}

export const sendResponse = <T>(res: Response, data: IResponse<T>) => {
    res.status(data.statusCode).json({
        success: data.success,
        message: data.message,
        ...(data.meta && { meta: data.meta }),
        data: data.data
    });
};

