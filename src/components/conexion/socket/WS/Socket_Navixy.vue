<template>
  <div>
    <h1>Conexión en Tiempo Real con WS (Navixy)</h1>

    <button @click="consultar">Conectar</button>

    <div class="container">

      <div class="json-container">
        <pre>{{ respuesta }}</pre>
      </div>


    </div>

  </div>
</template>

<script setup>


import { ref } from 'vue';

let respuesta = ref();



const socket = new WebSocket(`ws://${process.env.VUE_APP_SOCKET_SERVER}`); // Cambiar a wss:// para conexiones seguras

socket.onopen = () => {
  console.log('Conectado al servidor WebSocket');
  consultar();
};

socket.onmessage = (event) => {
  if (esJSONValido(event.data)) {

    const parsedData = JSON.parse(event.data);
    respuesta.value = parsedData;
    console.log(parsedData);

  } else {
    console.log("El JSON está vacío o es inválido")
  }


};


socket.onclose = () => {
  console.log('Desconectado del servidor WebSocket');

  /*    // Intentar reconectar o manejar la desconexión
    setTimeout(() => {
      console.log('Intentando reconectar...');
      conectarWebSocket(); // Reconectar si lo deseas
    }, 1000)
  
    */
};

socket.onerror = (error) => {
  console.error('Error WebSocket:', error);
};

function consultar() {
  socket.send(JSON.stringify({
    action: 'subscribe',
    hash: process.env.VUE_APP_HASH,
    requests: [
      {
        /*  type: 'state_batch',
          target: {
              type: 'all'
          },*/
        type: "state",
        trackers: [
          1010203,
          474751,
          1007834,
          888433,
          3076457
        ],
        rate_limit: "5s",
        format: "compact" /* full*/
      }
    ]
  }));
}




function esJSONValido(str) {
  try {
    JSON.parse(str);
    return true; // Si no ocurre error, es un JSON válido
  } catch (e) {
    return false; // Si ocurre un error, no es un JSON válido
  }
}



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
