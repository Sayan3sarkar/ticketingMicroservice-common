import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { config } from "../config/config";
import { NotAuthorizedError } from "../errors/not-authorized-error";
import { UserPayload } from "../types";

const currentUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.session?.jwt;

  if (!authToken) {
    return next();
  }

  try {
    const user = verify(authToken, config.jwtSecret) as UserPayload;
    req.user = user;
  } catch (err) {
    // next(err);
  }
  next();
};

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authToken = req.session?.jwt;

    if (!authToken) {
      console.log("Auth Token not sent");
      throw new NotAuthorizedError();
    }

    console.log("JWT Secret: ", config.jwtSecret);

    const user = verify(authToken, config.jwtSecret) as UserPayload;
    if (!user) {
      console.log("Invalid token");
      throw new NotAuthorizedError();
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

export { currentUserMiddleware, authMiddleware };
