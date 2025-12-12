import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import {
    getTariffsFiltered,
    createTariff,
    getTariffRead,
    updateTariff,
    deleteTariff,
    getTariffTypesFiltered,
    getTransferTypesFiltered
} from '@/services/tariffService';
import { unref, computed } from 'vue';

export function useTariffs() {
    const queryClient = useQueryClient();

    const useTariffsFiltered = (params) => {
        const queryKey = computed(() => ['tariffs', 'filtered', unref(params)]);
        return useQuery({
            queryKey,
            queryFn: () => getTariffsFiltered(unref(params)),
            staleTime: 1000 * 60 * 5, // 5 minutes
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

    const useTariffRead = (id) => {
        const queryKey = computed(() => ['tariffs', 'read', unref(id)]);
        return useQuery({
            queryKey,
            queryFn: () => getTariffRead(unref(id)),
            enabled: computed(() => !!unref(id)),
            staleTime: 1000 * 60 * 5, // 5 minutes
        });
    };

    const useUpdateTariff = () => {
        return useMutation({
            mutationFn: ({ id, data }) => updateTariff(id, data),
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

    const useTariffTypesFiltered = (params = {}) => {
        return useQuery({
            queryKey: ['tariffTypes', 'filtered', params],
            queryFn: () => getTariffTypesFiltered(params),
            staleTime: 1000 * 60 * 60, // 1 hour (lookup data)
        });
    };

    const useTransferTypesFiltered = (params = {}) => {
        return useQuery({
            queryKey: ['transferTypes', 'filtered', params],
            queryFn: () => getTransferTypesFiltered(params),
            staleTime: 1000 * 60 * 60, // 1 hour (lookup data)
        });
    };

    return {
        useTariffsFiltered,
        useCreateTariff,
        useTariffRead,
        useUpdateTariff,
        useDeleteTariff,
        useTariffTypesFiltered,
        useTransferTypesFiltered,
    };
}
