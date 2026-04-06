import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Manufacturer } from '@/schema/Manufacturer';

export default async function queryAllManufacturers(): Promise<Manufacturer[]> {
  const snapshot = await getDocs(collection(db, 'manufacturers'));
  return snapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() }) as Manufacturer
  );
}
