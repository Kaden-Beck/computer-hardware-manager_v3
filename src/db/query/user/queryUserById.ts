import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { AppUser } from '@/schema/AppUser';

export async function queryUserById(userId: string): Promise<AppUser | null> {
  const userRef = doc(db, 'users', userId);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) return null;
  return { uuid: snapshot.id, ...snapshot.data() } as AppUser;
}
