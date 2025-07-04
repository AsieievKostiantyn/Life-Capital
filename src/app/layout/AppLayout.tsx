import { Outlet } from 'react-router-dom';

export const AppLayout = () => {
  return (
    <>
      AppLayout
      <div>
        <Outlet />
      </div>
    </>
  );
};
