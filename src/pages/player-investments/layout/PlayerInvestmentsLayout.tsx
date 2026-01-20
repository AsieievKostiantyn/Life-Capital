import { Outlet, useNavigate } from 'react-router-dom';

import { Tabs } from '@mantine/core';

export const PlayerInvestmentsLayout = () => {
  const navigate = useNavigate();

  return (
    <>
      <Tabs defaultValue="current" onChange={(value) => navigate(`${value}`)}>
        <Tabs.List>
          <Tabs.Tab
            value="current"
            className="data-[active]:[&_.mantine-Tabs-tabLabel]:font-bold"
          >
            Поточні угоди
          </Tabs.Tab>
          <Tabs.Tab
            value="my"
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
