import { AppError } from './AppError';
import { SupportedHttpStatusCodes } from './commonAPI';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

export class Api403Error extends AppError {
  /* ---------------------------------------------------------------------------------------------- */
  constructor(
    message: string,
    name = 'Forbidden',
    httpCode = SupportedHttpStatusCodes.FORBIDDEN,
    isOperational = true
  ) {
    super(message, name, httpCode, isOperational);
  }
}
