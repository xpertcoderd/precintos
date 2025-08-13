<template>
  <div>
    <h1>Conexión en Tiempo Real con Atmosphere.js (Local)</h1>

    <button @click="sendMessage">Enviar mensaje al servidor</button>

    <div>
      <h3>Respuesta del servidor:</h3>
      <p>{{ respuesta }}</p>
    </div>

  </div>
</template>

<script>
// Importa atmosphere.js
import atmosphere from 'atmosphere.js';
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
  setup() {
    // Creamos una referencia para almacenar la respuesta del servidor
    const respuesta = ref(null);

    // Variable para almacenar la suscripción de Atmosphere.js
    let subscriber = null;

    // Función para conectar el WebSocket usando Atmosphere.js
    const connect = () => {
      const request = {
        url: 'ws://localhost:3000', // URL de tu servidor WebSocket
        contentType: 'application/json',
        transport: 'websocket',
        trackMessageLength: true,

        onOpen: (response) => {
          console.log(response)
          console.log('Conexión abierta con éxito');
        },
        onMessage: (response) => {
          // Actualizamos la respuesta cuando llega un mensaje del servidor
          console.log('Mensaje recibido del servidor:', response.responseBody);
          respuesta.value = response.responseBody;
        },
        onError: (error) => {
          console.error('Error en la conexión:', error);
        },
        onClose: () => {
          console.log('Conexión cerrada');
        },
      };

      // Creamos una suscripción a la URL del WebSocket
      subscriber = atmosphere.subscribe(request);
    };

    // Función para enviar un mensaje al servidor
    const sendMessage = () => {
      if (subscriber) {
        console.log('Enviando mensaje al servidor...');
        subscriber.push('Hola desde Client Vue');
      }
    };

    // Conectar cuando el componente se monte
    onMounted(() => {
      connect();
    });

    // Desconectar cuando el componente se destruya
    onBeforeUnmount(() => {
      if (subscriber) {
        subscriber.unsubscribe();
      }
    });

    // Devolver las propiedades y métodos para usarlos en el template
    return {
      respuesta,
      sendMessage,
    };
  },
};
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
</style>
