import addManufacturer from '@/db/mutation/manufacturer/addManufacturer';
import updateManufacturer from '@/db/mutation/manufacturer/updateManufacturer';
import removeManufacturer from '@/db/mutation/manufacturer/removeManufacturer';

import type { Manufacturer } from '@/schema/Manufacturer';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useAddManufacturer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Manufacturer, 'id'>) => addManufacturer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['manufacturers'] });
    },
  });
}

export function useUpdateManufacturer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Omit<Manufacturer, 'id'>>;
    }) => updateManufacturer(id, data),
    onSuccess: (_result, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['manufacturers'] });
      queryClient.invalidateQueries({ queryKey: ['manufacturers', id] });
    },
  });
}

export function useRemoveManufacturer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => removeManufacturer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['manufacturers'] });
    },
  });
}
