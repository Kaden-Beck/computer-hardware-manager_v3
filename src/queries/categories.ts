import { queryOptions } from '@tanstack/react-query';
import { categoryDetails } from '@/data/stub/categoryData';

// Placeholder until firestore implemented. Queries static stub data
export const allCategoriesQueryOptions = queryOptions({
  queryKey: ['categories'],
  queryFn: () => Promise.resolve(categoryDetails),
  staleTime: Infinity,
});
