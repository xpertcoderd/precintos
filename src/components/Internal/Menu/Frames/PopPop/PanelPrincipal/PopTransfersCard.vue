<template>
  <div class="popContainer">
    <div class="areaContent">
      <div class="targeta">

        <div v-show="step == 1" class="addClientIMG">
          <SecuenciaPage2 :count="[true, false, false, false, false]" />
        </div>


        <div v-show="step == 2" class="addUserIMG">
          <SecuenciaPage2 :count="[true, true, false, false, false]" />
        </div>

        <div v-show="step == 3" class="asignarClienteIMG">
          <SecuenciaPage2 :count="[true, true, true, false, false]" />
        </div>

        <div v-show="step == 4" class="addClientIMG">
          <SecuenciaPage2 :count="[true, true, true, true, false]" />
        </div>

        <div v-show="step == 5" class="addClientIMG">
          <SecuenciaPage2 :count="[true, true, true, true, true]" />
        </div>



        <div class="targetaLogin">
          <TitleParrafHeader3 :titulo="headerForm.titulo" :parrafo="headerForm.parrafo" />


          <div class="targetaOpen">

            <AddTrasladoForm1 :unitPrice="unitPrice" @searchMyTarifa="searchMyTarifa"
              :serverClientName="buscarClientByid(session.serverClientId)" @next="preSaveform1"
              :transferTypes="transferTypes" :final_Clients="final_Clients" :startplaces_List="startplaces_List"
              :endplaces_List="endplaces_List" v-if="step == 1" @cerrar="close" />


            <AddTrasladoForm2 v-if="step == 2" @cerrar="close" @next="preSaveform2" style="min-height: 440px;" />

            <AddTrasladoForm3 v-if="step == 3" @cerrar="close" @next="preSaveform3" :bls="bl_list"
              style="min-height: 400px;" />

            <AddTrasladoForm4 v-if="step == 4" :allData="allData" @cerrar="close" @next="confirmationForm4"
              style="min-height: 400px;" />

            <AddTrasladoForm5 v-if="step == 5" :ordenes="ordenes" :totales="totales" @cerrar="close"
              style="min-height: 400px;" />



          </div>

        </div>

      </div>

    </div>


  </div>

</template>

<script setup>

import { ref, defineEmits, defineExpose, onMounted } from 'vue'; //defineProps

import AddTrasladoForm1 from '@/components/Internal/Menu/Frames/Forms/steps/traslado_Steps/AddTrasladoForm1.vue'
import AddTrasladoForm2 from '@/components/Internal/Menu/Frames/Forms/steps/traslado_Steps/AddTrasladoForm2.vue'
import AddTrasladoForm3 from '@/components/Internal/Menu/Frames/Forms/steps/traslado_Steps/AddTrasladoForm3.vue'
import AddTrasladoForm4 from '@/components/Internal/Menu/Frames/Forms/steps/traslado_Steps/AddTrasladoForm4.vue'
import AddTrasladoForm5 from '@/components/Internal/Menu/Frames/Forms/steps/traslado_Steps/AddTrasladoForm5.vue'



import SecuenciaPage2 from '@/components/Internal/Menu/Frames/SecuenciaPage2.vue'
import TitleParrafHeader3 from '@/components/Internal/Menu/Frames/TitleParrafHeader3.vue'

//import { create_Client, create_User, placesListAll, clientsList } from '@/components/conexion/DataConector.js'

import { transfer_Types, assgin_Containers, tariffs_calculation, transfers_Create, decodeBase64Token, startPlace_Points, endPlace_Points, finalClientsList } from '@/components/conexion/DataConector.js' //placesList_All tariffs_List
import Swal from 'sweetalert2'


/*const incomingData = defineProps(['transferList']);*/

const outGoingData = defineEmits(
  ['cerrar', 'form', 'updateTransfersList']
)


import Cookies from 'js-cookie';

const headerForm = ref({

  titulo: "Creación de Traslado",
  parrafo: " Lorenpsn d Lorenpsn d Lorenpsn d Lorenpsn renpsn d Lorenpsn d Lorenpsn d Lorenpsn "

})


const secuence = ref(true)

const step = ref(1)

