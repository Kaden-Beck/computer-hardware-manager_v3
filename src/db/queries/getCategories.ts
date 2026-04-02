import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Category } from '@/schema/Category';

export async function queryCategoryById(productId: string): Promise<Category | null> {
  const productRef = doc(db, 'categories', productId);
  const snapshot = await getDoc(productRef);

  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() } as Category;
}

export async function queryAllCategories(): Promise<Category[]> {
  const snapshot = await getDocs(collection(db, 'categories'));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Category);
}

export async function queryChildrenCategories(parentId: string): Promise<Category[]> {
  const childrenQuery = query(
    collection(db, 'categories'),
    where('parent', '==', parentId)
  );

  const snapshot = await getDocs(childrenQuery);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Category);
}
