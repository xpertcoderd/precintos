<template>
  <div class="flex flex-col md:flex-row bg-white rounded-2xl shadow-xl overflow-hidden">
    <!-- Left Panel: Steps & Image -->
    <div class="w-full md:w-1/3 relative hidden md:block min-h-[600px]">
      <!-- Background Image -->
      <img 
        src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
        alt="Logistics Background" 
        class="absolute inset-0 w-full h-full object-cover"
      />
      <!-- Overlay -->
      <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px]"></div>
      
      <!-- Steps Indicator -->
      <div class="relative z-10 p-8 h-full flex flex-col">
        <div class="flex items-center mb-12 w-full">
          <template v-for="step in 3" :key="step">
            <!-- Step Circle -->
            <div 
              class="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold transition-all duration-300 border-2"
              :class="[
                currentStep >= step ? 'bg-sky-500 border-sky-500 text-white scale-110' : 'bg-white/10 border-white/30 text-white backdrop-blur-sm'
              ]"
            >
              {{ step }}
            </div>

            <!-- Connector Line -->
            <div v-if="step < 3" class="flex-1 h-0.5 mx-2 bg-white/30 relative rounded-full overflow-hidden">
              <div 
                class="absolute inset-0 bg-sky-500 transition-all duration-500 origin-left"
                :class="currentStep > step ? 'scale-x-100' : 'scale-x-0'"
              ></div>
            </div>
          </template>
        </div>
        
        <div class="mt-auto text-white">
          <h3 class="text-2xl font-bold mb-2">{{ stepTitles[currentStep - 1] }}</h3>
          <p class="text-white/80 text-sm">{{ stepDescriptions[currentStep - 1] }}</p>
        </div>
      </div>
    </div>

    <!-- Right Panel: Form Content -->
    <div class="w-full md:w-2/3 p-8 flex flex-col">
      <div class="flex justify-between items-center mb-8">
        <img src="@/assets/logo.png" alt="Aurora Logo" class="h-8" v-if="false" /> <!-- Placeholder for logo if needed -->
        <h2 class="text-2xl font-bold text-slate-800">Aurora Technologies</h2>
      </div>

      <div class="flex-1">
        <!-- Step 1: Company Data -->
        <div v-if="currentStep === 1" class="space-y-4">
          <h3 class="text-lg font-semibold text-slate-700 mb-4">Datos de la Compañía</h3>
          <div class="grid grid-cols-2 gap-4">
            <div class="col-span-2 md:col-span-1">
              <label class="block text-sm/6 font-medium text-slate-700 mb-1">Nombre</label>
              <input v-model="formData.company.name" type="text" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6" placeholder="Nombre de la empresa" />
              <p v-if="errors.companyName" class="text-xs text-red-500 mt-1">{{ errors.companyName }}</p>
            </div>
            <div class="col-span-2 md:col-span-1">
              <label class="block text-sm/6 font-medium text-slate-700 mb-1">RNC</label>
              <input v-model="formData.company.rnc" type="text" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6" placeholder="RNC" />
              <p v-if="errors.companyRnc" class="text-xs text-red-500 mt-1">{{ errors.companyRnc }}</p>
            </div>
            
            <div class="col-span-2">
              <label class="block text-sm/6 font-medium text-slate-700 mb-1">Tipo de cliente</label>
              <div class="flex gap-4 mt-1">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="radio" v-model="formData.company.type" value="final" class="text-sky-500 focus:ring-sky-500" />
                  <span class="text-sm text-slate-600">Cliente Final</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input type="radio" v-model="formData.company.type" value="server" class="text-sky-500 focus:ring-sky-500" />
                  <span class="text-sm text-slate-600">Broker / Server</span>
                </label>
              </div>
            </div>

            <div class="col-span-2 md:col-span-1">
               <label class="block text-sm/6 font-medium text-slate-700 mb-1">Dirección</label>
               <input v-model="formData.company.address" type="text" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6" placeholder="Dirección completa" />
            </div>
            <div class="col-span-2 md:col-span-1">
               <label class="block text-sm/6 font-medium text-slate-700 mb-1">Teléfono</label>
               <input v-model="formData.company.phone" type="text" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6" placeholder="Teléfono" />
            </div>
             <div class="col-span-2 md:col-span-1">
               <label class="block text-sm/6 font-medium text-slate-700 mb-1">Correo</label>
               <input v-model="formData.company.email" type="email" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6" placeholder="correo@empresa.com" />
            </div>
             <div class="col-span-2 md:col-span-1">
               <label class="block text-sm/6 font-medium text-slate-700 mb-1">Página Web</label>
               <input v-model="formData.company.web" type="text" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6" placeholder="www.empresa.com" />
            </div>
             <div class="col-span-2">
               <label class="block text-sm/6 font-medium text-slate-700 mb-1">Nombre de contacto</label>
               <input v-model="formData.company.contact" type="text" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6" placeholder="Persona de contacto" />
            </div>
          </div>
        </div>

        <!-- Step 2: User Data -->
        <div v-if="currentStep === 2" class="space-y-4">
          <h3 class="text-lg font-semibold text-slate-700 mb-4">Creación de usuario</h3>
          <div class="grid grid-cols-2 gap-4">
            <div class="col-span-2">
               <label class="block text-sm/6 font-medium text-slate-700 mb-1">Compañía</label>
               <input :value="formData.company.name" disabled type="text" class="block w-full rounded-md bg-slate-50 px-3 py-1.5 text-slate-500 outline outline-1 -outline-offset-1 outline-slate-200 sm:text-sm/6" />
            </div>
            
             <div class="col-span-2 md:col-span-1">
               <label class="block text-sm/6 font-medium text-slate-700 mb-1">Nombre</label>
               <input v-model="formData.user.firstName" type="text" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6" placeholder="Nombre" />
                <p v-if="errors.userFirstName" class="text-xs text-red-500 mt-1">{{ errors.userFirstName }}</p>
            </div>
             <div class="col-span-2 md:col-span-1">
               <label class="block text-sm/6 font-medium text-slate-700 mb-1">Apellido</label>
               <input v-model="formData.user.lastName" type="text" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6" placeholder="Apellido" />
            </div>
            
            <div class="col-span-2 md:col-span-1">
               <label class="block text-sm/6 font-medium text-slate-700 mb-1">Cédula</label>
               <input v-model="formData.user.idcard" type="text" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6" placeholder="Cédula" />
               <p v-if="errors.userIdcard" class="text-xs text-red-500 mt-1">{{ errors.userIdcard }}</p>
            </div>
            
             <div class="col-span-2 md:col-span-1">
               <label class="block text-sm/6 font-medium text-slate-700 mb-1">Dirección</label>
               <input v-model="formData.user.address" type="text" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6" placeholder="Dirección" />
            </div>
             <div class="col-span-2 md:col-span-1">
               <label class="block text-sm/6 font-medium text-slate-700 mb-1">Teléfono</label>
               <input v-model="formData.user.phone" type="text" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6" placeholder="Teléfono" />
            </div>
            
             <div class="col-span-2 md:col-span-1">
               <label class="block text-sm/6 font-medium text-slate-700 mb-1">Correo</label>
               <input v-model="formData.user.email" type="email" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6" placeholder="Email" />
                <p v-if="errors.userEmail" class="text-xs text-red-500 mt-1">{{ errors.userEmail }}</p>
            </div>
             <div class="col-span-2 md:col-span-1">
               <label class="block text-sm/6 font-medium text-slate-700 mb-1">Rol de Usuario</label>
               <select v-model="formData.user.rolId" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6">
                 <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
               </select>
            </div>

            <div class="col-span-2 border-t border-slate-100 pt-4 mt-2">
              <h4 class="text-sm font-medium text-slate-900 mb-3">Configuración de cuenta</h4>
               <div class="grid grid-cols-2 gap-4">
                  <div class="col-span-2 md:col-span-1">
                    <label class="block text-sm/6 font-medium text-slate-700 mb-1">Nombre de Usuario</label>
                    <input v-model="formData.user.username" type="text" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6" placeholder="Username" />
                     <p v-if="errors.userUsername" class="text-xs text-red-500 mt-1">{{ errors.userUsername }}</p>
                  </div>
                  <div class="col-span-2 md:col-span-1">
                    <label class="block text-sm/6 font-medium text-slate-700 mb-1">Contraseña</label>
                    <input v-model="formData.user.passwd" type="password" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6" placeholder="Password" />
                     <p v-if="errors.userPasswd" class="text-xs text-red-500 mt-1">{{ errors.userPasswd }}</p>
                  </div>
                   <div class="col-span-2 md:col-span-1">
                    <label class="block text-sm/6 font-medium text-slate-700 mb-1">PIN</label>
                    <input v-model="formData.user.pin" type="text" class="block w-full rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6" placeholder="PIN (4 digits)" maxlength="4" />
                  </div>
               </div>
            </div>
          </div>
        </div>

        <!-- Step 3: Assignment -->
        <div v-if="currentStep === 3" class="space-y-4">
           <h3 class="text-lg font-semibold text-slate-700 mb-4">Asignación de cliente</h3>
           <div class="space-y-4">
             <div>
               <label class="block text-sm/6 font-medium text-slate-700 mb-1">Compañía</label>
               <input :value="formData.company.name" disabled type="text" class="block w-full rounded-md bg-slate-50 px-3 py-1.5 text-slate-500 outline outline-1 -outline-offset-1 outline-slate-200 sm:text-sm/6" />
             </div>
             
             <div>
                <label class="block text-sm/6 font-medium text-slate-700 mb-1">Asignar Cliente Final</label>
                <div class="flex gap-2">
                  <select v-model="selectedAssignment" class="block flex-1 rounded-md bg-transparent px-3 py-1.5 text-slate-900 outline outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-500 sm:text-sm/6">
                    <option value="" disabled>Seleccione un cliente</option>
                    <option v-for="client in availableClients" :key="client.id" :value="client.id">{{ client.name }}</option>
                  </select>
                  <button @click="addAssignment" class="bg-green-500 hover:bg-green-600 text-white rounded-lg px-4 py-2 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                  </button>
                </div>
             </div>

             <!-- List of assigned clients -->
             <div v-if="formData.assignments.length > 0" class="mt-4">
               <h4 class="text-sm font-medium text-slate-700 mb-2">Clientes Asignados:</h4>
               <div class="space-y-2">
                 <div v-for="(id, index) in formData.assignments" :key="id" class="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                   <span class="text-sm text-slate-600">{{ getClientName(id) }}</span>
                   <button @click="removeAssignment(index)" class="text-red-500 hover:text-red-700">
                     <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                   </button>
                 </div>
               </div>
             </div>
           </div>
        </div>
      </div>

      <!-- Footer Actions -->
      <div class="mt-8 flex justify-between items-center pt-4 border-t border-slate-100">
        <button 
          v-if="currentStep > 1" 
          @click="prevStep"
          class="px-6 py-2.5 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
        >
          Atrás
        </button>
        <div v-else></div> <!-- Spacer -->

        <div class="flex gap-3">
          <button 
             v-if="currentStep > 1"
             @click="skipStep" 
             class="px-4 py-2.5 text-sm font-medium text-slate-400 hover:text-slate-600 transition-colors"
          >
            Omitir
          </button>
          <button 
            @click="nextStep"
            class="px-6 py-2.5 text-sm font-medium text-white bg-sky-500 rounded-lg hover:bg-sky-600 shadow-lg shadow-sky-500/30 transition-all hover:scale-105"
            :disabled="isLoading"
          >
            <span v-if="isLoading">Procesando...</span>
            <span v-else>{{ currentStep === 3 ? 'Finalizar' : 'Siguiente' }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { createClient, relateClients, getClientsFiltered } from '@/services/clientService';
import { createUser } from '@/services/userService';
import { getRolesFiltered } from '@/services/roleService';
import { useNotifications } from '@/composables/useNotifications';
import { useQueryClient } from '@tanstack/vue-query';

const emit = defineEmits(['close', 'refresh']);
const { sendNotification } = useNotifications();
const queryClient = useQueryClient();

const currentStep = ref(1);
const isLoading = ref(false);
const roles = ref([]);
const availableClients = ref([]);
const selectedAssignment = ref('');
const skippedUserCreation = ref(false);

const stepTitles = ['Creación de cliente', 'Creación de usuario', 'Asignación de cliente'];
const stepDescriptions = [
  'Ingrese los datos principales de la compañía.',
  'Configure el usuario administrador inicial.',
  'Asigne clientes finales si es necesario.'
];

const formData = reactive({
  company: {
    name: '',
    rnc: '',
    type: 'final',
    address: '',
    phone: '',
    email: '',
    web: '',
    contact: ''
  },
  user: {
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    email: '',
    rolId: 2,
    username: '',
    passwd: '',
    pin: '',
    idcard: ''
  },
  assignments: [] // Array of client IDs
});

const errors = reactive({});

// Fetch initial data
// Fetch initial data
onMounted(async () => {
  try {
    const [rolesRes, clientsRes] = await Promise.all([
      getRolesFiltered(), 
      getClientsFiltered({ type: 'final' })
    ]);
    
    // Handle roles response which might be array or object with data
    if (rolesRes && rolesRes.data && Array.isArray(rolesRes.data.roles)) {
       roles.value = rolesRes.data.roles;
    } else if (Array.isArray(rolesRes)) {
      roles.value = rolesRes;
    } else if (rolesRes && rolesRes.data && Array.isArray(rolesRes.data)) {
      roles.value = rolesRes.data;
    }

    // Handle clients response
    if (clientsRes && clientsRes.data && Array.isArray(clientsRes.data.clients)) {
      // Structure: { data: { clients: [ { client: { ... } } ] } }
      availableClients.value = clientsRes.data.clients.map(item => item.client);
    } else if (Array.isArray(clientsRes)) {
      availableClients.value = clientsRes;
    } else if (clientsRes && clientsRes.data && Array.isArray(clientsRes.data)) {
      availableClients.value = clientsRes.data;
    }
  } catch (e) {
    console.error('Error loading initial data', e);
  }
});

function validateStep1() {
  errors.companyName = !formData.company.name ? 'El nombre es requerido' : '';
  errors.companyRnc = !formData.company.rnc ? 'El RNC es requerido' : '';
  return !errors.companyName && !errors.companyRnc;
}

function validateStep2() {
  errors.userFirstName = !formData.user.firstName ? 'El nombre es requerido' : '';
  errors.userEmail = !formData.user.email ? 'El email es requerido' : '';
  errors.userUsername = !formData.user.username ? 'El usuario es requerido' : '';
  errors.userPasswd = !formData.user.passwd ? 'La contraseña es requerida' : '';
  errors.userIdcard = !formData.user.idcard ? 'La cédula es requerida' : '';
  return !errors.userFirstName && !errors.userEmail && !errors.userUsername && !errors.userPasswd && !errors.userIdcard;
}

async function nextStep() {
  if (currentStep.value === 1) {
    if (!validateStep1()) return;
    currentStep.value++;
  } else if (currentStep.value === 2) {
    if (!validateStep2()) return;
    skippedUserCreation.value = false;
    currentStep.value++;
  } else if (currentStep.value === 3) {
    await finishWizard();
  }
}

function prevStep() {
  if (currentStep.value > 1) currentStep.value--;
}

function skipStep() {
  if (currentStep.value === 2) {
    skippedUserCreation.value = true;
  }
  if (currentStep.value < 3) currentStep.value++;
  else finishWizard();
}

function addAssignment() {
  if (selectedAssignment.value && !formData.assignments.includes(selectedAssignment.value)) {
    formData.assignments.push(selectedAssignment.value);
    selectedAssignment.value = '';
  }
}

function removeAssignment(index) {
  formData.assignments.splice(index, 1);
}

function getClientName(id) {
  const client = availableClients.value.find(c => c.id === id);
  return client ? client.name : id;
}

async function finishWizard() {
  isLoading.value = true;
  try {
    // 1. Create Client
    const clientRes = await createClient(formData.company);
    if (!clientRes.success) throw new Error(clientRes.message || 'Error creando cliente');
    
    const newClientId = clientRes.data?.client?.id; 
    
    // 2. Create User (if data provided and not skipped)
    if (!skippedUserCreation.value && formData.user.username) {
      const userPayload = {
        ...formData.user,
        clientId: newClientId
      };
      const userRes = await createUser(userPayload);
      if (!userRes.success) console.warn('Error creando usuario:', userRes.message); 
    }

    // 3. Assignments (if any)
    if (formData.assignments.length > 0) {
      const relatePayload = {
        serverId: newClientId,
        finalIds: formData.assignments
      };
      await relateClients(relatePayload);
    }

    sendNotification('Cliente creado exitosamente', 'success');
    queryClient.invalidateQueries({ queryKey: ['clients'] }); // Invalidate cache
    emit('refresh');
    emit('close');
  } catch (e) {
    sendNotification(e.message, 'error');
  } finally {
    isLoading.value = false;
  }
}
</script>