const updatingClient = ref(false)


/* -------DATOS PARMS ----------*/
const session = ref({
  id: 0,
  serverClientId: 0
});

const unitPrice = ref(0)

const dataSelected = ref({
  transferTypeId: 0,
  finalClient: 0,
  startPlace: 0,
  endPlace: 0,
  address: "",
  city: "",
  note: "",
})


let ordenes = ref([
  /*    {
        id:123,
        bl:'1234565FDSGH',
        startPlace:'Puerto Caucedo',
        endPlace:'Maritima Dominicana (MARDOM)',
        unitPrice:2199,
        containers_count:5,
        amount:11500
      }*/
])

let totales = ref({
  bl: 0,
  containers: 0,
  amount: 0
})

const bl_list = ref(null)

const allData = ref(
  {
    headerData: {
      serverClient: "serverClient",
      finalClient: "finalClient",
      startPlace: "startPlace",
      endPlace: "endPlace",
      typeName: "typeName",
      unitPrice: unitPrice.value

    },
    bl_ContainerList: [
      {
        bl: "bl",
        bl_count: 0,
        amount: 0
      }
    ],
    totalAmount: 0,
    check: false,
  })

const transferTypes = ref([
  {
    id: 1,
    name: "import 1",
    description: "Transfer belong from other country to free zone by a port"
  },
  {
    id: 2,
    name: "export 2",
    description: "Transfer go to the another country by a port"
  }
])

/*const tariffs = ref([
{
    id: 1,
    name: "name 1",
    transferTypeId: 1,
    tariffTypeId: 1, //distanceFreeKm variables attrib
    price: 1299
},
{
    id: 2,
    name: "name 2",
    transferTypeId: 1,
    tariffTypeId: 2, //distanceFreeKm variables attrib
    price: 2999
}
])
*/

const final_Clients = ref([
  {
    client: {
      id: 1,
      type: "final",
      name: "Defecto Cliente 1",
      rnc: "rnc",
      contact: "contact",
      email: "email",
      phone: "phone",
      address: "address",
      web: "web"
    },
    usersByClient: 3
  },
  {
    client: {
      id: 2,
      type: "final",
      name: "Defecto Cliente 2",
      rnc: "rnc",
      contact: "contact",
      email: "email",
      phone: "phone",
      address: "address",
      web: "web"
    },
    usersByClient: 3
  }
])

const startplaces_List = ref([
  {
    id: 2388931,
    clientId: 1,
    label: "Origen 1 Defecto",
    radius: 288,
    latitude: 18.39053905,
    longitude: -70.04629971,
    address: "Calle 2ª, Zona ",
    show: true,
    startWeight: 0,
    endWeight: 0
  },
  {
    id: 2388930,
    clientId: 1,
    label: "Origen 2 Defecto",
    radius: 240,
    latitude: 18.42153715,
    longitude: -70.11888742,
    address: "San Cristóbal, República Dominicana, 91000",
    show: true,
    startWeight: 0,
    endWeight: 0
  }
])

const endplaces_List = ref([
  {
    id: 2388933,
    clientId: 1,
    label: "destino 1 Defecto",
    radius: 288,
    latitude: 18.39053905,
    longitude: -70.04629971,
    address: "Calle 2ª, Zona ",
    show: true,
    startWeight: 0,
    endWeight: 0
  },
  {
    id: 2388934,
    clientId: 1,
    label: "destino 2 Defecto",
    radius: 240,
    latitude: 18.42153715,
    longitude: -70.11888742,
    address: "San Cristóbal, República Dominicana, 91000",
    show: true,
    startWeight: 0,
    endWeight: 0
  }
])


function restore() {

  headerForm.value.titulo = "Creación de Traslado"

  headerForm.value.parrafo = " Lorenpsn d Lorenpsn d Lorenpsn d Lorenpsn renpsn d Lorenpsn d Lorenpsn d Lorenpsn "

  step.value = 1
  updatingClient.value = false
  secuence.value = true

  allData.value.headerData.serverClient = 'N/A'
  allData.value.headerData.finalClient = 'N/A'
  allData.value.headerData.startPlace = 'N/A'
  allData.value.headerData.endPlace = 'N/A'

  allData.value.headerData.typeName = 'N/A'
  allData.value.totalAmount = 0

  ordenes.value = [];

  bl_list.value = null
}


