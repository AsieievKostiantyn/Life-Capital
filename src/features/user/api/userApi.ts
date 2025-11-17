import { collection, getDocs } from 'firebase/firestore';

import { db } from '@/shared/firebase';
import type { AppUser } from '@/shared/types';

export const userApi = {
  getAllUsers: async (): Promise<AppUser[]> => {
    const snapshot = await getDocs(collection(db, 'users'));
    return snapshot.docs.map((doc) => doc.data() as AppUser);
  },
};
