import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default async function removeUser(uuid: string): Promise<void> {
  await deleteDoc(doc(db, 'users', uuid));
}
