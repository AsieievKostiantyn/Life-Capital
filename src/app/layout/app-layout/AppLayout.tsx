import { FormattedMessage } from 'react-intl';
import { Outlet } from 'react-router-dom';

// import { Globe, Moon, Sun } from 'lucide-react';

// import {
//   ActionIcon,
//   Group,
//   Image,
//   Menu,
//   useMantineColorScheme,
// } from '@mantine/core';
import { AppShell, Burger, Flex, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { useUserGameSessionStatus } from '@/features/game-session/hooks';

// import { useI18n } from '@/features/i18n';

// import GermanFlag from '@/static/images/svg/de.svg';
// import GreatBritainFlag from '@/static/images/svg/gb.svg';
// import UkrainianFlag from '@/static/images/svg/ua.svg';

import { Navbar } from './components';
import { hostNavLinks, playerNavLinks, userNavLinks } from './constants';

export const AppLayout = () => {
  const [opened, { toggle, close }] = useDisclosure();
  const { isInGameSession, isHost } = useUserGameSessionStatus();
  // const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  // const i18n = useI18n();

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
          {/* <Group gap="8">
            <Menu shadow="md" width={150}>
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
                  <Flex align="center" gap={5}>
                    <Image w={14} h={10} src={UkrainianFlag} /> Українська
                  </Flex>
                </Menu.Item>
                <Menu.Item onClick={() => i18n?.setLocale('en')}>
                  <Flex align="center" gap={5}>
                    <Image w={14} h={10} src={GreatBritainFlag} /> English
                  </Flex>
                </Menu.Item>
                <Menu.Item onClick={() => i18n?.setLocale('de')}>
                  <Flex align="center" gap={5}>
                    <Image w={14} h={10} src={GermanFlag} /> Deutsch
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
          </Group> */}
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar>
        <AppShell.Section grow component={ScrollArea} className="pt-5">
          <Navbar links={links} close={close} />
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
