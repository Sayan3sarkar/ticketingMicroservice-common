import { UserPayload } from "./types/userType";

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

export * from "./errors";
export * from "./middleware";
export * from "./types";
