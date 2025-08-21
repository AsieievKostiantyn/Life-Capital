import { LOCALES } from './locales';

export const messages = {
  [LOCALES.ENGLISH]: {
    logo: 'Life Capital',
    'button.signIn': 'Sign In',
    'auth.welcome': 'Welcome',
    'auth.continueWith': 'Continue with',
    'auth.continueWithEmail': 'Or continue with email',

    'auth.password.label': 'Password',
    'auth.password.placeholder': 'Your password',

    'auth.nickname.label': 'Nickname',
    'auth.nickName.placeholder': 'Eugene',

    'auth.keepLoggedIn': 'Keep me logged in',
    'auth.forgotPassword.link': 'Forgot password?',
    'auth.noAccount': "Don't have an account? Create account",
    'auth.alreadyHaveAccount': 'Already have an account? Log in now',

    'auth.signUp': 'Sign Up',

    'auth.resetPassword.title': 'Forgot your password?',
    'auth.resetPassword.instruction': 'Enter your email to get a reset link',
    'auth.resetPassword.backToLogin': 'Back to the login page',
    'auth.resetPassword.button': 'Reset password',

    'auth.error.invalidEmail': 'Invalid email format',
    'auth.error.userNotFound': 'User not found',
    'auth.error.invalidPassword': 'Incorrect password',
    'auth.error.tooManyAttempts': 'Too many attempts, please try again later',
    'auth.error.emailExists': 'This email is already registered',
    'auth.error.weakPassword': 'Password is too weak',
    'auth.error.unknown': 'Something went wrong, please try again',

    'auth.inputError.nameIsRequired': 'Username is required',
    'auth.inputError.nameLength': 'Username must be at least 3 characters long',
    'auth.inputError.emailIsRequired': 'Email is required',
    'auth.inputError.wrongEmailFormat': 'Invalid email format',
    'auth.inputError.passwordIsRequired': 'Password is required',
    'auth.inputError.passwordLength':
      'Password must be at least 8 characters long',
  },
  [LOCALES.UKRAINIAN]: {
    logo: 'Життєвий капітал',
    'button.signIn': 'Увійти',
    'auth.welcome': 'Вітаємо',
    'auth.continueWith': 'Продовжити через',
    'auth.continueWithEmail': 'Або продовжити через email',

    'auth.email.label': 'Емейл',
    'auth.email.placeholder': 'Введіть емейл',

    'auth.password.label': 'Пароль',
    'auth.password.placeholder': 'Ваш пароль',

    'auth.nickname.label': 'Нікнейм',
    'auth.nickName.placeholder': 'luke skywalker',

    'auth.keepLoggedIn': 'Залишатися в системі',
    'auth.forgotPassword.link': 'Забули пароль?',
    'auth.noAccount': 'Немає акаунта? Створіть акаунт',
    'auth.alreadyHaveAccount': 'Вже маєте акаунт? Увійдіть зараз',

    'auth.signUp': 'Зареєструватися',

    'auth.resetPassword.title': 'Відновлення паролю',
    'auth.resetPassword.instruction':
      'Введіть почту, щоб отримати посилання для відновлення',
    'auth.resetPassword.backToLogin': 'Повернутися до сторінки входу',
    'auth.resetPassword.button': 'Відновити пароль',

    'auth.error.invalidEmail': 'Неправильний формат email',
    'auth.error.userNotFound': 'Користувача не знайдено',
    'auth.error.invalidPassword': 'Невірний пароль',
    'auth.error.tooManyAttempts': 'Забагато спроб, спробуйте пізніше',
    'auth.error.emailExists': 'Ця електронна адреса вже зареєстрована',
    'auth.error.weakPassword': 'Пароль занадто простий',
    'auth.error.unknown': 'Щось пішло не так, спробуйте, будь ласка, ще раз',

    'auth.inputError.nameIsRequired': "Ім’я користувача обов'язкове",
    'auth.inputError.nameLength': 'Ім’я має містити щонайменше 3 символи',
    'auth.inputError.emailIsRequired': 'Email обов`язковий',
    'auth.inputError.wrongEmailFormat': 'Невірний формат email',
    'auth.inputError.passwordIsRequired': 'Пароль обов`язковий',
    'auth.inputError.passwordLength':
      'Пароль повинен містити мінімум 8 символів',
  },
  [LOCALES.GERMAN]: {
    logo: 'Life Capital',
    'button.signIn': 'Anmelden',

    'auth.welcome': 'Willkommen',
    'auth.continueWith': 'Weiter mit',
    'auth.continueWithEmail': 'Oder mit E-Mail fortfahren',

    'auth.email.label': 'E-Mail',
    'auth.email.placeholder': 'Geben Sie Ihre E-Mail ein',

    'auth.password.label': 'Passwort',
    'auth.password.placeholder': 'Ihr Passwort',

    'auth.nickname.label': 'Spitzname',
    'auth.nickName.placeholder': 'luke skywalker',

    'auth.keepLoggedIn': 'Angemeldet bleiben',
    'auth.forgotPassword.link': 'Passwort vergessen?',
    'auth.noAccount': 'Noch kein Konto? Konto erstellen',
    'auth.alreadyHaveAccount': 'Sie haben bereits ein Konto? Jetzt einloggen',

    'auth.signUp': 'Registrieren',

    'auth.resetPassword.title': 'Passwort zurücksetzen',
    'auth.resetPassword.instruction':
      'Geben Sie Ihre E-Mail ein, um einen Zurücksetzungslink zu erhalten',
    'auth.resetPassword.backToLogin': 'Zurück zur Anmeldeseite',
    'auth.resetPassword.button': 'Passwort zurücksetzen',

    'auth.error.invalidEmail': 'Ungültiges E-Mail-Format',
    'auth.error.userNotFound': 'Benutzer nicht gefunden',
    'auth.error.invalidPassword': 'Falsches Passwort',
    'auth.error.tooManyAttempts':
      'Zu viele Versuche, bitte später erneut versuchen',
    'auth.error.emailExists': 'Diese E-Mail-Adresse ist bereits registriert',
    'auth.error.weakPassword': 'Das Passwort ist zu schwach',
    'auth.error.unknown':
      'Etwas ist schiefgelaufen, bitte versuchen Sie es erneut',

    'auth.inputError.nameIsRequired': 'Benutzername ist erforderlich',
    'auth.inputError.nameLength':
      'Der Benutzername muss mindestens 3 Zeichen lang sein',
    'auth.inputError.emailIsRequired': 'E-Mail ist erforderlich',
    'auth.inputError.wrongEmailFormat': 'Ungültiges E-Mail-Format',
    'auth.inputError.passwordIsRequired': 'Passwort ist erforderlich',
    'auth.inputError.passwordLength':
      'Das Passwort muss mindestens 8 Zeichen lang sein',
  },
};
