import * as dotenv from "dotenv";
import { join } from "path";

const envPath = join(__dirname, "../..", ".env");
dotenv.config({
  path: envPath,
});

const env = process.env;

const config = {
  jwtSecret: process.env.JWT_KEY as string,
};

export { config };
