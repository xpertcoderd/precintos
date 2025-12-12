<template>
  <transition name="fade">
    <div v-if="visible" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4">
      <div class="bg-white rounded-xl shadow-2xl w-full max-w-4xl mx-auto flex overflow-hidden max-h-[90vh]">
        <!-- Left Side: Image -->
        <div class="hidden md:block w-1/3 bg-slate-100 relative">
             <div class="absolute inset-0 bg-cover bg-center" :style="{ backgroundImage: `url(${require('@/assets/fondos/creditImg.png')})` }"></div>
        </div>

        <!-- Right Side: Content -->
        <div class="w-full md:w-2/3 p-8 overflow-y-auto">
            <div class="flex justify-between items-start mb-6">
                 <div>
                    <h3 class="text-2xl font-bold text-slate-800">Asignacion de Credito</h3>
                    <p class="text-sm text-slate-500 mt-1">Configure el perfil crediticio para este cliente.</p>
                 </div>
                  <img :src="require('@/assets/logo/auroraLogob.png')" alt="Aurora Logo" class="h-8" />
            </div>
         

          <div v-if="isLoadingProfile && profileId" class="flex justify-center items-center h-64">
           <span class="animate-spin h-8 w-8 border-4 border-sky-500 border-t-transparent rounded-full"></span>
          </div>

          <form v-else @submit.prevent="handleSubmit" class="space-y-8">
            <fieldset :disabled="isReadOnly" class="contents">
            <!-- Company Data (Read Only) -->
            <div>
              <h4 class="text-sm font-semibold text-slate-800 mb-4 border-l-4 border-sky-500 pl-3">Datos de la Compañía</h4>
              <div class="grid grid-cols-2 gap-6">
                <div class="space-y-1">
                  <label class="block text-xs font-medium text-slate-500 uppercase tracking-wider">Nombre</label>
                  <input type="text" :value="client?.name" disabled class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none transition-shadow" />
                </div>
                <div class="space-y-1">
                  <label class="block text-xs font-medium text-slate-500 uppercase tracking-wider">RNC</label>
                  <input type="text" :value="client?.rnc" disabled class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none transition-shadow" />
                </div>
              </div>
            </div>

            <!-- Credit Configuration -->
            <div class="pt-2">
               <div class="flex items-center justify-between mb-6">
                 <div class="flex items-center gap-4">
                     <span class="text-base font-semibold text-slate-800">Habilitar Crédito</span>
                     <Switch
                        v-model="formData.creditActive"
                        :class="formData.creditActive ? 'bg-sky-500' : 'bg-slate-200'"
                        class="relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                      >
                        <span
                          :class="formData.creditActive ? 'translate-x-6' : 'translate-x-1'"
                          class="inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-sm"
                        />
                      </Switch>
                 </div>
                 <div v-if="formData.creditActive" class="px-3 py-1 bg-green-50 text-green-700 text-xs rounded-full font-medium border border-green-100">
                    Activo
                 </div>
               </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-300" :class="{ 'opacity-50 blur-[1px] grayscale pointer-events-none select-none': !formData.creditActive }">
                <div class="space-y-1">
                    <label class="block text-xs font-medium text-slate-500 uppercase tracking-wider">Monto Aprobado</label>
                    <div class="relative">
                        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                        <input v-model.number="formData.amount" type="number" step="0.01" class="w-full pl-7 pr-4 py-2.5 border border-slate-300 rounded-lg text-slate-700 bg-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 disabled:bg-slate-50 disabled:text-slate-500 transition-shadow" placeholder="0.00" />
                    </div>
                </div>
                <div class="space-y-1">
                    <label class="block text-xs font-medium text-slate-500 uppercase tracking-wider">Plazo (Días)</label>
                     <input v-model.number="formData.days" type="number" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-700 bg-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 disabled:bg-slate-50 disabled:text-slate-500 transition-shadow" placeholder="30" />
                </div>
                 <div class="space-y-1">
                    <label class="block text-xs font-medium text-slate-500 uppercase tracking-wider">Día de Corte</label>
                     <input v-model.number="formData.cutDay" type="number" min="1" max="31" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-700 bg-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 disabled:bg-slate-50 disabled:text-slate-500 transition-shadow" placeholder="1" />
                </div>
              </div>
            </div>

             <!-- Discount Configuration -->
            <div class="pt-2 border-t border-slate-100">
               <div class="flex items-center justify-between mb-6 mt-4">
                 <div class="flex items-center gap-4">
                     <span class="text-base font-semibold text-slate-800">Aplicar Descuento</span>
                     <Switch
                        v-model="hasDiscount"
                        :class="hasDiscount ? 'bg-sky-500' : 'bg-slate-200'"
                        class="relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                      >
                        <span
                          :class="hasDiscount ? 'translate-x-6' : 'translate-x-1'"
                          class="inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-sm"
                        />
                      </Switch>
                 </div>
               </div>
               
               <div class="w-full md:w-1/3 transition-all duration-300" :class="{ 'opacity-50 blur-[1px] grayscale': !hasDiscount }">
                    <div class="space-y-1">
                        <label class="block text-xs font-medium text-slate-500 uppercase tracking-wider">Porcentaje %</label>
                        <div class="relative">
                             <input v-model.number="formData.discount" :disabled="!hasDiscount && !isReadOnly" type="number" step="0.01" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-slate-700 bg-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 disabled:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-500 transition-shadow" placeholder="0" />
                             <span class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">%</span>
                        </div>
                    </div>
               </div>
            </div>
            </fieldset>

            <!-- Actions -->
            <div class="flex justify-end gap-3 pt-6 border-t border-slate-100 mt-8">
              <template v-if="isReadOnly">
                   <button @click="enableEdit" type="button" class="px-6 py-2.5 text-sm font-semibold text-white bg-sky-600 rounded-lg hover:bg-sky-700 focus:ring-4 focus:ring-sky-200 transition-all shadow-sm hover:shadow-md">
                    Editar Perfil
                  </button>
                  <button @click="$emit('close')" type="button" class="px-6 py-2.5 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 focus:ring-4 focus:ring-slate-100 transition-all shadow-sm">
                    Cerrar
                  </button>
              </template>
              <template v-else>
                  <button @click="$emit('close')" type="button" class="px-6 py-2.5 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 focus:ring-4 focus:ring-slate-100 transition-all shadow-sm">
                    Cancelar
                  </button>
                  <button type="submit" :disabled="isSubmitting" class="px-6 py-2.5 text-sm font-semibold text-white bg-sky-600 rounded-lg hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md flex items-center gap-2 focus:ring-4 focus:ring-sky-200">
                     <span v-if="isSubmitting" class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                     {{ profileId ? 'Actualizar Cambios' : 'Guardar Perfil' }}
                  </button>
              </template>
            </div>
          </form>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { Switch } from '@headlessui/vue';
