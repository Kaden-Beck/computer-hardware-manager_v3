import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Category } from '@/schema/Category';

export default async function queryCategoryById(
  categoryId: string
): Promise<Category | null> {
  const productRef = doc(db, 'categories', categoryId);
  const snapshot = await getDoc(productRef);

  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() } as Category;
}
