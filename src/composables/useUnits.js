import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import {
    getTransferUnitsFiltered,
    assignContainers,
    linkTransferUnits,
    openTransferUnitSeal
} from '@/services/unitService';

import { unref, computed } from 'vue';

export function useUnits() {
    const queryClient = useQueryClient();

    const useTransferUnitsFiltered = (params, options = {}) => {
        const queryKey = computed(() => ['transferUnits', unref(params)]);
        return useQuery({
            queryKey,
            queryFn: () => getTransferUnitsFiltered(unref(params)),
            staleTime: 1000 * 60 * 5, // 5 minutes
            keepPreviousData: true,
            ...options,
        });
    };

    const useAssignContainers = () => {
        return useMutation({
            mutationFn: assignContainers,
            onSuccess: () => {
                queryClient.invalidateQueries(['transferUnits']);
                queryClient.invalidateQueries(['transfers']); // Might affect transfers
            },
        });
    };

    const useLinkTransferUnits = () => {
        return useMutation({
            mutationFn: linkTransferUnits,
            onSuccess: () => {
                queryClient.invalidateQueries(['transferUnits']);
            },
        });
    };

    const useOpenTransferUnitSeal = () => {
        return useMutation({
            mutationFn: ({ id, pin }) => openTransferUnitSeal(id, pin),
            onSuccess: () => {
                queryClient.invalidateQueries(['transferUnits']);
            },
        });
    };

    return {
        useTransferUnitsFiltered,
        useAssignContainers,
        useLinkTransferUnits,
        useOpenTransferUnitSeal,
    };
}
