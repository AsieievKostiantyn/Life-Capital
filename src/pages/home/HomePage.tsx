import { signOut } from 'firebase/auth';

import { useAuth } from '@/features/auth';

import { auth } from '@/shared/firebase';

export const HomePage = () => {
  const { user, isLoading } = useAuth();
  console.log(isLoading);
  console.log(user);
  return (
    <>
      HomePage
      <button onClick={() => signOut(auth)}> sign&nbsp;out</button>
      <h2 className="font-bold mt-4">
        {user?.email}, {user?.displayName}
      </h2>
    </>
  );
};
