import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT,
  db: process.env.DATABASE,
  node_env: process.env.NODE_ENV
};
