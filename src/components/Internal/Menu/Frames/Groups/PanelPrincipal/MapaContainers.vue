<template>
    <div class="AreaTrabajoPage">

        <TitleBtnSearch :title="'Traslados'" :btnTitle="'Crear Traslado'" @functionBtn="crearTraslado"
            @search="Busqueda" />

        <div class="contenedorMapa_Menu">

            <div class="MenuMapa">
                <ListAndMapa @traces="showTrace" :transfer_id="incomingData.transfer_id"
                    :transferBlits="transferBlits" />
            </div>

            <div class="mapa">
                <MapaPage v-if="mapaListo" :inputData="valoresDefectoMapa" ref="mapaRef" />
                <div class="text-center" v-else>
                    <h2 style="padding: 20px; color: #58bbda;">{{ mensaje }}</h2>

                </div>
            </div>

        </div>

    </div>

</template>
<script setup>

import ListAndMapa from '@/components/Internal/Menu/Frames/Groups/PanelPrincipal/ListAndMapa.vue'

import TitleBtnSearch from '@/components/Internal/Menu/Frames/TitleBtnSearch.vue'

import MapaPage from '@/components/MapaPage.vue'

import { blitsTranfers } from '@/components/conexion/DataConector.js'
//import import { blitsTranfers } from '@/components/conexion/DataConectorTest.js'

import { ref, defineProps, defineEmits, onMounted } from 'vue'


onMounted(() => {
    showTrace("idContianer")
})

import { ultimoElementoGeneral } from '@/components/utils.js'

import { useRoute } from 'vue-router';

const route = useRoute();

const incomingData = defineProps(['transfer_id']);

const outGoingData = defineEmits(['showAddTransfer'])

let mapaListo = ref(false)

let mensaje = ref("No Hay Resultado Disponible")


