import { useQuery } from '@tanstack/react-query';

import { useAuthStrict } from '@/features/auth';
import { userQueryOptions } from '@/features/user/query-options';

export const HomePage = () => {
  const { signOut, user: authUser } = useAuthStrict();

  const { data: user } = useQuery(
    userQueryOptions.getUserByIdQueryOption(authUser.id)
  );

  return (
    <>
      HomePage
      <button onClick={signOut}> sign&nbsp;out</button>
      <h2 className="font-bold mt-4">
        {user?.email}, {user?.displayName}
      </h2>
    </>
  );
};
