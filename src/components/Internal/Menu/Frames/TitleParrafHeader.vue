<template>

    <div class="paginaContainer">


        <div class="tituloDinamico" v-if="incomingData.step == 1">

            <div v-if="incomingData.updatingClient">
                Actualizacion de Cliente
            </div>

            <div v-else>
                Creación de Cliente
            </div>


        </div>

        <div class="tituloDinamico" v-if="incomingData.step == 2">

            <div v-if="incomingData.updatingUser">
                Actualizacion de Usuario
            </div>

            <div v-else>
                Creación de Usuario
            </div>


        </div>

        <div class="tituloDinamico" v-if="incomingData.step == 3">

            <div>
                Asignacion de cliente
            </div>


        </div>

        <div class="parrafo">
            {{ incomingData.parrafo }}
        </div>

        <img src="@/assets/logo/auroraLogob.png" class="imgHeader">


    </div>


</template>

<script setup>


const incomingData = defineProps(['step', 'parrafo', 'updatingClient', 'updatingUser']);


</script>

<style scoped>
.paginaContainer {
    padding: 20px;
    padding-left: 20px;
    position: relative;
}

.tituloDinamico {
    font-weight: 600;
    color: black;
}

.imgHeader {
    position: absolute;
    background:
        transparent;
    width: 180px;
    top: 15px;
    right: 10px;
}
</style>