import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";

function validateSignInOrSignUpMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    throw new RequestValidationError(errors.array());
  } catch (err) {
    next(err);
  }
}

export { validateSignInOrSignUpMiddleware };
