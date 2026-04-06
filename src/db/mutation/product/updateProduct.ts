import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Product } from '@/schema/Product';

export default async function updateProduct(
  id: string,
  data: Partial<Omit<Product, 'id'>>
): Promise<void> {
  await updateDoc(doc(db, 'products', id), data);
}
