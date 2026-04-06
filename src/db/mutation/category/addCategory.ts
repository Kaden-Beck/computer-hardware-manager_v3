import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Category } from '@/schema/Category';

export default async function addCategory(
  data: Omit<Category, 'id'>
): Promise<string> {
  const docRef = await addDoc(collection(db, 'categories'), data);
  return docRef.id;
}
