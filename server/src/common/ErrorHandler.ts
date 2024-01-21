import { NextFunction, Request, Response } from 'express';

import { Logger, SupportedHttpStatusCodes } from '.';
import { AppError } from './errors/AppError';
import { INVALID_JSON } from './i18n/errors';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

export class ErrorHandler {
  /* ---------------------------------------------------------------------------------------------- */
  public static async handleError(
    err: Error,
    req?: Request,
    res?: Response,
    next?: NextFunction
  ): Promise<void> {
    Logger.error(err.stack);
    if (err instanceof AppError && err.isOperational && res && next) {
      res.status(err.httpCode || 500).send({
        message: req?.t(err.message) || ''
      });
      return next();
    }

    if (err instanceof SyntaxError && res && next) {
      res.status(SupportedHttpStatusCodes.BAD_REQUEST).send({
        message: req?.t(INVALID_JSON)
      });
      return next();
    }

    process.exit(1);
  }
}