let transferBlits = ref({
    transfer: {
        id: 47955,
        clientId: 6,
        bl: "BQEGMXM058375",
        startPlace: {
            id: 2388925,
            label: "Puerto Haina",
            radius: 101,
            latitude: 18.4691788,
            longitude: -69.9566977,
            address: "Dirección General de Aduanas Puerto de Sans Soucí, República Dominicana, 10210"
        },
        endPlace: {
            id: 2388926,
            label: "Maritima Dominicana Caucedo",
            radius: 670,
            latitude: 18.50135,
            longitude: -69.7791422,
            address: "Calle Lateral 5, Parque Industrial Itabo, San Gregorio de Nigua, San Cristóbal, República Dominicana, 00809"
        },
        address: "SANTO DOMINGO, False",
        city: "San Cristóbal",
        note: "",
        timeTravelEst: "2024-03-23 00:00:00",
        timeRequest: "2024-09-27 16:23:41"
    },
    transferLnkBlits: [
        {
            transferLinked: {
                id: 581,
                transferId: 47955,
                deviceId: 1073543,
                container: "FSCU821459",
                currentState: 5,
                timeLinked: "2024-09-27 16:23:41",
                lastBlitTime: "2024-09-30 17:20:14"
            },
            transferBlits: [
                //{   id:465036,trLnkId:581, transferId:36365, deviceId:1073543, blitTime:"2024-09-27 16:35:33", lat:18.4581316,lng:-69.71066, heading:0, speed:0,distance:30420, distanceRemain:45976, travelTime:4141, timeRemain:2567, statusId:2, completed:0 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.47439, lng: -69.9172266, heading: 0, completed: 0 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4755344, lng: -69.91564, heading: 0, completed: 0 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4762777, lng: -69.9135955, heading: 0, completed: 0 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4762533, lng: -69.9112088, heading: 0, completed: 0 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4759344, lng: -69.9088577, heading: 0, completed: 0 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4765033, lng: -69.9048977, heading: 0, completed: 19 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4860455, lng: -69.8778222, heading: 0, completed: 37 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4855733, lng: -69.8739111, heading: 0, completed: 39 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4854333, lng: -69.87208, heading: 0, completed: 40 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4845711, lng: -69.8612, heading: 0, completed: 46 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4844433, lng: -69.8594266, heading: 0, completed: 47 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4843811, lng: -69.8575422, heading: 0, completed: 48 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4845088, lng: -69.8556133, heading: 0, completed: 50 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4848266, lng: -69.8535822, heading: 0, completed: 51 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.48481, lng: -69.85144, heading: 0, completed: 52 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4848955, lng: -69.8451688, heading: 0, completed: 53 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4841611, lng: -69.8414444, heading: 0, completed: 55 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4840466, lng: -69.8393333, heading: 0, completed: 53 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4832211, lng: -69.8281422, heading: 0, completed: 61 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4826788, lng: -69.8099511, heading: 0, completed: 68 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4827922, lng: -69.8042533, heading: 0, completed: 71 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.48307, lng: -69.7904488, heading: 0, completed: 79 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4827766, lng: -69.7783422, heading: 0, completed: 86 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.48309, lng: -69.7777022, heading: 0, completed: 78 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4841077, lng: -69.7779377, heading: 0, completed: 87 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.5023444, lng: -69.77556, heading: 0, completed: 88 }
            ]
        },
        {
            transferLinked: {
                id: 581,
                transferId: 47955,
                deviceId: 1073543,
                container: "FSCU8216715",
                currentState: 3,
                timeLinked: "2024-09-27 16:23:41",
                lastBlitTime: "2024-09-30 17:20:14"
            },
            transferBlits: [
                //{   id:465036,trLnkId:581, transferId:36365, deviceId:1073543, blitTime:"2024-09-27 16:35:33", lat:18.4581316,lng:-69.71066, heading:0, speed:0,distance:30420, distanceRemain:45976, travelTime:4141, timeRemain:2567, statusId:2, completed:0 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4691788, lng: -69.9566977, heading: 350, completed: 2 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4695111, lng: -69.9567866, heading: 348, completed: 2 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4702011, lng: -69.9569466, heading: 347, completed: 2 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4707566, lng: -69.9570711, heading: 349, completed: 2 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4714377, lng: -69.9572222, heading: 347, completed: 3 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4724488, lng: -69.9574666, heading: 351, completed: 2 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4721655, lng: -69.9574266, heading: 164, completed: 3 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4716211, lng: -69.9573066, heading: 165, completed: 3 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4709722, lng: -69.9571466, heading: 168, completed: 2 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.47035, lng: -69.9570177, heading: 167, completed: 2 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4697155, lng: -69.95688, heading: 166, completed: 2 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4692822, lng: -69.9567644, heading: 168, completed: 2 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4660411, lng: -69.9539777, heading: 167, completed: 11 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.46439, lng: -69.9539955, heading: 175, completed: 12 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4636588, lng: -69.9537066, heading: 159, completed: 12 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4631577, lng: -69.9535155, heading: 160, completed: 12 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4623677, lng: -69.9532177, heading: 160, completed: 13 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4615555, lng: -69.95292, heading: 160, completed: 13 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4612444, lng: -69.9524666, heading: 68, completed: 14 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4615455, lng: -69.9517155, heading: 69, completed: 14 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4617877, lng: -69.9510666, heading: 71, completed: 14 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4620555, lng: -69.9502711, heading: 70, completed: 15 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4622844, lng: -69.9495333, heading: 70, completed: 15 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4619422, lng: -69.9493333, heading: 160, completed: 15 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4612711, lng: -69.94908, heading: 159, completed: 15 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4607433, lng: -69.9488755, heading: 159, completed: 16 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4603555, lng: -69.9487288, heading: 158, completed: 16 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4598366, lng: -69.9485155, heading: 153, completed: 16 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4597566, lng: -69.9484711, heading: 150, completed: 16 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.45945, lng: -69.9483555, heading: 160, completed: 16 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4588866, lng: -69.9481422, heading: 161, completed: 17 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.45805, lng: -69.9478311, heading: 162, completed: 17 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4576888, lng: -69.9476177, heading: 87, completed: 17 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4579333, lng: -69.9468711, heading: 71, completed: 18 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4582822, lng: -69.9457866, heading: 72, completed: 18 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4587044, lng: -69.9444711, heading: 71, completed: 19 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4591422, lng: -69.9430711, heading: 72, completed: 19 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4613955, lng: -69.9384444, heading: 61, completed: 22 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4685666, lng: -69.9242844, heading: 61, completed: 29 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4724677, lng: -69.9193511, heading: 45, completed: 32 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4762633, lng: -69.9117822, heading: 96, completed: 35 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4768911, lng: -69.9042666, heading: 54, completed: 39 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4820233, lng: -69.8961999, heading: 38, completed: 43 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4859922, lng: -69.8883111, heading: 53, completed: 47 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4859788, lng: -69.8784177, heading: 95, completed: 52 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4845922, lng: -69.8617777, heading: 94, completed: 59 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4848744, lng: -69.8516844, heading: 108, completed: 63 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4854777, lng: -69.84292, heading: 75, completed: 67 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.48679, lng: -69.8349688, heading: 74, completed: 71 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4881055, lng: -69.8299466, heading: 72, completed: 73 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4894066, lng: -69.8249511, heading: 74, completed: 75 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4918955, lng: -69.81536, heading: 73, completed: 80 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4934311, lng: -69.8095866, heading: 73, completed: 83 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.49548, lng: -69.8016666, heading: 75, completed: 86 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4969366, lng: -69.7958755, heading: 74, completed: 89 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.4993111, lng: -69.7868177, heading: 71, completed: 93 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.50135, lng: -69.7791422, heading: 76, completed: 96 },
                { statusId: 2, id: 614790, trLnkId: 581, deviceId: 875156, lat: 18.5019877, lng: -69.7767644, heading: 75, completed: 100 }

            ]
        },

    ]
}
);

