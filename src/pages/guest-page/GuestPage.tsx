import { useI18n } from '@/features/i18n/context/useI18n';
import GreatBritainFlag from '@/static/images/svg/gb.svg';
import UkrainianFlag from '@/static/images/svg/ua.svg';
import { Globe, Moon, Sun } from 'lucide-react';
import { FormattedMessage } from 'react-intl';

import {
  ActionIcon,
  AppShell,
  Flex,
  Group,
  Image,
  Menu,
  useMantineColorScheme,
} from '@mantine/core';

export const GuestPage = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const i18n = useI18n();

  return (
    <AppShell header={{ height: 60 }}>
      <AppShell.Header>
        <Flex justify="space-between" align="center" px="md" w="100%" h="100%">
          <div>
            <h1 className="text-[24px]">
              <FormattedMessage id="logo" />
            </h1>
          </div>
          <Group gap="0">
            <Menu shadow="md" width={150}>
              <Menu.Target>
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  radius="xl"
                  size={48}
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
              size={48}
              onClick={toggleColorScheme}
              aria-label="Toggle color scheme"
            >
              {colorScheme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
            </ActionIcon>
          </Group>
        </Flex>
      </AppShell.Header>
      <AppShell.Main></AppShell.Main>
    </AppShell>
  );
};
