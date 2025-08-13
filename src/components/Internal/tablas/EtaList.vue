<template>
  <div class="contendorETA">


    <div style="padding: 7px;" v-for=" (dato, index) in TransfersList" :key="index">

      <div class="targeticas ">


        <div class="text-center titulo">{{ `Contenedor ${dato.ss.name} | Precinto` }}
          <span>{{ serial_(dato.ss.trackerId)[0] }}</span><span style="color:  #56bcda; font-weight: 700;">{{
            serial_(dato.ss.trackerId)[1] }}</span>
        </div>

        <div class="contentResponsive">

          <div style="width: auto;">

            <div class="secondContainer">


              <div class="bola">
                <div class="bolaText">

                  <div class="valueFlotante">
                    {{ timeConverter(dato.ss.timeRemain) || "00" }}
                  </div>

                  <div class="bolita">Min</div>

                </div>



              </div>

              <div class="word-wrap">
                <div class="timeLabel">Salida:</div>
                <div class="timeValue">{{ stringDate_time(dato.ss.schDepTime)[2] || "00:00:AM" }}</div>
              </div>

              <div class="word-wrap">
                <div class="timeLabel">LLegada:</div>
                <div class="timeValue">{{ stringDate_time(dato.ss.schArrTime)[2] || "00:00:AM" }}</div>
              </div>

              <i class="bi bi-three-dots btnSettingETA"></i>


            </div>



          </div>


          <div class="firstContainer">

            <div class="origenLabel">{{ dato.startPlace.name || "N/A" }}</div>


            <ProgressBar3er :bgcolor="getStatusETA(dato.ss.statusId).color" :completed="dato.ss.completed || 2" />

            <div class="destinoLabel">{{ dato.endPlace.name || "N/A" }}</div>



          </div>

        </div>

      </div>

    </div>


  </div>
</template>
<script setup>

//import BarraPorcentaje from '@/components/BarraPorcentaje.vue'

import { serial_, timeConverter, stringDate_time, getStatusETA } from '@/components/utils.js'


import ProgressBar3er from '@/components/ProgressBar3er.vue'
import { ref } from 'vue'



let TransfersList = ref([
  {
    ss: {
      id: null,
      name: "AC54365DF453",
      shuttleTemplateId: null,
      clientId: null,
      userId: null,
      trackerId: "SDVAN123456",//pero El Label No el id
      schDepTime: "2000-07-01T10:00:00.000-0400",
      schArrTime: "2000-07-01T10:30:00.000-0400",
      startPlaceId: null,
      endPlaceId: null,
      statusId: 2,
      created: "2000-07-01T11:58:06.516-0400",
      distance: null,
      distanceRemain: null,
      travelTime: null,
      timeRemain: 49,
      completed: 60
    },
    startPlace: {
      id: null,
      clientId: null,
      name: "Puerto Causedo",
      lat: 18.4872049,
      lng: -69.95793343,
      radius: null
    },
    endPlace: {
      id: null,
      clientId: null,
      name: "Maritima Dominicana",
      lat: 18.46658296,
      lng: -69.95625968,
      radius: null
    }
  },
  {
    ss: {
      id: null,
      name: "AC54365DF453",
      shuttleTemplateId: null,
      clientId: null,
      userId: null,
      trackerId: "SDVAN123456",//pero El Label No el id
      schDepTime: "2000-07-01T10:00:00.000-0400",
      schArrTime: "2000-07-01T10:30:00.000-0400",
      startPlaceId: null,
      endPlaceId: null,
      statusId: 1,
      created: "2000-07-01T11:58:06.516-0400",
      distance: null,
      distanceRemain: null,
      travelTime: null,
      timeRemain: 49,
      completed: 30
    },
    startPlace: {
      id: null,
      clientId: null,
      name: "Puerto Causedo",
      lat: 18.4872049,
      lng: -69.95793343,
      radius: null
    },
    endPlace: {
      id: null,
      clientId: null,
      name: "Maritima Dominicana",
      lat: 18.46658296,
      lng: -69.95625968,
      radius: null
    }
  },
  {
    ss: {
      id: null,
      name: "AC54365DF453",
      shuttleTemplateId: null,
      clientId: null,
      userId: null,
      trackerId: "SDVAN123456",//pero El Label No el id
      schDepTime: "2000-07-01T10:00:00.000-0400",
      schArrTime: "2000-07-01T10:30:00.000-0400",
      startPlaceId: null,
      endPlaceId: null,
      statusId: 3,
      created: "2000-07-01T11:58:06.516-0400",
      distance: null,
      distanceRemain: null,
      travelTime: null,
      timeRemain: 49,
      completed: 80
    },
    startPlace: {
      id: null,
      clientId: null,
      name: "Puerto Causedo",
      lat: 18.4872049,
      lng: -69.95793343,
      radius: null
    },
    endPlace: {
      id: null,
      clientId: null,
      name: "Maritima Dominicana",
      lat: 18.46658296,
      lng: -69.95625968,
      radius: null
    }
  },
  {
    ss: {
      id: null,
      name: "AC54365DF453",
      shuttleTemplateId: null,
      clientId: null,
      userId: null,
      trackerId: "SDVAN123456",//pero El Label No el id
      schDepTime: "2000-07-01T10:00:00.000-0400",
      schArrTime: "2000-07-01T10:30:00.000-0400",
      startPlaceId: null,
      endPlaceId: null,
      statusId: 1,
      created: "2000-07-01T11:58:06.516-0400",
      distance: null,
      distanceRemain: null,
      travelTime: null,
      timeRemain: 49,
      completed: 30
    },
    startPlace: {
      id: null,
      clientId: null,
      name: "Puerto Causedo",
      lat: 18.4872049,
      lng: -69.95793343,
      radius: null
    },
    endPlace: {
      id: null,
      clientId: null,
      name: "Maritima Dominicana",
      lat: 18.46658296,
      lng: -69.95625968,
      radius: null
    }
  },
])



