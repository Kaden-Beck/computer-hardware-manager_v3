import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function removeCategory(id: string): Promise<void> {
  await deleteDoc(doc(db, 'categories', id));
}
