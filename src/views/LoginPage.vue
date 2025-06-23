<template>
  <div class="login-container">

    <div class="subTitle">Precintos</div>

    <form @submit.prevent="consultar" class="formLogin">

      <div class="mainTitle">Bienvenidos</div>

      <div style="position: relative;">
        <input v-model="datosUser.username" class="inputsearchBar" placeholder="Usuario" type="text" required>
        <i v-if="claveIncorrecta" class="bi bi-exclamation-circle incorrect"></i>
      </div>

      <br>

      <div style="position: relative;">
        <input @keyup="onPress" class="inputsearchBar" v-model="datosUser.passwd" placeholder="Contrasena"
          type="password" required>
        <i v-if="claveIncorrecta" class="bi bi-exclamation-circle incorrect"></i>
      </div>

      <button type="submit" class="btn btn-primary btAcceder" href="#" role="button"><b>ENTRAR</b>
      </button>

      <span v-if="claveIncorrecta" class="popup">
        usuario o contrasena incorrecto
      </span>



      <div class="copyright"> © 2024 Copyright: Todos los derechos reservados Aurora.com.do</div>
    </form>

    <img src='@/components/../assets/auroraLogo.png' alt="Responsive image" class="logoLogin">

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { auth } from '@/components/conexion/DataConector.js' //devices all decodeToken

import Cookies from 'js-cookie';



let datosUser = ref({ username: "", passwd: "" })
let claveIncorrecta = ref(false)
import { useRouter } from 'vue-router';

const router = useRouter();


/*if (window.$cookies.isKey('PLAY_SESSION')) {

  console.log("Wellcome Back")
  window.location.replace("./dashboard");

} else {
  window.location.replace("./dashboard");
  console.log("Logeate Por Favor")
}
*/
const onPress = (e) => {
  if (e.key == "Enter") {
    consultar()
    return;
  } else {

    return;
  }
};



//const todasLasCookies = Cookies.get();

//console.log(todasLasCookies)


if (Cookies.get('userPublicInfo')) {

  //console.log(Cookies.get('Internal_Sesion'))
  console.log("Sesión activa. Redirigiendo al Dashboard...");
  window.location.replace("./dashboard");

}else{
   console.log("logueate por favor")
}



function consultar() {

    auth(datosUser.value).then(resAuth => {
      if (resAuth.success) {
        console.log("Bienvenido");

        console.log(resAuth)

      router.push("/dashboard");

      } else {
        claveIncorrecta.value = true;
        console.log("Error de Respuesta");
        console.log(resAuth);
      }
    }).catch(error => {
      console.log(error);
      console.log("Error al Hacer La petición");
    })
    .finally(() => {

      console.log("consutla done")
      //console.log(Cookies.get());

    })


}


</script>


<style scoped>
.login-container {
  height: 100vh;
  position: relative;
  background-image:
    linear-gradient(to right, #272b37 20%, rgba(39, 43, 55, 0.9) 30%, transparent 100%),
    url('@/components/../assets/bg.png');
  background-size: cover;
  background-position: center;
  padding-left: 100px;
  border: 10px solid #545663;
  /* Aquí defines el color y el grosor del borde */
  /*border-radius: 20px;*/
}

.popup {
  color: red;
  padding: 10px;
}

.logoLogin {
  width: 300px;
  position: absolute;
  bottom: 40px;
  right: 20px;
  /*   border: solid 1px white;
   border-radius:10px;
   backdrop-filter: blur(10px) o puede ser todo=> filter: blur(1px);
   padding: 20px;*/
}


@media (width < 800px) {

  .formLogin {
    top: 13%;
    margin-left: 20px;
    width: 87vw !important;
  }

  .copyright {
    display: none;
  }

  .login-container {
    padding: 0px;
    border: none;
  }

  .inputsearchBar {
    width: 100%;
  }

  .mainTitle {
    text-align: center;
  }

  .subTitle {
    text-align: center;
  }

  .btAcceder {
    margin-left: 40px;
    padding: 10px;
    width: 80%;
  }


}


.mainTitle {
  color: white;
  /*  color: #80b91a;*/
  font-size: calc(2em + 1vw);
  font-weight: 600;
  padding-bottom: 20px;
}

.subTitle {
  color: white;
  padding-top: 40px;
  font-weight: 600;
  font-size: calc(1em + 1vw);
}

.copyright {
  padding-top: 18vh;
  font-size: 14px;
  color: white;
}

.incorrect {
  position: absolute;
  right: 5%;
  margin: 5px;
  font-size: larger;
  color: red;
}

.inputsearchBar {

  background-color: #545663 !important;
  color: white !important;
  border-radius: 5px;
  padding: 10px;
  width: 100%;
  outline: none !important;
  border: none;

}

input::placeholder {
  color: white;
}

input:-webkit-autofill {
  background-color: #545663 !important;
  color: white;
  transition: background-color 5000s ease-in-out 0s;
}

input:-webkit-autofill::first-line {
  color: white !important;
}



.formLogin {
  position: absolute;
  bottom: 4%;
  width: 25%;
}

.btAcceder {
  background-color: #43bbd6;
  color: white;
  border: none;
  margin-top: 15px;
  padding-right: 20px;
  padding-left: 20px;
}

body {
  margin: 0;
  /* esto es importante para quitar los margenes por defecto */
}
</style>
