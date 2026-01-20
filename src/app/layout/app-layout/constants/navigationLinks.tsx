import {
  BookOpen,
  BookOpenText,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Coins,
  Gamepad2,
  HandCoins,
  House,
  Newspaper,
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
    href: GAME_ROUTES.PLAYER_ROUTES.PLAYER_NEWS,
    label: 'Новини',
    icon: <Newspaper />,
  },
  {
    href: GAME_ROUTES.PLAYER_ROUTES.PLAYER_INCOMES,
    label: 'Доходи',
    icon: <Coins />,
  },
  {
    href: GAME_ROUTES.PLAYER_ROUTES.PLAYER_EXPENSES.ROOT,
    label: 'Витрати',
    icon: <HandCoins />,
  },
  {
    href: GAME_ROUTES.PLAYER_ROUTES.PLAYER_INVESTMENTS.ROOT,
    label: 'Інвестиції',
    icon: <ChartNoAxesCombined />,
  },
  {
    href: GAME_ROUTES.PLAYER_ROUTES.PLAYER_AIRBAG,
    label: 'Подушка безпеки',
    icon: <BriefcaseBusiness />,
  },
  {
    href: USER_ROUTES.HOME,
    label: 'На головну',
    icon: <House />,
  },
] as const;
