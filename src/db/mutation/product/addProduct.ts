import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Product } from '@/schema/Product';

export default async function addProduct(
  data: Omit<Product, 'id'>
): Promise<string> {
  const docRef = await addDoc(collection(db, 'products'), data);
  return docRef.id;
}
