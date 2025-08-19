import { signOut } from 'firebase/auth';

import { auth } from '@/shared/firebase';

export const App = () => {
  return (
    <>
      App
      <button onClick={() => signOut(auth)}>sign&nbsp;out</button>
    </>
  );
};
