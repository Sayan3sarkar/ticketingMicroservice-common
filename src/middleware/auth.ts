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
    const currentUser = req.user;
    console.log(req.session, currentUser, "Hitting auth middleware");
    if (!currentUser) {
      console.log("Unauthenticated request");
      throw new NotAuthorizedError();
    }

    console.log("calling next after this");
    next();
  } catch (err) {
    next(err);
  }
};

export { currentUserMiddleware, authMiddleware };
