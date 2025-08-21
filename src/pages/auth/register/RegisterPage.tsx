import {
  type SubmitErrorHandler,
  type SubmitHandler,
  useForm,
} from 'react-hook-form';
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
    setValue,
  } = useForm<RegisterPageData>();

  const onSubmit: SubmitHandler<RegisterPageData> = (data) => {
    registerUser(data.email, data.password, data.name);
    reset();
  };

  const onError: SubmitErrorHandler<RegisterPageData> = () => {
    Object.keys(errors).forEach((field) => {
      setValue(field as keyof RegisterPageData, '');
    });
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

        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <Stack>
            <TextInput
              label={intl.formatMessage({ id: 'auth.nickname.label' })}
              placeholder={intl.formatMessage({
                id: 'auth.nickName.placeholder',
              })}
              radius="md"
              error={errors.name?.message}
              {...register('name', {
                required: intl.formatMessage({
                  id: 'auth.inputError.nameIsRequired',
                }),
                minLength: {
                  value: 3,
                  message: intl.formatMessage({
                    id: 'auth.inputError.nameLength',
                  }),
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
                required: intl.formatMessage({
                  id: 'auth.inputError.emailIsRequired',
                }),
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: intl.formatMessage({
                    id: 'auth.inputError.wrongEmailFormat',
                  }),
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
                required: intl.formatMessage({
                  id: 'auth.inputError.passwordIsRequired',
                }),
                minLength: {
                  value: 8,
                  message: intl.formatMessage({
                    id: 'auth.inputError.passwordLength',
                  }),
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
