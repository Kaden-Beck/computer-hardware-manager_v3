import upsertUser from '@/db/mutation/user/upsertUser';
import removeUser from '@/db/mutation/user/removeUser';

import type { AppUser } from '@/schema/AppUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpsertUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<AppUser, 'isCurrentUser'>) => upsertUser(data),
    onSuccess: (_result, data) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['users', data.uuid] });
    },
  });
}

export function useRemoveUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (uuid: string) => removeUser(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}
