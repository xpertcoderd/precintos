<template>
  <div class="popContainer">

    <div class="areaContent">


      <div class="targeta">

        <div class="videoContainer">

          <video autoplay muted loop id="myVideo" class="Background_Video">
            <source src="@/assets/video/candado2.mp4" type="video/mp4">
          </video>

        </div>


        <EnlaceForm1 class="targetaLogin" :containerSelected="incomingData.containerSelected" :deviceList="deviceList"
          @cerrar="close" />


      </div>

    </div>


  </div>

</template>

<script setup>

import { ref, defineProps, defineEmits } from 'vue';

import EnlaceForm1 from '@/components/Internal/Menu/Frames/Forms/steps/enlace_Steps/EnlaceForm1.vue'

const incomingData = defineProps(['containerSelected']);
const outGoingData = defineEmits(['cerrar'])

let deviceList = ref([
  {
    device: {
      id: 644657, sourceId: 417317, deviceid: "7591116296", model: "jointech_jt701",
      label: "7591116296-SEKU5765721", groupId: 129346, created: "20200:00:00"
    },
    group: {
      id: 129346, title: "ENLACES ACTIVOS", color: "009688"
    },
    deviceState: {
      deviceId: 644657, sourceId: 417317, gpsUpdated: "2024-11-13 13:42:17", gpsSignalLevel: 75,
      lat: 18.463476666666665, lng: -69.71110666666667, connectionStatus: "active", movementStatus: "parked",
      lastUpdate: "2024-11-13 13:42:18", gsmUpdated: "2024-11-13 13:42:17", gsmSignalLevel: 90, batteryLevel: 99,
      batteryUpdate: "2024-11-13 13:42:17", lockStatus: "ready_for_command", lockStatusUpdated: "2024-11-13 ",
      lockState: "sealed", lockStateUpdated: "2024-11-13 13:42:17", lockCommandResultlockCommandResultUpdated: "2024-11-13 10:07:46",
      hardwareKey: "0006471762", hardwareKeyUpdated: "2024-11-12 15:06:44", actualTrackUpdate: "2024-11-13 13:42:17"
    }

  }
])


function close() {
  outGoingData('cerrar')
}



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

.videoContainer {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 300px;
  background: black;
  border-radius: 10px 0px 0px 10px;
  box-shadow: -2px 0px 5px 2px rgba(52, 52, 52, 0.4);
}





.targetaLogin {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;

  min-width: 400px;
  max-width: 700px;
  position: relative;
  background-color: white;
  border-radius: 0px 10px 10px 0px;
  box-shadow: 2px 0px 5px 2px rgba(52, 52, 52, 0.4);
  /*  padding: 40px;*/
}
</style>
