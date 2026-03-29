import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function queryManufacturerById(manufacturerId: string) {
  const manufacturerRef = doc(db, 'manufacturers', manufacturerId);
  const snapshot = await getDoc(manufacturerRef);

  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() };
}

export async function queryAllManufacturers() {
  const snapshot = await getDocs(collection(db, 'manufacturers'));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
