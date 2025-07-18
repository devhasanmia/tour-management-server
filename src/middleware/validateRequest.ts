import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";

export const validateRequest = (zodSchema: ZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("old data", req.body)
        req.body = await zodSchema.parseAsync(req.body);
        console.log("senitive", req.body)
        next()
    } catch (error) {
        next(error)
    }
}