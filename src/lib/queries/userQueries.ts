import queryAllUsers from '@/db/query/user/queryAllUsers';
import queryUserById from '@/db/query/user/queryUserById';

import { queryOptions } from '@tanstack/react-query';

export const userByIdQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: ['users', userId],
    queryFn: () => queryUserById(userId),
  });

export const allUsersQueryOptions = queryOptions({
  queryKey: ['users'],
  queryFn: queryAllUsers,
});
