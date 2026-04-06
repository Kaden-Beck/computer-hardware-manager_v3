import queryAllProducts from '@/db/query/product/queryAllProducts';
import queryProductById from '@/db/query/product/queryProductById';

import { queryOptions } from '@tanstack/react-query';

export const allProductsQueryOptions = queryOptions({
  queryKey: ['products'],
  queryFn: queryAllProducts,
});

export const productByIdQueryOptions = (productId: string) =>
  queryOptions({
    queryKey: ['products', productId],
    queryFn: () => queryProductById(productId),
  });
