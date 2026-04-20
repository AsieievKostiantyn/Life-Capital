import { Link, useParams } from 'react-router-dom';

import { Gamepad2, House } from 'lucide-react';

import {
  Divider,
  Flex,
  Indicator,
  NavLink as MantineNavLink,
} from '@mantine/core';

import { useHasUnreadNews } from '@/features/player-state/hooks/useHasUnreadNews';

import { GAME_ROUTES, USER_ROUTES } from '@/shared/router';

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
  const hasUnreadNews = useHasUnreadNews();

  return (
    <Flex direction="column" px={10}>
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
        <Indicator
          disabled={
            !(
              hasUnreadNews &&
              link.href === GAME_ROUTES.PLAYER_ROUTES.PLAYER_NEWS
            )
          }
          key={link.label}
          color="red"
          size={6}
        >
          <MantineNavLink
            component={Link}
            to={link.href}
            label={link.label}
            leftSection={link.icon}
            onClick={close}
          />
        </Indicator>
      ))}

      {gameSessionId && (
        <>
          <Divider my="md" />
          <MantineNavLink
            component={Link}
            to={USER_ROUTES.HOME}
            label="На головну"
            leftSection={<House />}
            onClick={close}
          />
        </>
      )}
    </Flex>
  );
};
