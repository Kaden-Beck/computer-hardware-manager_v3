import { queryOptions } from '@tanstack/react-query';
import { productDetails } from '@/data/stub/productData';

// Placeholder until firestore implemented. Queries static stub data
export const allProductsQueryOptions = queryOptions({
  queryKey: ['products'],
  queryFn: () => Promise.resolve(productDetails),
  staleTime: Infinity,
});
