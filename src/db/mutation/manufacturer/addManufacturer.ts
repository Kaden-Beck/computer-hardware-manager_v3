import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Manufacturer } from '@/schema/Manufacturer';

export default async function addManufacturer(
  data: Omit<Manufacturer, 'id'>
): Promise<string> {
  const docRef = await addDoc(collection(db, 'manufacturers'), data);
  return docRef.id;
}
