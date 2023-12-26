export const USER_EXISTS = 'errors.user_exists';
export const NO_SESSION = 'errors.no_session';
export const INCORRECT_USER_CREDENTIALS = 'errors.incorrect_user_credentials';
export const GENERAL_SIGN_IN_ERROR = 'errors.general_sign_in_error';
export const GENERAL_GOOGLE_SIGN_IN_ERROR =
  'errors.general_google_sign_in_error';
export const GENERAL_PERMISSION_ERROR = 'errors.general_permission_error';
export const GENERAL_RESOURCE_NOT_FOUND_ERROR =
  'errors.general_resource_not_found_error';
export const GENERAL_RESOURCE_CREATION_ERROR =
  'errors.general_resource_creation_error';

export type ErrorMessageType =
  | typeof USER_EXISTS
  | typeof NO_SESSION
  | typeof INCORRECT_USER_CREDENTIALS
  | typeof GENERAL_SIGN_IN_ERROR
  | typeof GENERAL_GOOGLE_SIGN_IN_ERROR
  | typeof GENERAL_PERMISSION_ERROR
  | typeof GENERAL_RESOURCE_NOT_FOUND_ERROR
  | typeof GENERAL_RESOURCE_CREATION_ERROR;
