import addProduct from '@/db/mutation/product/addProduct';
import updateProduct from '@/db/mutation/product/updateProduct';
import removeProduct from '@/db/mutation/product/removeProduct';
import updateProductImages from '@/db/mutation/product/updateProductImages';

import type { Product } from '@/schema/Product';
import type { ProductImage } from '@/schema/ProductImage';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useAddProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Product, 'id'>) => addProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Omit<Product, 'id'>>;
    }) => updateProduct(id, data),
    onSuccess: (_result, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['products', id] });
    },
  });
}

export function useRemoveProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => removeProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useUpdateProductImages() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      productId,
      images,
    }: {
      productId: string;
      images: ProductImage[];
    }) => updateProductImages(productId, images),
    onSuccess: (_result, { productId }) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['products', productId] });
    },
  });
}
