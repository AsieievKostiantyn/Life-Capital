import { useEffect, useState } from 'react';

import { signOut } from 'firebase/auth';

import { useAuth } from '@/features/auth';

import { auth } from '@/shared/firebase';
import { supabase } from '@/shared/supabase/supabase';

export const HomePage = () => {
  useEffect(() => {
    const test = async () => {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from('pg_tables')
        .select('*')
        .limit(5);

      console.log('TEST RESULT:', data);
      console.log('TEST ERROR:', error);
      console.log('Test user:', user);
      console.log('Test authError:', authError);
    };

    test();
  }, []);
  const { user } = useAuth();
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
