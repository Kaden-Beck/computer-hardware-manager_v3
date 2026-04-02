import { queryOptions } from '@tanstack/react-query';

import { queryUserById, queryAllUsers } from '@/db/query/getUsers';

export const userByIdQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: ['users', userId],
    queryFn: () => queryUserById(userId),
  });

export const allUsersQueryOptions = queryOptions({
  queryKey: ['users'],
  queryFn: queryAllUsers,
});