function close() {

  restore();
  outGoingData('cerrar')
}


function preSaveform1(form1) {
  allData.value.headerData.unitPrice = unitPrice.value || null

  allData.value.headerData.serverClient = buscarClientByid(session.value.serverClientId) || 'N/A'
  allData.value.headerData.finalClient = form1.finalClient.data.name || 'N/A'
  allData.value.headerData.startPlace = form1.startPlace.data.label || 'N/A'
  allData.value.headerData.endPlace = form1.endPlace.data.label || 'N/A'

  allData.value.headerData.typeName = form1.type.name || 'N/A'
  dataSelected.value.transferTypeId = form1.type.id || null
  dataSelected.value.startPlace = form1.startPlace.data.id || null
  dataSelected.value.finalClient = form1.finalClient.data.id || null
  dataSelected.value.endPlace = form1.endPlace.data.id || null
  dataSelected.value.address = form1.address || null
  dataSelected.value.city = form1.city || null
  dataSelected.value.note = form1.note || null


  // next step
  step.value = 2
  headerForm.value.titulo = "Agregar Bill od Landing"
}




function preSaveform2(form2) {

  //console.log(form2)

  bl_list.value = form2

  // next step
  step.value = 3
  headerForm.value.titulo = "Asignar contenedores"
}


function preSaveform3(form3) {


  allData.value.bl_ContainerList = []

  const bl_containerTemp = []

  form3.forEach(elem => {


    bl_containerTemp.push(
      {
        bl: elem.text1,
        container: elem.text2
      }
    )

  })


  bl_list.value.forEach(elemt => {

    const contenedores = bl_containerTemp.filter(item => item.bl == elemt.text)
    const bl_counts = contenedores.length || 0

    allData.value.bl_ContainerList.push({
      bl: elemt.text,
      bl_count: bl_counts,
      amount: bl_counts * unitPrice.value,
      containers: contenedores
    })

  })




  allData.value.totalAmount = 0

  allData.value.bl_ContainerList.forEach(elmCounted => {
    allData.value.totalAmount = allData.value.totalAmount + elmCounted.amount
  })

  // next step
  step.value = 4
  headerForm.value.titulo = "Resumen de la Solicitud"

}


function confirmationForm4(form4) {

  //POST /api/v1/transfers/create

  console.log(form4)


  form4.bl_ContainerList.forEach(bl => {

    const params = {
      userId: session.value.id,
      serverClientId: session.value.serverClientId,
      finalClientId: dataSelected.value.finalClient,
      unitPrice: unitPrice.value,
      transferTypeId: dataSelected.value.transferTypeId,
      bl: bl.bl,
      startPlace: dataSelected.value.startPlace,
      endPlace: dataSelected.value.endPlace,
      address: dataSelected.value.address,
      city: dataSelected.value.city,
      note: dataSelected.value.note,
      timeTravelEst: '2025-01-17 16:00:00Z'
    }

    createTransfersBl(params).then(responseAdded => {


      if (responseAdded) {

        sms(`Bl ${responseAdded} Creardo`)

        const jsonParmsArray = bl.containers.map(row => (
          {
            transferId: responseAdded,
            container: row.container,
            currentState: 1
          }
        ))

        assginContainers(jsonParmsArray).then(responseAssinged => {

          if (responseAssinged) {

            sms(`Container creado para${bl.bl}`)
            ordenes.value.push({
              id: 123,
              bl: bl.bl,
              startPlace: allData.value.headerData.startPlace,
              endPlace: allData.value.headerData.endPlace,
              unitPrice: unitPrice.value,
              containers_count: bl.containers.length,
              amount: bl.containers.length * unitPrice.value
            })
          } else {
            sms(`No Container para ${bl.bl}`)

          }


          totales.value.bl = ordenes.value.length
          totales.value.containers = 0
          ordenes.value.forEach(elem => {
            const rowCount = elem.containers_count || 0
            totales.value.containers = totales.value.containers + rowCount
          })
          totales.value.amount = totales.value.containers * unitPrice.value


        })
          .catch(error => {
            console.log(error)
            sms(`No se pudo Crear el contenedor`)
          })



      } else {
        console.log("Error al crear BL")
        sms(`Error al crear BL`)
      }

    })
      .catch(error => {
        console.log(error)

      })
      .finally(() => {
        //sms(`Tralado creado`)

        outGoingData('updateTransfersList')

      })


  })

  headerForm.value.titulo = "Detalles de la Orden"
  headerForm.value.parrafo = "";

  step.value = 5

}
/*
function tariff_To_unitPrice(tariff_Id){

  const tariffaSelected=tariffs.value.find(tarifa=>tarifa.id == tariff_Id)

  unitPrice.value=tariffaSelected.price

  return tariffaSelected

}*/



