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

import { ROUTES } from '@/shared/router';

import { GoogleButton } from '../components/GoogleButton';

export const RegisterPage = () => {
  const intl = useIntl();

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
          <GoogleButton radius="xl">Google</GoogleButton>
        </Group>

        <Divider
          label={intl.formatMessage({ id: 'auth.continueWithEmail' })}
          labelPosition="center"
          my="lg"
        />

        <form>
          <Stack>
            <TextInput
              label={intl.formatMessage({ id: 'auth.nickname.label' })}
              placeholder={intl.formatMessage({
                id: 'auth.nickName.placeholder',
              })}
              radius="md"
            />

            <TextInput
              label="Email"
              placeholder="hello@gmail.com"
              radius="md"
            />

            <PasswordInput
              label={intl.formatMessage({ id: 'auth.password.label' })}
              placeholder={intl.formatMessage({
                id: 'auth.password.placeholder',
              })}
              radius="md"
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
