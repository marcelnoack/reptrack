import { AppError } from './AppError';
import { SupportedHttpStatusCodes } from './commonAPI';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

export class Api500Error extends AppError {
  /* ---------------------------------------------------------------------------------------------- */
  constructor(
    message: string,
    name = 'Interal server error',
    httpCode = SupportedHttpStatusCodes.INTERNAL_SERVER,
    isOperational = true
  ) {
    super(message, name, httpCode, isOperational);
  }
}