async function createTransfersBl(parametros) {

  let salida = false
  await transfers_Create(parametros).then(blAdded => {

    //console.log(blAdded["transfer:"].id)

    if (blAdded.success) {

      salida = blAdded["transfer:"].id
      //console.log(blAdded["transfer:"].id)

    } else {

      alert(blAdded.message)
      console.log(blAdded.message)
    }

  }).catch(error => {
    console.log(error)

  });

  return salida

}

async function assginContainers(parametro) {

  let salida = false
  await assgin_Containers(parametro).then(assginedTrans => {


    if (assginedTrans.success) {

      console.log(assginedTrans)
      salida = true

    } else {
      console.log(assginedTrans)
    }

  }).catch(error => {
    console.log(error)

  });

  return salida

}

function searchMyTarifa(trTypeId, startPlaceID, endPlaceId) {

  if (trTypeId && startPlaceID && endPlaceId) {

    tariffs_calculation(trTypeId, startPlaceID, endPlaceId).then(responseTarifa => {

      unitPrice.value = responseTarifa.tariffSelected.tariff.price || 0
    })

      .catch(error => {
        console.log(error)

      })
      .finally(() => {
        console.log("Finalizo el request places")
      })

  } else {
    console.log("No pueden haber valores null")
  }



}


function startPlacesPoints(sc_Id) {
  startPlace_Points(sc_Id).then(listPlaces => {

    if (listPlaces.success) {

      startplaces_List.value = listPlaces.places
    }
  })
    .catch(error => {
      console.log(error)

    })
    .finally(() => {

      console.log("Finalizo el request places")
    })


}

function endPlacesPoints(sc_Id) {
  endPlace_Points(sc_Id).then(listPlaces => {

    if (listPlaces.success) {

      endplaces_List.value = listPlaces.places
    }
  })
    .catch(error => {
      console.log(error)

    })
    .finally(() => {

      console.log("Finalizo el request places")
    })


}



function consultarListaClientesfinal(sc_id) {


  finalClientsList(sc_id).then(clientList => {

    if (clientList.success) {
      final_Clients.value = clientList.clients
    }


  }).catch(error => {
    console.log(error)
    console.log("Error al Hacer La peticion")
  })
    .finally(() => {
      console.log("consutla done")


    })

}


function consultarTransferTypes_Tariffs() {

  transfer_Types().then(typeList => {

    if (typeList.success) {
      transferTypes.value = typeList.transferTypes
    }
  }).catch(error => {
    console.log(error)
    console.log("Error al Hacer La peticion")

  }).finally(() => {

    console.log("consutla done")
    /*
            tariffs_List().then(tariffsList => {

                if (tariffsList.success) {
                    tariffs.value = tariffsList.tariffs
                }
            }).catch(error => {
                console.log(error)
                console.log("Error al Hacer La peticion")

            }).finally(() => {

             // tariff_To_unitPrice(2)
              console.log("consutla done")
            })*/
  })
}


function buscarClientByid(client_id) {

  let salida = client_id

  const serverClientName = final_Clients.value.find(elemt => elemt.client.id == client_id)



  if (serverClientName) {

    salida = serverClientName.client.name || "N/A"

  } else {
    console.log("No hay ningun object")
  }

  return salida

}

