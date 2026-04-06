import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Manufacturer } from '@/schema/Manufacturer';

export default async function queryManufacturerById(
  manufacturerId: string
): Promise<Manufacturer | null> {
  const manufacturerRef = doc(db, 'manufacturers', manufacturerId);
  const snapshot = await getDoc(manufacturerRef);

  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() } as Manufacturer;
}
