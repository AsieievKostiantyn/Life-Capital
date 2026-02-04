import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Tabs } from '@mantine/core';

import { GAME_ROUTES } from '@/shared/router';

export const PlayerInvestmentsLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab =
    Object.values(GAME_ROUTES.PLAYER_ROUTES.PLAYER_INVESTMENTS).find((route) =>
      location.pathname.endsWith(`/${route}`)
    ) ?? GAME_ROUTES.PLAYER_ROUTES.PLAYER_INVESTMENTS.CURRENT;

  return (
    <>
      <Tabs value={activeTab} onChange={(value) => navigate(`${value}`)}>
        <Tabs.List>
          <Tabs.Tab
            value={GAME_ROUTES.PLAYER_ROUTES.PLAYER_INVESTMENTS.CURRENT}
            className="data-[active]:[&_.mantine-Tabs-tabLabel]:font-bold"
          >
            Поточні угоди
          </Tabs.Tab>
          <Tabs.Tab
            value={GAME_ROUTES.PLAYER_ROUTES.PLAYER_INVESTMENTS.MY}
            className="data-[active]:[&_.mantine-Tabs-tabLabel]:font-bold"
          >
            Мої інвестиції
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
      <Outlet />
    </>
  );
};
