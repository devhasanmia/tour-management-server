import httpStatus from "http-status-codes";
import bcrypt from "bcryptjs";
import { IUser } from "../user/user.interface";
import User from "../user/user.model";
import AppError from "../../errorHandler/AppError";
import jwt, { JwtPayload } from "jsonwebtoken"
import { generateToken } from "../../utils/jwt";
import config from "../../config";
const credentialsLogin = async (payload: Partial<IUser>) => {
    const { email, password } = payload;
    if (!email || !password) {
        throw new AppError(httpStatus.BAD_REQUEST, "Email and password are required");
    }
    const user = await User.findOne({ email });
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User with this email does not exist");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password as string);

    if (!isPasswordValid) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Incorrect password");
    }
    const jwtPayload = {
        userId: user._id,
        email: user.email,
        role: user.role
    }
    const accessToken = generateToken(jwtPayload as JwtPayload, config.jwt.secret, config.jwt.expires_in)
    return {
        email: user.email,
        accessToken
    };
};

export const AuthService = {
    credentialsLogin
}