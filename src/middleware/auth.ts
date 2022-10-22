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
  try {
    const authToken = req.session?.jwt;

    if (!authToken) {
      return next();
    }

    const user = verify(authToken, config.jwtSecret) as UserPayload;
    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authToken = req.session?.jwt;
    console.log(req.user, "Hitting auth middleware");
    // const currentUser = req.user;

    if (!authToken) {
    // if (!currentUser) {
      throw new NotAuthorizedError();
    }

    const user = verify(authToken, config.jwtSecret) as UserPayload;
    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};

export { currentUserMiddleware, authMiddleware };
