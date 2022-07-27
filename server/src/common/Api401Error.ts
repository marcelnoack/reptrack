import { AppError } from './AppError';
import { SupportedHttpStatusCodes } from './commonAPI';

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
