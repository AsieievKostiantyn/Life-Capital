import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import {
  ActionIcon,
  AppShell,
  Button,
  Flex,
  Group,
  Image,
  Menu,
  useMantineColorScheme,
} from '@mantine/core';
import { Globe, Moon, Sun } from 'lucide-react';

import { useI18n } from '@/features/i18n';

import { ROUTES } from '@/shared/router';

import GreatBritainFlag from '@/static/images/svg/gb.svg';
import UkrainianFlag from '@/static/images/svg/ua.svg';

export const GuestPage = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const i18n = useI18n();
  const navigate = useNavigate();

  const navigateToLoginPage = () => {
    navigate(ROUTES.LOGIN);
  };

  return (
    <AppShell header={{ height: 60 }}>
      <AppShell.Header>
        <Flex justify="space-between" align="center" px="md" w="100%" h="100%">
          <div>
            <h1 className="text-[24px]">
              <FormattedMessage id="logo" />
            </h1>
          </div>
          <Group gap="8">
            <Menu shadow="md" width={150}>
              <Menu.Target>
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  radius="xl"
                  size="xl"
                  aria-label="Select language"
                >
                  <Globe size={24} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item onClick={() => i18n?.setLocale('uk')}>
                  <Flex align="center" gap={5}>
                    <Image w={14} h={10} src={UkrainianFlag} /> Українська
                  </Flex>
                </Menu.Item>
                <Menu.Item onClick={() => i18n?.setLocale('en')}>
                  <Flex align="center" gap={5}>
                    <Image w={14} h={10} src={GreatBritainFlag} /> English
                  </Flex>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>

            <ActionIcon
              variant="subtle"
              color="gray"
              radius="xl"
              size="xl"
              onClick={toggleColorScheme}
              aria-label="Toggle color scheme"
            >
              {colorScheme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
            </ActionIcon>
            <Button
              variant="default"
              radius="xl"
              size="sm"
              onClick={navigateToLoginPage}
            >
              <FormattedMessage id="button.signIn" />
            </Button>
          </Group>
        </Flex>
      </AppShell.Header>
      <AppShell.Main></AppShell.Main>
    </AppShell>
  );
};
