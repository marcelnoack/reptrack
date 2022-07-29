import { SupportedHttpStatusCodes } from '..';
import { AppError } from './AppError';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

export class Api400Error extends AppError {
  /* ---------------------------------------------------------------------------------------------- */
  constructor(
    message: string,
    name = 'Bad request',
    httpCode = SupportedHttpStatusCodes.BAD_REQUEST,
    isOperational = true
  ) {
    super(message, name, httpCode, isOperational);
  }
}
