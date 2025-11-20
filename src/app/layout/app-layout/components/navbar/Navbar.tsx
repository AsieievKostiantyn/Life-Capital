import { Link } from 'react-router-dom';

import { BookOpen, Gamepad2, House, UserRoundPen } from 'lucide-react';

import { Flex, NavLink as MantineNavLink } from '@mantine/core';

import { USER_ROUTES } from '@/shared/router';

const userNavLinks = [
  {
    href: USER_ROUTES.HOME,
    label: 'Головна',
    icon: <House />,
  },
  {
    href: USER_ROUTES.RULES,
    label: 'Правила',
    icon: <BookOpen />,
  },
  {
    href: USER_ROUTES.MY_GAMES,
    label: 'Мої ігри',
    icon: <Gamepad2 />,
  },
  {
    href: USER_ROUTES.PROFILE,
    label: 'Профіль',
    icon: <UserRoundPen />,
  },
];

export const Navbar = () => {
  return (
    <Flex direction="column">
      {userNavLinks.map((item) => (
        <MantineNavLink
          component={Link}
          to={item.href}
          label={item.label}
          leftSection={item.icon}
          key={item.label}
        />
      ))}
    </Flex>
  );
};
