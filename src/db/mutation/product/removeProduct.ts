import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default async function removeProduct(id: string): Promise<void> {
  await deleteDoc(doc(db, 'products', id));
}
