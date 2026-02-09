import { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { Outlet, useNavigate } from 'react-router-dom';

import { Globe, LogOut, Moon, Settings, Sun } from 'lucide-react';

import {
  ActionIcon,
  Avatar,
  Group,
  Image,
  Menu,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import { AppShell, Burger, Flex, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';

import { useAuthStrict } from '@/features/auth';
import { GlobalSaveButton } from '@/features/game-session/components';
import { useUserGameSessionStatus } from '@/features/game-session/hooks';
import { useI18n } from '@/features/i18n';
import { userQueryOptions } from '@/features/user/query-options';

import { USER_ROUTES } from '@/shared/router';

import GermanFlag from '@/static/images/svg/de.svg';
import GreatBritainFlag from '@/static/images/svg/gb.svg';
import UkrainianFlag from '@/static/images/svg/ua.svg';

import { Navbar } from './components';
import { hostNavLinks, playerNavLinks, userNavLinks } from './constants';

export const AppLayout = () => {
  const [opened, { toggle, close }] = useDisclosure();
  const { isInGameSession, isHost } = useUserGameSessionStatus();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const i18n = useI18n();
  const { signOut, user: authUser } = useAuthStrict();
  const navigate = useNavigate();

  const { data: user } = useQuery(
    userQueryOptions.getUserByIdQueryOption(authUser.id)
  );

  useEffect(() => {
    i18n.setLocale('uk');
  }, []);

  const links = isInGameSession
    ? isHost
      ? hostNavLinks
      : playerNavLinks
    : userNavLinks;

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      styles={{
        header: { maxWidth: 1400, width: '100%', margin: '0 auto' },
        navbar: { insetInlineStart: 'auto' },
      }}
    >
      <AppShell.Header>
        <Flex justify="space-between" align="center" px="md" w="100%" h="100%">
          <Flex align="center" gap="sm">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />

            <h1 className="text-[24px] font-bold">
              <FormattedMessage id="logo" />
            </h1>
          </Flex>
          <Group gap="8">
            <Menu shadow="md" width={190}>
              <Menu.Target>
                <ActionIcon
                  variant="subtle"
                  color={colorScheme === 'dark' ? '#ffffff' : '#000000'}
                  radius="xl"
                  size="xl"
                  aria-label="Select language"
                >
                  <Globe size={24} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item onClick={() => i18n?.setLocale('uk')}>
                  <Flex align="center" gap={10}>
                    <Image w={14} h={10} src={UkrainianFlag} /> Українська
                  </Flex>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item onClick={() => i18n?.setLocale('en')} disabled>
                  <Flex align="center" gap={10}>
                    <Image w={14} h={10} src={GreatBritainFlag} />
                    <Flex direction="column">
                      <Text color="white">English</Text>
                      <Text size="12px">Not available yet</Text>
                    </Flex>
                  </Flex>
                </Menu.Item>
                <Menu.Item onClick={() => i18n?.setLocale('de')} disabled>
                  <Flex align="center" gap={10}>
                    <Image w={14} h={10} src={GermanFlag} />
                    <Flex direction="column">
                      <Text color="white">Deutsch</Text>
                      <Text size="12px">Derzeit nicht verfügbar</Text>
                    </Flex>
                  </Flex>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>

            <ActionIcon
              variant="subtle"
              color={colorScheme === 'dark' ? '#ffffff' : '#000000'}
              radius="xl"
              size="xl"
              onClick={toggleColorScheme}
              aria-label="Toggle color scheme"
            >
              {colorScheme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
            </ActionIcon>

            <Menu position="bottom-end" withArrow arrowPosition="center">
              <Menu.Target>
                <ActionIcon radius="xl" size="xl" variant="subtle">
                  <Avatar
                    src={user?.avatarUrl}
                    size={36}
                    radius="xl"
                    name={user?.displayName || ''}
                    color="initials"
                  />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item w={240}>
                  <Group gap="sm">
                    <Avatar
                      src={user?.avatarUrl}
                      radius="xl"
                      name={user?.displayName}
                      color="initials"
                    />
                    <div>
                      <Text size="sm">{user?.displayName}</Text>
                      <Text size="xs" opacity={0.5}>
                        {user?.email}
                      </Text>
                    </div>
                  </Group>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Label>Додаток</Menu.Label>
                <Menu.Item
                  onClick={() => navigate(USER_ROUTES.PROFILE)}
                  leftSection={<Settings size={24} />}
                >
                  Профіль
                </Menu.Item>
                <Menu.Item
                  onClick={signOut}
                  color="red"
                  leftSection={<LogOut size={24} />}
                >
                  Вийти
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar>
        <AppShell.Section grow component={ScrollArea} className="pt-5">
          <Navbar links={links} close={close} />
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
        {isInGameSession && <GlobalSaveButton />}
      </AppShell.Main>
    </AppShell>
  );
};
