import ProductEditComponent from '@/components/product/EditProductComponent';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/products/$prodId/edit')({
  component: ProductEditComponent,
});
