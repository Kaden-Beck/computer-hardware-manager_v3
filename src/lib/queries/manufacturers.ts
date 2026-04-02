import { queryOptions } from '@tanstack/react-query';
import {
  queryManufacturerById,
  queryAllManufacturers,
} from '@/db/query/getManufacturers';

export const allManufacturersQueryOptions = queryOptions({
  queryKey: ['manufacturers'],
  queryFn: queryAllManufacturers,
});

export const manufacturerByIdQueryOptions = (manufacturerId: string) =>
  queryOptions({
    queryKey: ['manufacturers', manufacturerId],
    queryFn: () => queryManufacturerById(manufacturerId),
  });
