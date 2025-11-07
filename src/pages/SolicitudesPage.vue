<template>
  <div class="p-4 md:p-8 bg-slate-50 min-h-full">
    <!-- Main Content Area -->
    <main class="bg-white rounded-2xl shadow-lg p-6 min-w-fit">
      <div class="flex flex-col md:flex-row justify-between items-center mb-6">
        <div class="flex items-center gap-3">
          <!-- Inlined DocumentTextIcon -->
          <svg class="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          <h2 class="text-xl font-bold text-slate-800">{{ pageTitle }}</h2>
        </div>
        <div class="flex items-center gap-4 mt-4 md:mt-0">
          <button @click="showTransferWizard = true" class="px-5 py-2.5 text-sm font-medium text-white bg-sky-500 rounded-lg hover:bg-sky-600 focus:ring-4 focus:ring-sky-300">
            Crear Solicitud
          </button>
          <div class="relative w-64">
            <input type="text" placeholder="Search..." class="w-full pl-10 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-sky-500 focus:border-sky-500">
            <!-- Inlined SearchIcon -->
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
        </div>
      </div>

      <!-- Loading and Error States -->
      <div v-if="isLoading" class="text-center text-slate-500 py-4">Cargando...</div>
      <div v-else-if="error" class="text-center text-red-500 py-4">{{ error }}</div>

      <!-- The integrated table component -->
      <div v-else>
        <SolicitudesTable
            :data="items"
            @upload-payment="handleUploadPayment"
            @approve="handleApprove"
            @cancel="handleCancel"
            @link-shipment="handleLinkShipment"
            @view-voucher="handleViewVoucher"
        />
        <div class="mt-6 flex items-center justify-between">
            <div class="flex items-center gap-2 text-sm text-slate-500">
                <span>Mostrar</span>
                <select v-model="pageSize" class="rounded-md border-slate-300 text-sm focus:ring-sky-500 focus:border-sky-500">
                    <option :value="10">10</option>
                    <option :value="20">20</option>
                    <option :value="50">50</option>
                </select>
                <span>resultados</span>
            </div>
            <Pagination
                v-if="totalPages > 1"
                :current-page="currentPage"
                :total-pages="totalPages"
                :total="totalItems"
                :page-size="pageSize"
                @page-change="handlePageChange"
            />
        </div>
      </div>
    </main>

    <!-- Modals -->
    <VoucherUploadModal :visible="isVoucherModalVisible" @close="closeVoucherModal" @submit="handleVoucherSubmit" />

    <VoucherPreviewModal :visible="isPreviewModalVisible" :image-url="voucherImageUrl" @close="closePreviewModal" />

    <ConfirmationModal
      :visible="isApproveModalVisible"
      title="Confirmar Aprobación"
      message="¿Estás seguro que deseas aprobar este traslado?"
      @confirm="confirmApprove"
      @cancel="closeApproveModal"
    />

    <CreateLinkComponent
      v-if="showCreateLinkModal"
      :show="showCreateLinkModal"
      @close="showCreateLinkModal = false"
      :selected-container="selectedContainerForLink"
      :clients="linkModalData.clients"
      :carriers="linkModalData.carriers"
      :drivers="linkModalData.drivers"
      :vehicles="linkModalData.vehicles"
      :devices="linkModalData.devices"
    />

    <TransferWizardCard v-if="showTransferWizard" @close="showTransferWizard = false" @closeFetch="closeAndFetch" @updateTransfersList="fetchItems" />

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useSolicitudesPage } from '@/components/SolicitudesPage/composables/useSolicitudesPage';
import { transfers_uploadVoucher, transfers_update_state } from '@/components/conexion/DataConector.js';
import { useNotifications } from '@/composables/useNotifications';
import { useCreateLinkData } from '@/components/TransferWizard/composables/useCreateLinkData.js';
import SolicitudesTable from '@/components/SolicitudesPage/components/SolicitudesTable.vue';
import VoucherUploadModal from '@/components/SolicitudesPage/components/VoucherUploadModal.vue';
import VoucherPreviewModal from '@/components/SolicitudesPage/components/VoucherPreviewModal.vue';
import ConfirmationModal from '@/components/common/ConfirmationModal.vue';
import CreateLinkComponent from '@/components/CreateLink/CreateLinkComponent.vue';
import TransferWizardCard from '@/components/TransferWizard/TransferWizardCard.vue';
import Pagination from '@/components/Internal/Menu/Frames/Pages/PanelPrincipal/Pagination.vue';

const timeWindowHours = ref(720);

const {
  items,
  isLoading,
  error,
  pageTitle,
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  handlePageChange,
  fetchItems,
} = useSolicitudesPage(timeWindowHours);

const { sendNotification } = useNotifications();
const { linkModalData, fetchCreateLinkData } = useCreateLinkData();

const showTransferWizard = ref(false);
const isVoucherModalVisible = ref(false);
const isApproveModalVisible = ref(false);
const showCreateLinkModal = ref(false);
const isPreviewModalVisible = ref(false);
const voucherImageUrl = ref('');
const selectedTransferId = ref(null);
const selectedContainerForLink = ref(null);

function closeAndFetch() {
  showTransferWizard.value = false;
  fetchItems();
}
function handleUploadPayment(item) {
  selectedTransferId.value = item.transfer.id;
  isVoucherModalVisible.value = true;
}

function closeVoucherModal() {
  isVoucherModalVisible.value = false;
  selectedTransferId.value = null;
}

async function handleVoucherSubmit(file) {
  if (!selectedTransferId.value) return;

  const response = await transfers_uploadVoucher(selectedTransferId.value, file);

  if (response.success) {
    sendNotification('Comprobante subido con éxito', 'success');
    fetchItems(); // Refresh data
  } else {
    sendNotification('Error al subir el comprobante', 'error');
  }

  closeVoucherModal();
}

function handleApprove(item) {
  selectedTransferId.value = item.transfer.id;
  isApproveModalVisible.value = true;
}

function closeApproveModal() {
  isApproveModalVisible.value = false;
  selectedTransferId.value = null;
}

async function confirmApprove() {
  if (!selectedTransferId.value) return;

  const response = await transfers_update_state(selectedTransferId.value, 2); // 2 = Approved

  if (response.success) {
    sendNotification('Traslado aprobado con éxito', 'success');
    fetchItems(); // Refresh data
  } else {
    sendNotification('Error al aprobar el traslado', 'error');
  }

  closeApproveModal();
}

async function handleLinkShipment(item) {
  // Since we are linking the whole shipment, we can select the first container as a reference
  if (item.transferUnits && item.transferUnits.length > 0) {
    selectedContainerForLink.value = item.transferUnits[0];
    await fetchCreateLinkData();
    showCreateLinkModal.value = true;
  } else {
    sendNotification('No hay contenedores en este traslado para enlazar.', 'warning');
  }
}

function handleViewVoucher(item) {
  voucherImageUrl.value = item.transfer.voucherPhotoUrl;
  isPreviewModalVisible.value = true;
}

function closePreviewModal() {
  isPreviewModalVisible.value = false;
  voucherImageUrl.value = '';
}

function handleCancel(item) {
  // Placeholder for cancel logic
  sendNotification(`Solicitud #${item.transfer.id} cancelada (simulado).`, 'warning');
}

</script>
