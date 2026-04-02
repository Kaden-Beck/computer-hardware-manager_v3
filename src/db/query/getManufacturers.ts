import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Manufacturer } from '@/schema/Manufacturer';

export async function queryManufacturerById(
  manufacturerId: string
): Promise<Manufacturer | null> {
  const manufacturerRef = doc(db, 'manufacturers', manufacturerId);
  const snapshot = await getDoc(manufacturerRef);

  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() } as Manufacturer;
}

export async function queryAllManufacturers(): Promise<Manufacturer[]> {
  const snapshot = await getDocs(collection(db, 'manufacturers'));
  return snapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() }) as Manufacturer
  );
}
