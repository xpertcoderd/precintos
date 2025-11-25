import { useQuery } from '@tanstack/vue-query';
import {
    getTransferBlitsFiltered,
    getTransferBlitsMapPoints,
    getTransferBlit
} from '@/services/blitService';

import { unref, computed } from 'vue';

export function useBlits() {

    const useTransferBlitsFiltered = (params, options = {}) => {
        const queryKey = computed(() => ['transferBlits', unref(params)]);
        return useQuery({
            queryKey,
            queryFn: () => getTransferBlitsFiltered(unref(params)),
            staleTime: 1000 * 60 * 2, // 2 minutes
            keepPreviousData: true,
            ...options,
        });
    };

    const useTransferBlitsMapPoints = (params) => {
        const queryKey = computed(() => ['transferBlitsMapPoints', unref(params)]);
        return useQuery({
            queryKey,
            queryFn: () => getTransferBlitsMapPoints(unref(params)),
            staleTime: 1000 * 60 * 5, // 5 minutes
        });
    };

    const useTransferBlit = (params) => {
        const queryKey = computed(() => ['transferBlit', unref(params)]);
        return useQuery({
            queryKey,
            queryFn: () => getTransferBlit(unref(params)),
            enabled: !!unref(params), // Only run if params are provided
        });
    };

    return {
        useTransferBlitsFiltered,
        useTransferBlitsMapPoints,
        useTransferBlit,
    };
}
