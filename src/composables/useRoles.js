import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import {
    getRolesAll,
    getRolesFiltered,
    getRoleById,
    createRole,
    updateRole,
    deleteRole
} from '@/services/roleService';

import { unref, computed } from 'vue';

export function useRoles() {
    const queryClient = useQueryClient();

    const useRolesAll = () => {
        return useQuery({
            queryKey: ['roles', 'all'],
            queryFn: getRolesAll,
            staleTime: 1000 * 60 * 60, // 1 hour (roles change rarely)
        });
    };

    const useRolesFiltered = (params) => {
        const queryKey = computed(() => ['roles', 'filtered', unref(params)]);
        return useQuery({
            queryKey,
            queryFn: () => getRolesFiltered(unref(params)),
            staleTime: 1000 * 60 * 5,
            keepPreviousData: true,
        });
    };

    const useRoleById = (id) => {
        return useQuery({
            queryKey: ['roles', id],
            queryFn: () => getRoleById(id),
            enabled: !!id,
        });
    };

    const useCreateRole = () => {
        return useMutation({
            mutationFn: createRole,
            onSuccess: () => {
                queryClient.invalidateQueries(['roles']);
            },
        });
    };

    const useUpdateRole = () => {
        return useMutation({
            mutationFn: ({ id, data }) => updateRole(id, data),
            onSuccess: (data, variables) => {
                queryClient.invalidateQueries(['roles']);
                queryClient.invalidateQueries(['roles', variables.id]);
            },
        });
    };

    const useDeleteRole = () => {
        return useMutation({
            mutationFn: deleteRole,
            onSuccess: () => {
                queryClient.invalidateQueries(['roles']);
            },
        });
    };

    return {
        useRolesAll,
        useRolesFiltered,
        useRoleById,
        useCreateRole,
        useUpdateRole,
        useDeleteRole,
    };
}
