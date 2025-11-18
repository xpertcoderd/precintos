<template>
  <transition name="fade">
    <div v-if="show" class="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div class="bg-white rounded-xl shadow-2xl w-full max-w-3xl mx-auto flex overflow-hidden">
        <!-- Left Side: Video -->
        <div class="w-full md:w-1/3 bg-slate-100 rounded-l-xl overflow-hidden">
            <video src="@/assets/video/candado.mp4" alt="Security Lock Animation" autoplay loop muted playsinline class="w-full h-full object-cover"></video>
        </div>

        <!-- Right Side: Content -->
        <div class="w-full md:w-2/3 p-8">
          <h3 class="text-2xl font-bold text-slate-800 mb-2">Usted está a punto de abrir un precinto</h3>
          <p class="text-base text-slate-600 mb-6">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>

          <div class="space-y-4 text-base">
            <div>
              <p class="font-semibold text-slate-700">Serial:</p>
              <p class="text-lg text-slate-900" v-html="highlightedSerial"></p>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="font-semibold text-slate-700">Origen:</p>
                <p class="text-lg text-slate-900">{{ container.origin }}</p>
              </div>
              <div>
                <p class="font-semibold text-slate-700">Destino:</p>
                <p class="text-lg text-slate-900">{{ container.destination }}</p>
              </div>
            </div>
          </div>

          <div class="mt-8">
            <label for="pin-input" class="block text-lg font-medium text-slate-800">PIN de Seguridad</label>
            <input
              id="pin-input"
              v-model="pin"
              type="password"
              autocomplete="one-time-code"
              maxlength="4"
              class="mt-2 block w-full text-center tracking-[1.5em] text-3xl font-bold border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              placeholder="----"
            />
          </div>

          <div class="mt-8 flex justify-end gap-4">
            <button @click="$emit('close')" type="button" class="px-6 py-2.5 text-base font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">Cancelar</button>
            <button @click="handleSubmit" :disabled="!pin || pin.length < 4" class="px-6 py-2.5 text-base font-semibold text-white bg-sky-600 rounded-lg hover:bg-sky-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors">Confirmar</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  show: Boolean,
  container: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['close', 'confirm']);

const pin = ref('');

const highlightedSerial = computed(() => {
  const serial = props.container?.deviceId?.toString() || '';
  if (serial.length > 5) {
    const start = serial.slice(0, -5);
    const end = serial.slice(-5);
    return `${start}<span class="text-sky-500 font-bold">${end}</span>`;
  }
  return serial;
});

const handleSubmit = () => {
  if (pin.value && pin.value.length === 4) {
    emit('confirm', { containerId: props.container.transferUnitId, pin: pin.value });
  }
};
</script>
