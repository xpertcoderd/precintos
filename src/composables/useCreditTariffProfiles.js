import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import {
    createCreditTariffProfile,
    getCreditTariffProfilesFilteredWithClients,
    getCreditTariffProfilesFiltered,
    getCreditTariffProfileRead,
    updateCreditTariffProfile,
    deleteCreditTariffProfile
} from '@/services/creditTariffProfileService';
import { unref, computed } from 'vue';

export function useCreditTariffProfiles() {
    const queryClient = useQueryClient();

    const useCreateCreditTariffProfile = () => {
        return useMutation({
            mutationFn: createCreditTariffProfile,
            onSuccess: () => {
                queryClient.invalidateQueries(['creditTariffProfiles']);
            },
        });
    };

    const useCreditTariffProfilesFilteredWithClients = (params) => {
        const queryKey = computed(() => ['creditTariffProfiles', 'filteredWithClients', unref(params)]);
        return useQuery({
            queryKey,
            queryFn: () => getCreditTariffProfilesFilteredWithClients(unref(params)),
            staleTime: 1000 * 60 * 5, // 5 minutes
        });
    };

    const useCreditTariffProfilesFiltered = (params) => {
        const queryKey = computed(() => ['creditTariffProfiles', 'filtered', unref(params)]);
        return useQuery({
            queryKey,
            queryFn: () => getCreditTariffProfilesFiltered(unref(params)),
            staleTime: 1000 * 60 * 5, // 5 minutes
        });
    };

    const useCreditTariffProfileRead = (id) => {
        const queryKey = computed(() => ['creditTariffProfiles', 'read', unref(id)]);
        return useQuery({
            queryKey,
            queryFn: () => getCreditTariffProfileRead(unref(id)),
            enabled: computed(() => !!unref(id)),
            staleTime: 1000 * 60 * 5, // 5 minutes
        });
    };

    const useUpdateCreditTariffProfile = () => {
        return useMutation({
            mutationFn: ({ id, data }) => updateCreditTariffProfile(id, data),
            onSuccess: () => {
                queryClient.invalidateQueries(['creditTariffProfiles']);
            },
        });
    };

    const useDeleteCreditTariffProfile = () => {
        return useMutation({
            mutationFn: deleteCreditTariffProfile,
            onSuccess: () => {
                queryClient.invalidateQueries(['creditTariffProfiles']);
            },
        });
    };

    return {
        useCreateCreditTariffProfile,
        useCreditTariffProfilesFilteredWithClients,
        useCreditTariffProfilesFiltered,
        useCreditTariffProfileRead,
        useUpdateCreditTariffProfile,
        useDeleteCreditTariffProfile,
    };
}
