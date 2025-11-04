import { signOut } from 'firebase/auth';

import { auth } from '@/shared/firebase';

export const HomePage = () => {
  return (
    <>
      HomePage
      <button onClick={() => signOut(auth)}> sign&nbsp;out</button>
    </>
  );
};
