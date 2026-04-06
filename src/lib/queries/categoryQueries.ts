import queryAllCategories from '@/db/query/category/queryAllCategories';
import queryCategoriesByParent from '@/db/query/category/queryCategoriesByParent';
import queryCategoryById from '@/db/query/category/queryCategoryById';

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
    queryKey: ['categories', parentId, 'children'],
    queryFn: () => queryCategoriesByParent(parentId),
  });
