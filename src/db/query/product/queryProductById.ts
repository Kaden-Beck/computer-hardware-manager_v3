import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Product } from '@/schema/Product';

export default async function queryProductById(
  productId: string
): Promise<Product | null> {
  const productRef = doc(db, 'products', productId);
  const snapshot = await getDoc(productRef);

  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() } as Product;
}
