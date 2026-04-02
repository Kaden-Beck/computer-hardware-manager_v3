import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Product } from '@/schema/Product';

export async function queryProductById(productId: string): Promise<Product | null> {
  const productRef = doc(db, 'products', productId);
  const snapshot = await getDoc(productRef);

  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() } as Product;
}

export async function queryAllProducts(): Promise<Product[]> {
  const snapshot = await getDocs(collection(db, 'products'));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Product);
}
