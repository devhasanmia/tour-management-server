import { JwtPayload } from "jsonwebtoken";
import { IsActive, IUser } from "../modules/user/user.interface";
import { generateToken, verifyToken } from "./jwt";
import config from "../config";
import AppError from "../errorHandler/AppError";
import User from "../modules/user/user.model";
import httpStatus from "http-status-codes"
export const createUserToken = (user: Partial<IUser>) => {
  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };
  const accessToken = generateToken(
    jwtPayload as JwtPayload,
    config.jwt.secret,
    config.jwt.expires_in
  );
  const refreshToken = generateToken(
    jwtPayload as JwtPayload,
    config.jwt.refresh_secret,
    config.jwt.refresh_expires_in
  );
  return {
    accessToken,
    refreshToken
  }
};

export const refreshAccessToken = async (refreshToken: string) => {
  const varifiedToken = verifyToken(
    refreshToken,
    config.jwt.refresh_secret
  ) as JwtPayload;
  const isUserExist = await User.findOne({ email: varifiedToken.email });

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User does Not Exist");
  }
  if (isUserExist.isActive === IsActive.SUSPENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `User is ${isUserExist.isActive}`
    );
  }
  if (isUserExist.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "User is Deleted");
  }
  const jwtPayload = {
    userId: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role,
  };
  const accessToken = generateToken(
    jwtPayload,
    config.jwt.secret,
    config.jwt.expires_in
  );
  return accessToken
}

