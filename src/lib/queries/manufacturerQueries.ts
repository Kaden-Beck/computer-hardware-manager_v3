import queryAllManufacturers from '@/db/query/manufacturer/queryAllManufacturers';
import queryManufacturerById from '@/db/query/manufacturer/queryManufacturerById';

import { queryOptions } from '@tanstack/react-query';

export const allManufacturersQueryOptions = queryOptions({
  queryKey: ['manufacturers'],
  queryFn: queryAllManufacturers,
});

export const manufacturerByIdQueryOptions = (manufacturerId: string) =>
  queryOptions({
    queryKey: ['manufacturers', manufacturerId],
    queryFn: () => queryManufacturerById(manufacturerId),
  });
