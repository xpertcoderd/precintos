import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import {
    getDevicesFiltered,
    getCounterCandado,
    openDeviceSeal
} from '@/services/deviceService';

import { unref, computed } from 'vue';

export function useDevices() {
    const queryClient = useQueryClient();

    const useDevicesAll = (params) => {
        const queryKey = computed(() => ['devices', unref(params)]);
        return useQuery({
            queryKey,
            queryFn: () => getDevicesFiltered(unref(params)),
            staleTime: 1000 * 60 * 5, // 5 minutes
            keepPreviousData: true,
        });
    };

    const useCounterCandado = () => {
        return useQuery({
            queryKey: ['devicesCounter'],
            queryFn: getCounterCandado,
            staleTime: 1000 * 60 * 5,
        });
    };

    const useOpenDeviceSeal = () => {
        return useMutation({
            mutationFn: ({ params, pin }) => openDeviceSeal(params, pin),
            onSuccess: () => {
                queryClient.invalidateQueries(['devices']);
            },
        });
    };

    return {
        useDevicesAll,
        useCounterCandado,
        useOpenDeviceSeal,
    };
}
