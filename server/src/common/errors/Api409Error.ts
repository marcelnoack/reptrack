import { SupportedHttpStatusCodes } from '..';
import { AppError } from './AppError';

/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------- */

export class Api409Error extends AppError {
  /* ---------------------------------------------------------------------------------------------- */
  constructor(
    message: string,
    name = 'Conflict',
    httpCode = SupportedHttpStatusCodes.CONFLICT,
    isOperational = true
  ) {
    super(message, name, httpCode, isOperational);
  }
}
