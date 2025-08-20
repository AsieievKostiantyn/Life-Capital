import { type SubmitHandler, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import {
  Button,
  Checkbox,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';

import { useAuth } from '@/features/auth';

import { ROUTES } from '@/shared/router';

import { GoogleButton } from '../components/GoogleButton';

interface LoginPageData {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const intl = useIntl();
  const { signInWithGoogle, signIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<LoginPageData>();

  const onSubmitLoginForm: SubmitHandler<LoginPageData> = (data) => {
    signIn(data.email, data.password);
    reset();
  };

  return (
    <div className="max-w-110 w-full m-auto">
      <Paper
        withBorder
        shadow="md"
        p={30}
        radius="md"
        mt="xl"
        aria-label="Login form"
      >
        <Text size="lg" fw={500}>
          <FormattedMessage id="auth.welcome" />!{' '}
          <FormattedMessage id="auth.continueWith" />
        </Text>

        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl" onClick={signInWithGoogle}>
            Google
          </GoogleButton>
        </Group>

        <Divider
          label={intl.formatMessage({ id: 'auth.continueWithEmail' })}
          labelPosition="center"
          my="lg"
        />

        <form onSubmit={handleSubmit(onSubmitLoginForm)}>
          <Stack>
            <TextInput
              label="Email"
              placeholder="hello@gmail.com"
              radius="md"
              error={errors.email?.message}
              {...register('email', {
                required: 'Email обов`язковий.',
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: 'Невірний формат email.',
                },
              })}
              onChange={() => clearErrors('email')}
            />

            <PasswordInput
              label={intl.formatMessage({ id: 'auth.password.label' })}
              placeholder={intl.formatMessage({
                id: 'auth.password.placeholder',
              })}
              radius="md"
              error={errors.password?.message}
              {...register('password', {
                required: 'Пароль обов`язковий.',
                minLength: {
                  value: 8,
                  message: 'Пароль повинен містити мінімум 8 символів.',
                },
              })}
              onChange={() => clearErrors('password')}
            />
            <Group justify="space-between">
              <Checkbox
                label={intl.formatMessage({ id: 'auth.keepLoggedIn' })}
                size="sm"
                styles={{
                  input: { cursor: 'pointer' },
                }}
              />
              <Link
                to={ROUTES.PASSWORD_RECOVERY}
                className="text-sm text-(--mantine-color-anchor) hover:underline"
              >
                <FormattedMessage id="auth.forgotPassword.link" />
              </Link>
            </Group>
          </Stack>

          <Group justify="space-between" mt="xl">
            <Link
              to={ROUTES.REGISTER}
              className="text-(--mantine-color-dimmed) text-[12px] hover:underline"
            >
              <FormattedMessage id="auth.noAccount" />
            </Link>
            <Button type="submit" radius="xl">
              <FormattedMessage id="button.signIn" />
            </Button>
          </Group>
        </form>
      </Paper>
    </div>
  );
};
