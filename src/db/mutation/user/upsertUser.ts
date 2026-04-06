import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { AppUser } from '@/schema/AppUser';

export async function upsertUser(data: Omit<AppUser, 'isCurrentUser'>): Promise<void> {
  const userRef = doc(db, 'users', data.uuid);
  await setDoc(userRef, data, { merge: true });
}
