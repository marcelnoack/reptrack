import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

import { Api401Error } from '../../common/errors/Api401Error';
import { Api400Error } from '../../common/errors/Api400Error';
import {
  EMAIL_INVALID_TYPE,
  EMAIL_REQUIRED,
  FIRST_NAME_INVALID_TYPE,
  FIRST_NAME_MAX_LENGTH,
  FIRST_NAME_REQUIRED,
  LAST_NAME_INVALID_TYPE,
  LAST_NAME_MAX_LENGTH,
  LAST_NAME_REQUIRED,
  MIDDLE_NAME_INVALID_TYPE,
  MIDDLE_NAME_MAX_LENGTH,
  NO_SESSION,
  PASSWORD_INVALID,
  PASSWORD_INVALID_TYPE,
  PASSWORD_REQUIRED
} from '../../common/i18n/errors';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }

  throw new Api401Error(NO_SESSION);
};

export const validateSignInCredentials = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = z
    .object({
      email: z
        .string({
          required_error: EMAIL_REQUIRED,
          invalid_type_error: EMAIL_INVALID_TYPE
        })
        .trim()
        .min(1, { message: EMAIL_REQUIRED })
        .email({ message: EMAIL_INVALID_TYPE }),
      password: z
        .string({
          required_error: PASSWORD_REQUIRED,
          invalid_type_error: PASSWORD_INVALID_TYPE
        })
        .trim()
        .min(1, { message: PASSWORD_REQUIRED })
    })
    .required()
    .safeParse(req.body);

  if (!result.success) {
    const issue = result.error.issues[0];
    throw new Api400Error(issue.message);
  }

  next();
};

export const validateSignUp = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = z
    .object({
      user: z
        .object({
          email: z
            .string({
              required_error: EMAIL_REQUIRED,
              invalid_type_error: EMAIL_INVALID_TYPE
            })
            .trim()
            .min(1, { message: EMAIL_REQUIRED })
            .email({ message: EMAIL_INVALID_TYPE }),
          password: z
            .string({
              required_error: PASSWORD_REQUIRED,
              invalid_type_error: PASSWORD_INVALID_TYPE
            })
            .trim()
            .min(1, { message: PASSWORD_REQUIRED })
            .regex(
              /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
              { message: PASSWORD_INVALID }
            ),
          firstName: z
            .string({
              required_error: FIRST_NAME_REQUIRED,
              invalid_type_error: FIRST_NAME_INVALID_TYPE
            })
            .min(1, { message: FIRST_NAME_REQUIRED })
            .max(100, { message: FIRST_NAME_MAX_LENGTH }),
          lastName: z
            .string({
              required_error: LAST_NAME_REQUIRED,
              invalid_type_error: LAST_NAME_INVALID_TYPE
            })
            .min(1, { message: LAST_NAME_REQUIRED })
            .max(100, { message: LAST_NAME_MAX_LENGTH })
        })
        .required()
    })
    .safeParse(req.body);

  if (!result.success) {
    const issue = result.error.issues[0];
    throw new Api400Error(issue.message);
  }

  next();
};
