import { Link, useParams } from 'react-router-dom';

import { Gamepad2 } from 'lucide-react';

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
  const { gameSessionId } = useParams();

  return (
    <Flex direction="column">
      {gameSessionId && (
        <MantineNavLink
          component={Link}
          to={`/games/${gameSessionId}`}
          label={'Ігрова сесія'}
          leftSection={<Gamepad2 />}
          onClick={close}
        />
      )}
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
