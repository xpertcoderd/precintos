import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import {
    getTariffsListAll,
    calculateTariff,
    createTariff,
    deleteTariff
} from '@/services/tariffService';

import { unref, computed } from 'vue';

export function useTariffs() {
    const queryClient = useQueryClient();

    const useTariffsListAll = () => {
        return useQuery({
            queryKey: ['tariffs', 'all'],
            queryFn: getTariffsListAll,
            staleTime: 1000 * 60 * 5,
        });
    };

    const useCalculateTariff = (trTypeId, startPlaceId, endPlaceId) => {
        const queryKey = computed(() => ['tariffs', 'calc', unref(trTypeId), unref(startPlaceId), unref(endPlaceId)]);
        return useQuery({
            queryKey,
            queryFn: () => calculateTariff(unref(trTypeId), unref(startPlaceId), unref(endPlaceId)),
            enabled: computed(() => !!unref(trTypeId) && !!unref(startPlaceId) && !!unref(endPlaceId)),
            staleTime: 1000 * 60 * 60, // 1 hour
        });
    };

    const useCreateTariff = () => {
        return useMutation({
            mutationFn: createTariff,
            onSuccess: () => {
                queryClient.invalidateQueries(['tariffs']);
            },
        });
    };

    const useDeleteTariff = () => {
        return useMutation({
            mutationFn: deleteTariff,
            onSuccess: () => {
                queryClient.invalidateQueries(['tariffs']);
            },
        });
    };

    return {
        useTariffsListAll,
        useCalculateTariff,
        useCreateTariff,
        useDeleteTariff,
    };
}
