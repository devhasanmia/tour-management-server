import { JwtPayload } from "jsonwebtoken";
import { IUser } from "../modules/user/user.interface";
import { generateToken } from "./jwt";
import config from "../config";

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
