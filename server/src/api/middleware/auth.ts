import { NextFunction, Request, Response } from 'express';
import Joi, { ValidationResult } from 'joi';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';

import { Api401Error } from '../../common/errors/Api401Error';
import { Api403Error } from '../../common/errors/Api403Error';
import config from '../../config';
import { Api400Error } from '../../common/errors/Api400Error';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.split(' ')[1];

  if (!token) {
    throw new Api401Error('Token not present');
  }

  jwt.verify(
    token,
    config.accessTokenSecret,
    (err: VerifyErrors | null, tokenUser: string | JwtPayload | undefined) => {
      if (err) {
        throw new Api403Error('Invalid token');
      } else {
        (req as any).user = tokenUser;
        next();
      }
    }
  );
};

export const validateSignInCredentials = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    user: Joi.object({
      email: Joi.string().email({ minDomainSegments: 2 }).required(),
      password: Joi.string().required()
    }).required()
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
      username: Joi.string()
        .pattern(
          new RegExp('^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$')
        )
        .required(),
      email: Joi.string().email({ minDomainSegments: 2 }).required(),
      firstName: Joi.string().required().max(100),
      lastName: Joi.string().required().max(100),
      password: Joi.string()
        .pattern(
          new RegExp(
            '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|]).{8,}$'
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
