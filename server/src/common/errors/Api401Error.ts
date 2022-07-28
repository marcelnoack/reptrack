import { SupportedHttpStatusCodes } from '..';
import { AppError } from './AppError';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

export class Api401Error extends AppError {
  /* ---------------------------------------------------------------------------------------------- */
  constructor(
    message: string,
    name = 'Unauthorized',
    httpCode = SupportedHttpStatusCodes.UNAUTHORIZED,
    isOperational = true
  ) {
    super(message, name, httpCode, isOperational);
  }
}
