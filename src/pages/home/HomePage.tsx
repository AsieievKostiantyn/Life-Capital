import { useAuth } from '@/features/auth';

export const HomePage = () => {
  const { user, signOut } = useAuth();
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
