import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { getClientsFiltered, createClient, updateClient } from '@/services/clientService';
import { computed, unref } from 'vue';

export function useClients(params) {
    const queryClient = useQueryClient();

    const queryKey = computed(() => ['clients', unref(params)]);

    const { data, isLoading, isError, error, isFetching } = useQuery({
        queryKey,
        queryFn: () => getClientsFiltered(unref(params)),
        keepPreviousData: true,
        staleTime: 5 * 60 * 1000,
    });

    const createMutation = useMutation({
        mutationFn: createClient,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['clients'] });
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => updateClient(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['clients'] });
        },
    });

    return {
        data,
        isLoading,
        isError,
        error,
        isFetching,
        createClient: createMutation.mutateAsync,
        updateClient: updateMutation.mutateAsync,
        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,
    };
}
