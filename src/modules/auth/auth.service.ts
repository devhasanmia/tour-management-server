import httpStatus from "http-status-codes";
import bcrypt from "bcryptjs";
import { IsActive, IUser } from "../user/user.interface";
import User from "../user/user.model";
import AppError from "../../errorHandler/AppError";
import { JwtPayload } from "jsonwebtoken";
import { generateToken, verifyToken } from "../../utils/jwt";
import config from "../../config";
import { createUserToken } from "../../utils/userToken";
const credentialsLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;
  if (!email || !password) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Email and password are required"
    );
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "User with this email does not exist"
    );
  }
  const isPasswordValid = await bcrypt.compare(
    password,
    user.password as string
  );

  if (!isPasswordValid) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Incorrect password");
  }
  const userToken = createUserToken(user);
  return {
    accessToken: userToken.accessToken,
    refreshToken: userToken.refreshToken,
    user: user,
  };
};
const getNewAccessToken = async (refreshToken: string) => {
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
  return {
    accessToken: accessToken,
  };
};

export const AuthService = {
  credentialsLogin,
  getNewAccessToken,
};
