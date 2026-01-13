import { Outlet, useNavigate } from 'react-router-dom';

import { Tabs } from '@mantine/core';

export const PlayerExpensesLayout = () => {
  const navigate = useNavigate();

  return (
    <>
      <Tabs defaultValue="overview" onChange={(value) => navigate(`${value}`)}>
        <Tabs.List>
          <Tabs.Tab
            value="overview"
            className="data-[active]:[&_.mantine-Tabs-tabLabel]:font-bold"
          >
            Загальні
          </Tabs.Tab>
          <Tabs.Tab
            value="my"
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
