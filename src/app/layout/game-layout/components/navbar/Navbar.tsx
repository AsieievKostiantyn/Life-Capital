import { Link } from 'react-router-dom';

import { House } from 'lucide-react';

import { Flex, NavLink as MantineNavLink } from '@mantine/core';

import { USER_ROUTES } from '@/shared/router';

const playerNavLinks = [
  {
    href: USER_ROUTES.HOME,
    label: 'Головна',
    icon: <House />,
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
