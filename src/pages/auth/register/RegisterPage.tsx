import { type SubmitHandler, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import {
  Button,
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

interface RegisterPageData {
  name: string;
  email: string;
  password: string;
}

export const RegisterPage = () => {
  const intl = useIntl();
  const { signInWithGoogle, register: registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<RegisterPageData>();

  const onSubmitRegisterPageData: SubmitHandler<RegisterPageData> = (data) => {
    registerUser(data.email, data.password, data.name);
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
        aria-label="Register form"
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

        <form onSubmit={handleSubmit(onSubmitRegisterPageData)}>
          <Stack>
            <TextInput
              label={intl.formatMessage({ id: 'auth.nickname.label' })}
              placeholder={intl.formatMessage({
                id: 'auth.nickName.placeholder',
              })}
              radius="md"
              error={errors.name?.message}
              {...register('name', {
                required: "Ім’я користувача обов'язкове.",
                minLength: {
                  value: 3,
                  message: 'Ім’я має містити щонайменше 3 символи.',
                },
              })}
              onChange={() => clearErrors('name')}
            />

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
          </Stack>

          <Group justify="space-between" mt="xl">
            <Link
              to={ROUTES.LOGIN}
              className="text-(--mantine-color-dimmed) text-[12px] hover:underline"
            >
              <FormattedMessage id="auth.alreadyHaveAccount" />
            </Link>
            <Button type="submit" radius="xl">
              <FormattedMessage id="auth.signUp" />
            </Button>
          </Group>
        </form>
      </Paper>
    </div>
  );
};
