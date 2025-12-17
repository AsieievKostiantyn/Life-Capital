import { Link } from 'react-router-dom';

import { Flex, NavLink as MantineNavLink } from '@mantine/core';

import type {
  hostNavLinks,
  playerNavLinks,
  userNavLinks,
} from '../../constants/navigationLinks';

interface NavBarProps {
  links: typeof userNavLinks | typeof hostNavLinks | typeof playerNavLinks;
  close: () => void;
}

export const Navbar = ({ links, close }: NavBarProps) => {
  return (
    <Flex direction="column">
      {links.map((link) => (
        <MantineNavLink
          component={Link}
          to={link.href}
          label={link.label}
          leftSection={link.icon}
          key={link.label}
          onClick={close}
        />
      ))}
    </Flex>
  );
};
