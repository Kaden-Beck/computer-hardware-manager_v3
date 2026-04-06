import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Category } from '@/schema/Category';

export default async function queryCategoriesByParent(
  parentId: string
): Promise<Category[]> {
  const childrenQuery = query(
    collection(db, 'categories'),
    where('parentId', '==', parentId)
  );

  const snapshot = await getDocs(childrenQuery);
  return snapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() }) as Category
  );
}
