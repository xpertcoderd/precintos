import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import {
    getUsersAll,
    getUsersFiltered,
    getUserById,
    createUser,
    updateUser,
    updateUserPassword,
    deleteUser
} from '@/services/userService';

import { unref, computed } from 'vue';

export function useUsers() {
    const queryClient = useQueryClient();

    const useUsersAll = () => {
        return useQuery({
            queryKey: ['users', 'all'],
            queryFn: getUsersAll,
            staleTime: 1000 * 60 * 5, // 5 minutes
        });
    };

    const useUsersFiltered = (params) => {
        const queryKey = computed(() => ['users', 'filtered', unref(params)]);
        return useQuery({
            queryKey,
            queryFn: () => getUsersFiltered(unref(params)),
            staleTime: 1000 * 60 * 5,
            keepPreviousData: true,
        });
    };

    const useUserById = (id) => {
        return useQuery({
            queryKey: ['users', id],
            queryFn: () => getUserById(id),
            enabled: !!id,
        });
    };

    const useCreateUser = () => {
        return useMutation({
            mutationFn: createUser,
            onSuccess: () => {
                queryClient.invalidateQueries(['users']);
            },
        });
    };

    const useUpdateUser = () => {
        return useMutation({
            mutationFn: ({ id, data }) => updateUser(id, data),
            onSuccess: (data, variables) => {
                queryClient.invalidateQueries(['users']);
                queryClient.invalidateQueries(['users', variables.id]);
            },
        });
    };

    const useUpdateUserPassword = () => {
        return useMutation({
            mutationFn: ({ id, data }) => updateUserPassword(id, data),
        });
    };

    const useDeleteUser = () => {
        return useMutation({
            mutationFn: deleteUser,
            onSuccess: () => {
                queryClient.invalidateQueries(['users']);
            },
        });
    };

    return {
        useUsersAll,
        useUsersFiltered,
        useUserById,
        useCreateUser,
        useUpdateUser,
        useUpdateUserPassword,
        useDeleteUser,
    };
}
