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

import { ROUTES } from '@/shared/router';

import { GoogleButton } from '../components/GoogleButton';

export const LoginPage = () => {
  return (
    <div className="max-w-100 w-full m-auto">
      <Paper
        withBorder
        shadow="md"
        p={30}
        radius="md"
        mt="xl"
        aria-label="Login form"
      >
        <Text size="lg" fw={500}>
          Welcome back, continue with
        </Text>

        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl">Google</GoogleButton>
        </Group>

        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="lg"
        />

        <form>
          <Stack>
            <TextInput
              label="Email"
              placeholder="hello@gmail.com"
              radius="md"
            />

            <PasswordInput
              label="Password"
              placeholder="Your password"
              radius="md"
            />
            <Group justify="space-between">
              <Checkbox label="Keep me logged in" size="sm" />
              <Link
                to={ROUTES.PASSWORD_RECOVERY}
                className="text-sm text-(--mantine-color-anchor) hover:underline"
              >
                Forgot password?
              </Link>
            </Group>
          </Stack>

          <Group justify="space-between" mt="xl">
            <Link
              to={ROUTES.REGISTER}
              className="text-(--mantine-color-dimmed) text-[12px] hover:underline"
            >
              Don&apos;t have an account? Create account
            </Link>
            <Button type="submit" radius="xl">
              Sign In
            </Button>
          </Group>
        </form>
      </Paper>
    </div>
  );
};
