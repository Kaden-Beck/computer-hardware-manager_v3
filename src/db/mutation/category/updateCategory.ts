import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Category } from '@/schema/Category';

export default async function updateCategory(
  id: string,
  data: Partial<Omit<Category, 'id'>>
): Promise<void> {
  await updateDoc(doc(db, 'categories', id), data);
}
