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
  return (
    <div className="max-w-100 w-full m-auto">
      <Paper
        withBorder
        shadow="md"
        p={30}
        radius="md"
        mt="xl"
        aria-label="Register form"
      >
        <Text size="lg" fw={500}>
          Welcome, continue with
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
            <TextInput label="Nickname" placeholder="Peter" radius="md" />

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
          </Stack>

          <Group justify="space-between" mt="xl">
            <Link
              to={ROUTES.LOGIN}
              className="text-(--mantine-color-dimmed) text-[12px] hover:underline"
            >
              Already have an account? Log in now
            </Link>
            <Button type="submit" radius="xl">
              Sign Up
            </Button>
          </Group>
        </form>
      </Paper>
    </div>
  );
};
