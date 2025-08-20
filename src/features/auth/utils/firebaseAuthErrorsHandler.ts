import { AuthErrorCodes } from 'firebase/auth';

const AUTH_ERROR_MESSAGES: Record<string, string> = {
  [AuthErrorCodes.INVALID_EMAIL]: 'auth.error.invalidEmail',
  [AuthErrorCodes.USER_DELETED]: 'auth.error.userNotFound',
  [AuthErrorCodes.INVALID_PASSWORD]: 'auth.error.invalidPassword',
  [AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER]: 'auth.error.tooManyAttempts',
  [AuthErrorCodes.EMAIL_EXISTS]: 'auth.error.emailExists',
  [AuthErrorCodes.WEAK_PASSWORD]: 'auth.error.weakPassword',
};

export const firebaseAuthErrorsHandler = (errorCode: string): string => {
  return AUTH_ERROR_MESSAGES[errorCode] ?? 'auth.error.unknown';
};
