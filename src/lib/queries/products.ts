import { queryOptions } from '@tanstack/react-query';
import { queryAllProducts, queryProductById } from '@/db/query/product/getProducts';

export const allProductsQueryOptions = queryOptions({
  queryKey: ['products'],
  queryFn: queryAllProducts,
});

export const productByIdQueryOptions = (productId: string) =>
  queryOptions({
    queryKey: ['products', productId],
    queryFn: () => queryProductById(productId),
  });