onMounted(() => {


  //const token=`eyJpZCI6MSwiY2xpZW50SWQiOjEsInJvbElkIjoxLCJmaXJzdE5hbWUiOiJBdXJvcmEiLCJsYXN0TmFtZSI6IlRlY2hub2xvZ2llcyIsImlkY2FyZCI6IjAwMTExMjIzNDU2Iiwicm9sZSI6eyJpZCI6MSwibmFtZSI6InJvb3QiLCJzY29wZSI6IioiLCJwZXJtaXNzaW9ucyI6IioifX0=`

  const token = Cookies.get('userPublicInfo');

  if (token) {
    let user_session = decodeBase64Token(token);
    console.log('user_session:',user_session)
    session.value.serverClientId = user_session.clientId || 0
    session.value.id = user_session.id || 0

    /*{
        "id": 1,
        "clientId": 1,
        "rolId": 1,
        "firstName": "Aurora",
        "lastName": "Technologies",
        "idcard": "00111223456",
        "role": {
            "id": 1,
            "name": "root",
            "scope": "*",
            "permissions": "*"
        }
    }*/

  } else {

    console.error("User info not found in cookies");
    console.log("redirigiendo al Login... ")
    // window.location.replace("./");
  }


  consultarTransferTypes_Tariffs()


  startPlacesPoints(session.value.serverClientId)
  endPlacesPoints(session.value.serverClientId)
  consultarListaClientesfinal(session.value.serverClientId)


})



/*Upadate Client*/



async function sms(texto) {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  await Toast.fire({
    icon: "success",
    title: texto
  });
}




defineExpose({})

</script>

<style scoped>
.popContainer {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 20;
}

.areaContent {
  backdrop-filter: blur(3px);
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  min-width: 100%;
}


.targeta {
  display: flex;
  background-color: transparent;
  border-radius: 10px;
  box-shadow: -2px 0px 5px 2px rgba(52, 52, 52, 0.4);
}

/*.videoContainer {
  height: 100%;
  background-color: blue !important;
  border-radius: 10px 0px 0px 10px;
  background: blue;
}
*/

.asignarClienteIMG {
  background-color: white;
  min-width: 400px;
  background-image: url('@/assets/fondos/asignarCliente.png');
  border-radius: 10px 0px 0px 10px;
  background-size: cover;
  background-position: right;
  background-repeat: no-repeat;
  /*  background-size: 120%; */
  overflow: hidden;
}

.addUserIMG {
  background-color: white;
  min-width: 400px;
  background-image: url('@/assets/fondos/addUser.png');
  border-radius: 10px 0px 0px 10px;
  background-size: cover;
  background-position: right;
  background-repeat: no-repeat;
  /*  background-size: 120%; */
  overflow: hidden;
}

.addClientIMG {
  background-color: white;
  min-width: 400px;
  background-image: url('@/assets/fondos/addClient.png');
  border-radius: 10px 0px 0px 10px;
  background-size: cover;
  background-position: right;
  background-repeat: no-repeat;
  /*  background-size: 120%; */
  overflow: hidden;
}





.fondoIMG {

  /* max-height: 470px;*/
  height: 100%;
  max-width: 400px;



  object-fit: cover;
  /* Ajusta la imagen para cubrir el contenedor */
  object-position: center;
  /* Centra la imagen dentro del contenedor */
}


.parrafo {
  user-select: none;
  font-size: 14px;
  /*padding: 2%;*/
  color: grey;

  max-width: 80%;

  word-wrap: break-word;
  /* Opcional: permite cortar palabras largas si no caben */
  text-align: justify;
  line-height: 1;
  overflow-wrap: break-word;
  margin: 0;
}

.targetaOpen {
  border-radius: 0px 0px 10px 0px;
  height: 100%;
  padding-left: 25px;
  background: #f5f6f7;

}

img {
  /*  width: 100%;*/
  border-radius: 10px 0px 0px 10px;
  background-color: blue
}






.targetaLogin {
  display: flex;
  flex-direction: column;
  /*  justify-content: space-between;
  min-width: 60%;*/
  width: 100%;
  max-width: 600px;
  position: relative;
  background-color: white;
  border-radius: 0px 10px 10px 0px;
  box-shadow: 2px 0px 5px 2px rgba(52, 52, 52, 0.4);
  /*  padding: 40px;*/
}
</style>
