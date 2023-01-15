import { NextFunction, Request, Response } from 'express';

import { Logger } from '.';
import { AppError } from './errors/AppError';

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
    if (err instanceof AppError && err.isOperational && res) {
      res.status(err.httpCode || 500).send(err.message);
      return;
    }

    process.exit(1);
  }
}
