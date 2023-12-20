import { NextFunction, Request, Response } from 'express';
import Joi, { ValidationResult } from 'joi';

import { Api401Error } from '../../common/errors/Api401Error';
import { Api400Error } from '../../common/errors/Api400Error';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }

  throw new Api401Error('No session');
};

export const validateSignInCredentials = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().required()
  });

  const validation: ValidationResult<any> = schema.validate(req.body);

  if (validation.error) {
    throw new Api400Error(validation.error.message);
  }

  next();
};

export const validateSignUp = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    user: Joi.object({
      email: Joi.string().email({ minDomainSegments: 2 }).required(),
      firstName: Joi.string().required().max(100),
      middleName: Joi.string().max(100),
      lastName: Joi.string().required().max(100),
      password: Joi.string()
        .pattern(
          new RegExp(
            '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
          )
        )
        .required()
    }).required()
  });

  const validation: ValidationResult<any> = schema.validate(req.body);

  if (validation.error) {
    throw new Api400Error(validation.error.message);
  }

  next();
};

export const validateRenewToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    refreshToken: Joi.string().required()
  });

  const validation: ValidationResult<any> = schema.validate(req.body);

  if (validation.error) {
    throw new Api400Error(validation.error.message);
  }

  next();
};
