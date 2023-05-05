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
  const accessToken = req.cookies?.token;
  const csrfHeader = req.headers['x-csrf-token'];

  if (!accessToken) {
    throw new Api401Error('Token not present');
  }

  if (!csrfHeader) {
    throw new Api401Error('CSRF token not present');
  }

  jwt.verify(
    accessToken,
    config.accessTokenSecret,
    (err: VerifyErrors | null, tokenPayload: string | JwtPayload | undefined) => {
      if (err) {
        throw new Api403Error('Invalid token');
      }

      const { csrf, user } = tokenPayload as any;

      if (csrf !== csrfHeader) {
        throw new Api403Error('Invalid CSRF token');
      }

      (req as any).user = user;

      next();
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
