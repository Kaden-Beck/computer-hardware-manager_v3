import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Manufacturer } from '@/schema/Manufacturer';

export default async function updateManufacturer(
  id: string,
  data: Partial<Omit<Manufacturer, 'id'>>
): Promise<void> {
  await updateDoc(doc(db, 'manufacturers', id), data);
}
