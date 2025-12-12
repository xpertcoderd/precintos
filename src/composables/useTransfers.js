import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { getTransfersSummary, createTransfer } from '@/services/transferService';
import { computed, unref } from 'vue';

export function useTransfers(params) {
    const queryClient = useQueryClient();

    // Ensure params is reactive or a computed ref
    const queryKey = computed(() => ['transfers', unref(params)]);

    const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
        queryKey,
        queryFn: () => getTransfersSummary(unref(params)),
        keepPreviousData: true, // Keep showing old data while fetching new page
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 1,
    });

    const createMutation = useMutation({
        mutationFn: createTransfer,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transfers'] });
        },
    });

    return {
        data,
        isLoading,
        isError,
        error,
        isFetching,
        createTransfer: createMutation.mutateAsync,
        isCreating: createMutation.isPending,
        refetch,
    };
}
