import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { AppUser } from '@/schema/AppUser';

export default async function queryAllUsers(): Promise<AppUser[]> {
  const snapshot = await getDocs(collection(db, 'users'));
  return snapshot.docs.map(
    (doc) => ({ uuid: doc.id, ...doc.data() }) as AppUser
  );
}
