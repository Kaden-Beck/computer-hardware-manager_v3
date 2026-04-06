import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Category } from '@/schema/Category';

export async function addCategory(data: Omit<Category, 'id'>): Promise<string> {
  const docRef = await addDoc(collection(db, 'categories'), data);
  return docRef.id;
}
