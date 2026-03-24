import { queryOptions } from '@tanstack/react-query';
import { manufacturerDetails } from '@/data/stub/manufacturerData';

// Placeholder until firestore implemented. Queries static stub data
export const allManufacturersQueryOptions = queryOptions({
  queryKey: ['manufacturers'],
  queryFn: () => Promise.resolve(manufacturerDetails),
  staleTime: Infinity,
});
