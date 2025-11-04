import { BookOpen, Gamepad2, House, UserRoundPen } from 'lucide-react';

import { Flex, NavLink } from '@mantine/core';

import { ROUTES } from '@/shared/router';

const userNavLinks = [
  {
    href: ROUTES.HOME,
    label: 'Головна',
    icon: <House />,
  },
  {
    href: ROUTES.RULES,
    label: 'Правила',
    icon: <BookOpen />,
  },
  {
    href: ROUTES.MY_GAMES,
    label: 'Мої ігри',
    icon: <Gamepad2 />,
  },
  {
    href: ROUTES.PROFILE,
    label: 'Профіль',
    icon: <UserRoundPen />,
  },
];

export const Navbar = () => {
  return (
    <Flex direction="column">
      {userNavLinks.map((item) => (
        <NavLink
          href={item.href}
          label={item.label}
          leftSection={item.icon}
          key={item.label}
        />
      ))}
    </Flex>
  );
};
