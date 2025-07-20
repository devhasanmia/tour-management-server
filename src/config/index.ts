import dotenv from "dotenv";
dotenv.config();

export interface IAppConfig {
  port: number | string;
  env: string;
}

export interface IDatabaseConfig {
  uri: string;
}

export interface IJwtConfig {
  secret: string;
  expires_in: string;
  refresh_secret: string;
  refresh_expires_in: string;
}

export interface IBcryptConfig {
  salt_rounds: number;
}
export interface ISuperAdminConfig {
  name: string;
  email: string;
  password: string;
  role: string;
}
export interface IConfig {
  app: IAppConfig;
  database: IDatabaseConfig;
  jwt: IJwtConfig;
  bcrypt: IBcryptConfig;
  superAdmin: ISuperAdminConfig;
}

const config: IConfig = {
  app: {
    port: process.env.PORT || 5000,
    env: process.env.NODE_ENV || "development",
  },
  database: {
    uri: process.env.DATABASE || "",
  },
  jwt: {
    secret: process.env.JWT_SECRET || "",
    expires_in: process.env.JWT_EXPIRES_IN || "1h",
    refresh_secret: process.env.JWT_REFRESH_SECRET || "",
    refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN || "30d",
  },
  bcrypt: {
    salt_rounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10),
  },
   superAdmin: {
    name: process.env.SUPER_ADMIN_NAME || "SUPER ADMIN",
    email: process.env.SUPER_ADMIN_EMAIL || "superadmin@tour-management.com",
    password: process.env.SUPER_ADMIN_PASSWORD || "12345678",
    role: process.env.SUPER_ADMIN_ROLE || "SUPER_ADMIN",
  },
};

export default config;
