import { Request, Response } from "express";
import User from "./user.model";
import httpStatus from "http-status-codes"

const createUser = async (req: Request, res: Response) => {
    try {
        const {name, email} = req.body;

        const user = await User.create({
            name,
            email
        })
        res.status(httpStatus.CREATED).json({
            message: "User Created Successful",
            user
        })
    } catch (error: unknown) {
        console.log(error)
        res.status(httpStatus.BAD_REQUEST).json({
            message: `Something went Worng !! ${error}`,
        })
    }
}


export const UserController = {
    createUser
}