import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Tabs } from '@mantine/core';

import { GAME_ROUTES } from '@/shared/router';

export const PlayerExpensesLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab = Object.values(
    GAME_ROUTES.PLAYER_ROUTES.PLAYER_EXPENSES
  ).find(
    (route) =>
      location.pathname.endsWith(`/${route}`) ??
      GAME_ROUTES.PLAYER_ROUTES.PLAYER_EXPENSES.OVERVIEW
  );

  return (
    <>
      <Tabs value={activeTab} onChange={(value) => navigate(`${value}`)}>
        <Tabs.List>
          <Tabs.Tab
            value={GAME_ROUTES.PLAYER_ROUTES.PLAYER_EXPENSES.OVERVIEW}
            className="data-[active]:[&_.mantine-Tabs-tabLabel]:font-bold"
          >
            Загальні
          </Tabs.Tab>
          <Tabs.Tab
            value={GAME_ROUTES.PLAYER_ROUTES.PLAYER_EXPENSES.MY}
            className="data-[active]:[&_.mantine-Tabs-tabLabel]:font-bold"
          >
            Мої витрати
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
      <Outlet />
    </>
  );
};
