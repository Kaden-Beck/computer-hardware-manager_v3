import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function removeProduct(id: string): Promise<void> {
  await deleteDoc(doc(db, 'products', id));
}
