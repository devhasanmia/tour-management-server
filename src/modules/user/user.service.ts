import AppError from "../../errorHandler/AppError";
import { IAuthProvider, IUser } from "./user.interface";
import User from "./user.model";
import httpStatus from "http-status-codes"
import bcrypt from "bcryptjs";
const createUser = async (payload: Partial<IUser>) => {
    const { email, password, ...rest } = payload
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "User Already Exist")
    }
    const hashPassword = await bcrypt.hash(password as string, 10);

    const authProvider: IAuthProvider = { provider: "credentials", providerid: email as string }
    const user = await User.create({
        email,
        ...rest,
        password: hashPassword,
        auths: [authProvider]
    })
    return user
}

const getAllUser = async () => {
    const result = await User.find();
    const total: number = await User.countDocuments();
    return {
        meta: {
            total
        },
        result
    }
}

export const UserServices = {
    createUser,
    getAllUser
}