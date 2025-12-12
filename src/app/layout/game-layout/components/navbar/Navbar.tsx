import { Link } from 'react-router-dom';

import { BookOpenText, House } from 'lucide-react';

import { Flex, NavLink as MantineNavLink } from '@mantine/core';

import { GAME_ROUTES, USER_ROUTES } from '@/shared/router';

const playerNavLinks = [
  {
    href: USER_ROUTES.HOME,
    label: 'Головна',
    icon: <House />,
  },
  {
    href: GAME_ROUTES.PLAYER_ROUTES.PLAYER_LEGEND,
    label: 'Легенда гравця',
    icon: <BookOpenText />,
  },
];

export const Navbar = () => {
  return (
    <Flex direction="column">
      {playerNavLinks.map((item) => (
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