function crearTraslado() {
    outGoingData('showAddTransfer')
}


function showTrace(blits) {

    /*	mapaListo.value=false
        mapaListo.value=true*/


    if (transferBlits.value.transfer.startPlace && transferBlits.value.transfer.endPlace) {


        if (blits.length === 0) {
            console.log("Error Inesperado.... ");

            mensaje.value = "Error Inesperado.... No blits "
            mapaListo.value = false

        } else {
            mapaListo.value = true

            const medioIndex = Math.floor(blits.length / 2);

            try {
                mapaRef.value.setCenter(blits[medioIndex])
                //console.log((blits[blits.length - 1]))

                mapaRef.value.locations(transferBlits.value.transfer.startPlace, transferBlits.value.transfer.endPlace)
                /*  mapaRef.value.clearMap()*/

                mapaRef.value.update_motorIcon(ultimoElementoGeneral(blits))
                //      mapaRef.value.update_motorIcon((blits[blits.length - 1]) || blits[0])

                /*mapaRef.value.trace(blits)*/
                mapaRef.value.updateTrace(blits)


            } catch {
                console.log("error fatal")
            }

        }

    } else {
        mapaListo.value = false
        mensaje.value = "No Hay Ruta Disponible"
    }

}





function Busqueda(texto) {

    let text_buscar = texto || false

    if (!text_buscar) {
        text_buscar = incomingData.transfer_id
    }

    if (text_buscar != 0) {
        console.log("voy a buscar", text_buscar)

        blitsTranfers(route.params.hash, text_buscar).then(result => {


            if (result.success) {

                /*console.log(result.clientFullTransferBlits.fullTransferBlits)*/


                transferBlits.value = result.clientFullTransferBlits.fullTransferBlits

                valoresDefectoMapa.value.center = [transferBlits.value.transfer.startPlace.latitude, transferBlits.value.transfer.startPlace.longitude]

                mapaListo.value = true

            } else {
                console.log(result)
            }



        }).catch(error => {
            console.log(error)
            console.log("Error al Hacer La peticion")
        });
    } else {
        console.log("valor invalido")
    }
}

Busqueda();

const mapaRef = ref(null);

let valoresDefectoMapa = ref({
    center: [18.468025816718264, -69.93920818790205],
    zoom: 13,
    lat: 18.468025816718264,
    lng: -69.95920818790205
})

</script>

<style scoped>
.AreaTrabajoPage {

    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
}

.contenedorMapa_Menu {
    padding-top: 15px;
    padding-right: 15px;
    height: 100%;
    display: flex;
    height: 100%;
    overflow: auto;
}

.MenuMapa {
    width: 570px;
    height: 100%;
    /*padding-top: 15px;*/
    background-color: white;
    border-radius: 8px 0px 0px 8px;
    border: solid 1px;
    border-top: none;
    border-color: #80808030;

}

.mapa {
    height: 100%;
    width: 100%;
    border: solid 1px;
    border-color: #80808030;
    border-radius: 0px 8px 8px 0px;
}
</style>