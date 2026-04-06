import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default async function removeManufacturer(id: string): Promise<void> {
  await deleteDoc(doc(db, 'manufacturers', id));
}
