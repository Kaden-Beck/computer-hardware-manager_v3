import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { ProductImage } from '@/schema/ProductImage';

export default async function updateProductImages(
  productId: string,
  images: ProductImage[]
): Promise<void> {
  await updateDoc(doc(db, 'products', productId), { images });
}
