import { queryOptions } from '@tanstack/react-query';
import { queryAllProducts, queryProductById } from '@/db/queries/getProducts';

export const allProductsQueryOptions = queryOptions({
  queryKey: ['products'],
  queryFn: queryAllProducts,
});

export const productByIdQueryOptions = (productId: string) =>
  queryOptions({
    queryKey: ['products', productId, 'children'],
    queryFn: () => queryProductById(productId),
  });
