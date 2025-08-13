<template>
  <div>
    <h1>Conexión en Tiempo Real con Atmosphere.js (Navixy)</h1>

    <button @click="sendSubsrcibeRequest">Conectar</button>

    <div class="container">

      <div class="json-container">
        <pre>{{ respuesta }}</pre>
      </div>


    </div>




  </div>
</template>

<script setup>
// Importa atmosphere.js
import atmosphere from 'atmosphere.js';
import { ref, onMounted, onBeforeUnmount } from 'vue';


let subscriber = null;
let respuesta = ref();

var request = {
  url: `https://${process.env.VUE_APP_SOCKET_SERVER}`,
  contentType: "application/json",
  logLevel: 'debug',
  transport: 'websocket',
  trackMessageLength: false,
  reconnectInterval: 2000, // Intervalo para reintentos de reconexión

  onOpen: function (r) {
    console.log('onOpen', r);
    sendSubsrcibeRequest(); // Enviar la solicitud de suscripción al reabrir
  },
  onReopen: function (r) {
    console.log('onReopen', r);
    sendSubsrcibeRequest();// Enviar la solicitud de suscripción al reabrir
  },
  onMessage: function (msg) {
    const parsedMessage = JSON.parse(msg.responseBody); // Parsear una sola vez

    console.log('onMessage', parsedMessage);
    respuesta.value = parsedMessage;
  },
  onClientTimeout: function (r) {
    console.log('onClientTimeout', r);
  },
  onTransportFailure: function (errorMsg, request) {
    console.log(request)
    console.log('onTransportFailure', errorMsg);
  },
  onClose: function (r) {
    console.log('onClose', r);
  },
  onError: function (r) {
    console.log('onError', r);
  },
  onReconnect: function (request, response) {
    console.log('onReconnect', response);
  }
};

subscriber = atmosphere.subscribe(request);


function sendSubsrcibeRequest() {
  console.log('sending subsrcibe action to websocket');

  const message = {
    action: 'subscribe',
    hash: process.env.VUE_APP_HASH,
    requests: [
      {
        type: 'state',
        trackers: [
          1010203,
          474751,
          1007834,
          888433,
          3076457
        ],
        rate_limit: "5s", // Puedes cambiar esto si es necesario
        format: "compact" // Cambia a "full" si es necesario
      }
    ]
  };

  subscriber.push(JSON.stringify(message));
}


// Detectar cuando la red se vuelve a conectar
function handleOnline() {
  console.log('La red está disponible. Intentando reconectar WebSocket...');
  console.log("conectando... ")

}

// Detectar cuando la red se desconecta
function handleOffline() {
  console.log('La red ha sido desconectada');

}

// Configuración de eventos del navegador
onMounted(() => {
  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);
});

// Limpiar la suscripción cuando el componente se destruya
onBeforeUnmount(() => {
  window.removeEventListener('online', handleOnline);
  window.removeEventListener('offline', handleOffline);

  if (subscriber) {
    subscriber.close();
  }
});

</script>

<style scoped>
/* Estilos específicos para este componente */
button {
  padding: 10px;
  margin: 10px 0;
  cursor: pointer;
}

div {
  margin-top: 20px;
}



.json-container {
  font-family: "Courier New", monospace;
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin: 10px 0;
  white-space: pre-wrap;
  word-wrap: break-word;
}

pre {
  color: #333;
  line-height: 1.6;
  overflow-x: auto;
}
</style>
