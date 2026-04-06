import addCategory from '@/db/mutation/category/addCategory';
import updateCategory from '@/db/mutation/category/updateCategory';
import removeCategory from '@/db/mutation/category/removeCategory';

import type { Category } from '@/schema/Category';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useAddCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Category, 'id'>) => addCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Omit<Category, 'id'>>;
    }) => updateCategory(id, data),
    onSuccess: (_result, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['categories', id] });
    },
  });
}

export function useRemoveCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => removeCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
}
