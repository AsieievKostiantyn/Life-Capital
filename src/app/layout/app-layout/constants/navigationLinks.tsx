import {
  BookOpen,
  BookOpenText,
  Gamepad2,
  House,
  UserRoundPen,
} from 'lucide-react';

import { GAME_ROUTES, USER_ROUTES } from '@/shared/router';

export const userNavLinks = [
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
] as const;

export const hostNavLinks = [
  {
    href: USER_ROUTES.HOME,
    label: 'На головну',
    icon: <House />,
  },
] as const;

export const playerNavLinks = [
  {
    href: GAME_ROUTES.PLAYER_ROUTES.PLAYER_LEGEND,
    label: 'Легенда гравця',
    icon: <BookOpenText />,
  },
  {
    href: USER_ROUTES.HOME,
    label: 'На головну',
    icon: <House />,
  },
] as const;
