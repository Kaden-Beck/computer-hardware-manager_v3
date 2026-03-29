import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function queryCategoryById(productId: string) {
  const productRef = doc(db, 'categories', productId);
  const snapshot = await getDoc(productRef);

  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() };
}

export async function queryAllCategories() {
  const snapshot = await getDocs(collection(db, 'categories'));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function queryChildrenCategories(parentId: string) {
  const childrenQuery = query(
    collection(db, 'categories'),
    where('parent', '==', parentId)
  );

  const snapshot = await getDocs(childrenQuery);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
