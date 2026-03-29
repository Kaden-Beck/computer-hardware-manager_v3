import {
  queryAllCategories,
  queryCategoryById,
  queryChildrenCategories,
} from '@/db/queries/getCategories';
import { queryOptions } from '@tanstack/react-query';

export const allCategoriesQueryOptions = queryOptions({
  queryKey: ['categories'],
  queryFn: queryAllCategories,
});

export const categoryByIdQueryOptions = (categoryId: string) =>
  queryOptions({
    queryKey: ['categories', categoryId],
    queryFn: () => queryCategoryById(categoryId),
  });

export const childrenCategoriesOptions = (parentId: string) =>
  queryOptions({
    queryKey: ['categories', parentId],
    queryFn: () => queryChildrenCategories(parentId),
  });