/*  Los siguientes campos son opcionales:
   unitPrice, 
   address, 
   city, 
   note, 
   timeTravelEst,
   timeRequest

 El unitPrice no habra que enviarlo en el futuro, ya que lo determina el sistema por el momento.
*/

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Smooch+Sans:wght@100..900&display=swap');


.contendorETA {
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: white;
  padding: 10px;

  /*	border: solid 1px;
	border-color: #80808030;
*/
}

.targeticas {
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 8px;

  /*border: solid 1px;*/

  /*border-color: #80808030;*/
  background-color: #f6f7f9;
  box-shadow: 0px 0px 5px 1px rgba(233, 236, 239, 1);
  cursor: pointer;
  /*	min-height: 65px;*/

}


.targeticas:hover {
  /* box-shadow: none;*/
  box-shadow: 0px 0px 10px 5px rgba(102, 185, 217, 0.7)
}



.titulo {
  font-weight: 700;
  color: grey;
  padding-top: 4px;
  margin-bottom: -14px;
  font-size: 13px;
}


.contentResponsive {
  display: flex;
  width: 100%;
  flex-direction: row-reverse;
}


.firstContainer {
  width: 100%;
}

.origenLabel {
  font-size: 13px;
}


.destinoLabel {
  font-size: 13px;
  display: flex;
  width: 100%;
  justify-content: right;
}

.secondContainer {
  display: flex;
  align-items: center;
  margin-top: -10px
}




.word-wrap {
  max-width: 95px;
  padding-left: 15px;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.bola {
  background: white;

  position: relative;
  width: 48px;

  margin: 15px;
  margin-right: 0px;

  border-radius: 50px;

  display: flex;
  justify-content: center;
  align-items: center;
}

.bolaText {
  position: relative;
  color: black;
  margin: 12px;
  width: 30px;
  height: 25px;
  font-weight: 600;
}

.valueFlotante {
  position: absolute;
  top: -10px;
  right: -2px;
  font-weight: 600;
  font-size: 32px;
  font-family: "Smooch Sans", serif;

}

.bolita {
  position: absolute;
  right: -15px;
  bottom: -15px;
  background-color: #56bcda;
  border-radius: 30px;
  color: white;
  font-size: 9px;
  padding: 3px;


}

.timeLabel {
  font-weight: 600;
  font-size: 15px;
}

.timeValue {
  font-weight: 600;
  font-size: 13px;
}



.btnSettingETA {
  float: right;
  padding-left: 15px;
  font-size: 18px;
}



/*  scrollbar stiyles width */

::-webkit-scrollbar {
  width: 10px;
}

/* scrollbar stiyles Handle */
::-webkit-scrollbar-thumb {
  background-color: #66b9d9;
  border-radius: 10px;
}
</style>