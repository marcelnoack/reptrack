import { AppError } from './AppError';
import { SupportedHttpStatusCodes } from './commonAPI';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

export class Api404Error extends AppError {
  /* ---------------------------------------------------------------------------------------------- */
  constructor(
    message: string,
    name = 'Not found',
    httpCode = SupportedHttpStatusCodes.NOT_FOUND,
    isOperational = true
  ) {
    super(message, name, httpCode, isOperational);
  }
}
