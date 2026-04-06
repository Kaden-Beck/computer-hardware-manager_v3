import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Product } from '@/schema/Product';

export default async function queryProductByCategory(
  categoryId: string
): Promise<Product[]> {
  const productsQuery = query(
    collection(db, 'products'),
    where('categoryId', '==', categoryId)
  );

  const snapshot = await getDocs(productsQuery);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Product);
}