import { useCreditTariffProfiles } from '@/composables/useCreditTariffProfiles';

const props = defineProps({
  visible: Boolean,
  client: Object,
  profileId: {
    type: [Number, String],
    default: null
  }
});

const emit = defineEmits(['close', 'saved']);

const { useCreateCreditTariffProfile, useUpdateCreditTariffProfile, useCreditTariffProfileRead } = useCreditTariffProfiles();
const { mutateAsync: createProfile, isPending: isCreating } = useCreateCreditTariffProfile();
const { mutateAsync: updateProfile, isPending: isUpdating } = useUpdateCreditTariffProfile();

// Fetch profile data only if profileId is present
const { data: profileData, isLoading: isLoadingProfile } = useCreditTariffProfileRead(computed(() => props.profileId));

const isSubmitting = computed(() => isCreating.value || isUpdating.value);
const hasDiscount = ref(false);

const isReadOnly = ref(false);

const formData = ref({
  clientId: null,
  creditActive: false,
  amount: 0,
  balance: 0,
  days: 30,
  cutDay: 1,
  discount: 0,
  tariffByDistance: false
});

// Watch for changes in profileId and profileData
watch(() => [props.profileId, profileData.value], ([newProfileId, newProfileData]) => {
  if (newProfileId && newProfileData && newProfileData.data) {
     // View/Edit Mode
     isReadOnly.value = true;
     const profile = newProfileData.data.profile || newProfileData.data; // Handle potential response structure variations
     
     formData.value = {
        clientId: props.client?.id,
        creditActive: profile.creditActive,
        amount: profile.amount || 0,
        balance: profile.balance || 0,
        days: profile.days || 30,
        cutDay: profile.cutDay || 1,
        discount: profile.discount || 0,
        tariffByDistance: profile.tariffByDistance
     };
     hasDiscount.value = (profile.discount > 0);
  } else if (!newProfileId) {
     // Create Mode
     isReadOnly.value = false;
     formData.value = {
        clientId: props.client?.id,
        creditActive: false,
        amount: 0,
        balance: 0,
        days: 30,
        cutDay: 1,
        discount: 0,
        tariffByDistance: false
    };
    hasDiscount.value = false;
  }
}, { immediate: true, deep: true });

watch(() => props.client, (newClient) => {
    if(newClient) {
        formData.value.clientId = newClient.id;
    }
}, { immediate: true });

watch(hasDiscount, (val) => {
    if(!val) formData.value.discount = 0;
});

function enableEdit() {
    isReadOnly.value = false;
}

async function handleSubmit() {
    // If in read-only mode, it acts as "Close" or we shouldn't be here via submit
    if (isReadOnly.value) {
        emit('close');
        return;
    }

  try {
    const payload = { ...formData.value };
    
    if (props.profileId) {
      await updateProfile({ id: props.profileId, data: payload });
    } else {
      await createProfile(payload);
    }
    emit('saved');
    emit('close');
  } catch (error) {
    console.error('Error saving credit profile:', error);
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
