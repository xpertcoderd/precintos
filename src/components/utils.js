import { saveAs } from 'file-saver';
import Papa from 'papaparse';

export function generateAndDownloadCSV(data) {


      // Convertir los datos JSON a formato CSV usando PapaParse
      const csv = Papa.unparse(data);

      // Crear un Blob con el contenido CSV
      const blob = new Blob([csv], { type: 'text/csv' });

      // Descargar el archivo CSV usando FileSaver.js
      saveAs(blob, 'tabla.csv');

}

export function getStatus(estatusN) {

  switch (estatusN) {

    case 1:
      return { label: 'Enlanzado', color: '#def0fc', colorText: '#43a6de' }// (gris)          

    case 2:
      return { label: 'En Transito', color: '#d5c8e2', colorText: '#161a83' }

    case 3:
      return { label: 'Completado', color: '#f1f7f2', colorText: '#2a9643' }

    case 4:
      return { label: 'no va', color: '#f1f7f2', colorText: '#2a9643' }

    case 5:
      return { label: 'Expirado', color: '#f7f2e5', colorText: '#eda041' } // (amarillo)

    case 6:
      return { label: 'Ubicacion Erronea', color: '#ebcdcc', colorText: '#dd3a35' }

    default:
      return { label: 'Expired', color: '#f1f7f2', colorText: '#2a9643' }

  }
}

export function getStatusETA(estatusN) {

  switch (estatusN) {

    case 1:
      return { label: 'Enlanzado', color: '#28852f', colorText: '#43a6de' }// (gris)          

    case 2:
      return { label: 'En Transito', color: '#002b74', colorText: '#161a83' }

    case 3:
      return { label: 'Completado', color: '#d70010', colorText: '#2a9643' }

    case 4:
      return { label: 'no va', color: '#28852f', colorText: '#2a9643' }

    case 5:
      return { label: 'Expirado', color: '#002b74', colorText: '#eda041' } // (amarillo)

    case 6:
      return { label: 'Ubicacion Erronea', color: '#d70010', colorText: '#dd3a35' }

    default:
      return { label: 'Expired', color: '#28852f', colorText: '#2a9643' }

  }
}

export function getStatusSolicitudes(estatusN) {

  switch (estatusN) {

    case 1:
      return { label: 'Pendiente de aprobacion', bg: '#c6bbde', colorText: '#12387e' }// (gris)          

    case 2:
      return { label: "Facturado", bg: '#79d491', colorText: '#1d8a49' }

    default:
      return { label: 'Expired', bg: '#c6bbde', colorText: '#12387e' }

  }
}

export function getStatusGPS(estatusN) {

  switch (estatusN) {

    case 'active':
      return { label: 'En Linea', color: '#def0fc', colorText: '#b1cc07' }// (gris)          

    case 'offline':
      return { label: 'Fuera de linea', color: '#d5c8e2', colorText: '#e20715' }

    case "idle":
      return { label: 'Idle', color: '#f7f2e5', colorText: '#7f9ffc' } // (amarillo)

    default:
      return { label: 'N/A', color: '#f1f7f2', colorText: '#2a9643' }

  }
}


export function  isActive(value){

  switch (value) {

    case false:
    return "Vencida"


    case true:
    return "Activo"

  default:
     return "N/A"
}

}


export function  isAvaible(value){

  switch (value) {

    case false:
    return "No Disponible"


    case true:
    return "Disponible"

  default:
     return "N/A"
}

}




export function traducir_estatus(estatusN) {

  switch (estatusN.toUpperCase()) {

    case 'LINKED':
      return 'Enlazado '

    case 'IN_TRANSIT':
      return 'Transito'

    case 'DONE':
      return 'Completado'

    case 'CANCELED':
      return 'Cancelado'

    case 'EXPIRED':
      return 'Expirado'

    case 'START_END_ERROR':
      return 'UBI-ERR'

    default:
      return estatusN

  }
}

export function ultimoElemento(listado) {

  let salida = {
    id: 0,
    trLnkId: 0,
    transferId: 0,
    deviceId: 0,
    blitTime: "2024-10-07 15:25:18",
    lat: 18.4492466,
    lng: -69.65743,
    heading: 0,
    speed: 0,
    distance: 0,
    distanceRemain: 0,
    travelTime: 0,
    timeRemain: 0,
    statusId: 6,
    completed: 0
  }

  if (listado.length === 0) {
    console.log("El array está vacío");

  } else {
    /* console.log("El array no está vacío");*/

    salida = (listado[listado.length - 1]) || salida

  }

  return salida
}



export function ultimoElementoGeneral(listado) {

  let salida;


  if (listado.length === 0) {
    console.log("El array está vacío");

  } else {
    /* console.log("El array no está vacío");*/
    salida = (listado[listado.length - 1]) || salida
  }


  return salida
}


export function convertirStatus(estados) {


  let result = estados.reduce((acumulador, element) => {

    try {
      if (element.name.toUpperCase() == "LINKED") {
        acumulador.linked = element.count;

      } else if (element.name.toUpperCase() == "IN_TRANSIT") {
        acumulador.in_transit = element.count;

      } else if (element.name.toUpperCase() == "DONE") {
        acumulador.done = element.count;
      }
      else if (element.name.toUpperCase() == "CANCELED") {
        acumulador.canceled = element.count;
      }
      else if (element.name.toUpperCase() == "EXPIRED") {
        acumulador.expired = element.count;
      }
      else if (element.name.toUpperCase() == "START_END_ERROR") {
        acumulador.start_end_error = element.count;
      }
      return acumulador;

    } catch (error) {
      console.log("Ocurrio un erorr al Convertir estatus ", error)
      return acumulador;
    }

  }, {
    linked: 0,
    in_transit: 0,
    done: 0,
    canceled: 0,
    expired: 0,
    start_end_error: 0
  });

  return result

}

export function convertirCounters(estados) {


  let result = estados.reduce((acumulador, element) => {

    try {
      if (element.groupName.toUpperCase() == "ENLACES ACTIVOS") {
        acumulador.asignados = element.qty;

      }
      acumulador.stock = acumulador.stock + element.qty
      return acumulador;

    } catch (error) {
      console.log("Ocurrio un erorr al Convertir estatus ", error)
      return acumulador;
    }

  }, {
    asignados: 0,
    stock: 0
  });

  return result

}



export function ten(i) {

  return (i < 10 ? '0' : '') + i;

}

export function serial_(serial_id) {

  const serialId=serial_id.toString() || "00000000"

  const medio=serialId.length-5

  const azul=serialId.substr(medio,serialId.length)
  const negro=serialId.substr(0,medio)

  return [negro, azul]

}



export function getTimeAndDate(isoDate) {


  let dateOut = new Date(isoDate)

  const YYYY = dateOut.getFullYear()

  const MM = ten(dateOut.getMonth() + 1)
  const DD = ten(dateOut.getDate())

  const HH = ten(dateOut.getHours())

  const II = ten(dateOut.getMinutes())
  const SS = ten(dateOut.getSeconds())

  dateOut = YYYY + '-' + MM + '-' + DD + 'T' + HH + ':' + II + ':' + SS;

  return dateOut //"2017-06-01T08:30"

}


export function stringDate_time(isoDate) {


  const all = new Date(isoDate).toLocaleString() 

  const date= new Date(isoDate).toLocaleDateString()

  const time= new Date(isoDate).toLocaleTimeString()

  return [all, date, time] 

}


export function timeLlegadaConverter(segundos) {

  let timeLlegadaConvertered = 0

  try {
    segundos = segundos || 0

    let manana = new Date(new Date().getTime() + segundos * 1000)
    timeLlegadaConvertered = manana.toLocaleTimeString('en-US')

    return timeLlegadaConvertered

  } catch (err) {
    console.log(err)
    return timeLlegadaConvertered
  }

}

export function timeLlegadaConverterSimulation(fecha, segundos) {

  let timeLlegadaConvertered = 0

  try {
    segundos = segundos || 0

    let manana = new Date(new Date(fecha).getTime() + segundos * 1000)
    timeLlegadaConvertered = manana.toLocaleTimeString('en-US')

    return timeLlegadaConvertered

  } catch (err) {
    console.log(err)
    return timeLlegadaConvertered
  }

}

export function distanceConverter(distanceRemain) {


  let distanceConvertered = 0

  try {

    distanceRemain = distanceRemain || 0

    distanceConvertered = Math.round(distanceRemain).toLocaleString('es-419')

    return distanceConvertered

  } catch (err) {
    console.log(err)
    return distanceConvertered
  }

}

export function timeConverter(timeRemain) {

  let timeConvertered = 0


  try {

    timeRemain = timeRemain || 0

    timeConvertered = ten(Math.round(timeRemain / 60))

    return timeConvertered

  } catch (err) {
    console.log(err)
    return timeConvertered
  }

}

export function sumarCounters(arreglo) {


  let sumado = 0


  try {

    arreglo = arreglo || 0

    arreglo.forEach(elemento => {

      if (Number.isInteger(elemento)) {

        sumado = sumado + elemento

      }

    })

    return sumado

  } catch (err) {
    console.log(err)
    return sumado
  }
}

export function lastBlittTimeConverter(latBlitTime) {


  let lastBlittTimeConverted = 0

  try {

    latBlitTime = latBlitTime || false

    if (latBlitTime) {


      lastBlittTimeConverted = new Date(latBlitTime).toLocaleString()
    } else {
      lastBlittTimeConverted = " "
    }


    return lastBlittTimeConverted

  } catch (err) {
    console.log(err)
    return lastBlittTimeConverted
  }

}

export function dateSubmited(schDate) {


  let submitedOut = null

  try {

    schDate = schDate || false

    if (schDate) {

      submitedOut = new Date(schDate).toLocaleString()
    } else {
      submitedOut = "dd/mm/yyyy, hh:mm:ss"
    }


    return submitedOut

  } catch (err) {
    console.log(err)
    return submitedOut
  }

}

export function lastBlittTimeConverterCell(latBlitTime) {


  let lastBlittTimeConverted = 0

  try {

    latBlitTime = latBlitTime || false

    if (latBlitTime) {


      lastBlittTimeConverted = new Date(latBlitTime).toLocaleString()
    } else {
      lastBlittTimeConverted = "dd/mm/yyyy, hh:mm:ss"
    }

    return lastBlittTimeConverted

  } catch (err) {
    console.log(err)
    return lastBlittTimeConverted
  }

}


export const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0]; 
};

export const getCurrentDateTime = () => {

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Asegura '01'-'12'
  const day = String(now.getDate()).padStart(2, '0'); // Asegura '01'-'31'
  const hours = String(now.getHours()).padStart(2, '0'); // Asegura '00'-'23'
  const minutes = String(now.getMinutes()).padStart(2, '0'); // Asegura '00'-'59'

  return `${year}-${month}-${day}T${hours}:${minutes}`; // Formato correcto

};




/*export const truck_svg=[
  {path:'M427.395 170.667C433.539 170.667 439.554 172.436 444.719 175.762C449.885 179.088 453.984 183.832 456.527 189.425L497.509 279.586C500.029 285.131 501.333 291.151 501.333 297.242V341.333C501.333 344.135 500.781 346.909 499.709 349.497C498.637 352.085 497.066 354.437 495.085 356.418C493.104 358.399 490.752 359.971 488.164 361.043C485.576 362.115 482.802 362.667 480 362.667H53.333C50.5314 362.667 47.7573 362.115 45.169 361.043C42.5807 359.971 40.2289 358.399 38.2479 356.418C36.267 354.437 34.6956 352.085 33.6236 349.497C32.5516 346.909 31.9999 344.135 32 341.333V170.667H427.395Z', fill:'#00CF66'},
  {path:'M467.394 213.333H405.333C402.504 213.333 399.791 214.457 397.791 216.458C395.791 218.458 394.667 221.171 394.667 224V266.667C394.667 269.496 395.791 272.209 397.791 274.21C399.792 276.21 402.505 277.334 405.334 277.334H496.486L467.394 213.333Z', fill:'#EAEFF0'},
  {path:'M32 256V128C32 122.342 34.2476 116.916 38.2483 112.915C42.249 108.915 47.6751 106.667 53.333 106.667H320C325.658 106.667 331.084 108.915 335.085 112.915C339.085 116.916 341.333 122.342 341.333 128V298.667C341.333 301.468 340.781 304.243 339.709 306.831C338.637 309.419 337.066 311.771 335.085 313.752C333.104 315.733 330.752 317.304 328.164 318.376C325.576 319.448 322.801 320 320 320H32V256Z', fill:'#D9E1E2'},
  {path:'M117.333 405.334C140.897 405.334 160 386.231 160 362.667C160 339.103 140.897 320 117.333 320C93.7687 320 74.666 339.103 74.666 362.667C74.666 386.231 93.7687 405.334 117.333 405.334Z', fill:'#EAEFF0'},
  {path: 'M394.667 405.334C418.231 405.334 437.334 386.231 437.334 362.667C437.334 339.103 418.231 320 394.667 320C371.103 320 352 339.103 352 362.667C352 386.231 371.103 405.334 394.667 405.334Z', fill:'#D9E1E2'},
  {path: 'M10.6672 298.667H64.0002C66.8113 298.64 69.4979 297.504 71.4761 295.507C73.4542 293.509 74.564 290.812 74.564 288C74.564 285.189 73.4542 282.492 71.4761 280.494C69.4979 278.497 66.8113 277.361 64.0002 277.334H10.6672C7.85619 277.361 5.16953 278.497 3.19138 280.494C1.21323 282.492 0.103516 285.189 0.103516 288C0.103516 290.812 1.21323 293.509 3.19138 295.507C5.16953 297.504 7.85619 298.64 10.6672 298.667V298.667Z', fill:'black'},
  {path:'M507.219 275.177L466.234 185.01C462.836 177.56 457.37 171.242 450.485 166.809C443.601 162.375 435.588 160.012 427.4 160H352V128C351.99 119.516 348.616 111.382 342.617 105.383C336.618 99.3837 328.484 96.0093 320 96H53.3328C44.8487 96.0093 36.7147 99.3837 30.7156 105.383C24.7164 111.382 21.342 119.516 21.3328 128V256C21.3191 257.409 21.5849 258.808 22.1149 260.114C22.6448 261.42 23.4283 262.608 24.4201 263.609C25.412 264.611 26.5924 265.406 27.8933 265.948C29.1942 266.491 30.5898 266.77 31.9993 266.77C33.4088 266.77 34.8043 266.491 36.1052 265.948C37.4061 265.406 38.5866 264.611 39.5784 263.609C40.5702 262.608 41.3538 261.42 41.8837 260.114C42.4136 258.808 42.6794 257.409 42.6658 256V128C42.6689 125.172 43.7938 122.461 45.7936 120.461C47.7933 118.461 50.5047 117.336 53.3328 117.333H320C322.828 117.336 325.539 118.461 327.539 120.461C329.539 122.461 330.664 125.172 330.667 128V298.667C330.663 301.495 329.538 304.206 327.538 306.205C325.538 308.204 322.828 309.329 320 309.333H192C189.189 309.36 186.502 310.496 184.524 312.493C182.546 314.491 181.436 317.188 181.436 320C181.436 322.811 182.546 325.508 184.524 327.506C186.502 329.503 189.189 330.639 192 330.666H320C328.484 330.657 336.618 327.282 342.617 321.283C348.616 315.284 351.99 307.15 352 298.666V181.333H427.4C431.495 181.339 435.502 182.52 438.945 184.737C442.388 186.954 445.122 190.113 446.822 193.838L450.835 202.666H405.335C399.678 202.672 394.255 204.921 390.255 208.921C386.255 212.92 384.006 218.343 384 224V266.667C384.005 272.323 386.255 277.746 390.254 281.746C394.254 285.745 399.677 287.994 405.333 288H489.133C490.101 290.987 490.619 294.101 490.671 297.24V341.334C490.667 344.162 489.541 346.874 487.541 348.873C485.54 350.873 482.828 351.997 480 352H446.922C444.463 339.956 437.919 329.131 428.397 321.357C418.875 313.582 406.959 309.336 394.667 309.336C382.374 309.336 370.459 313.582 360.937 321.357C351.415 329.131 344.871 339.956 342.412 352H169.589C167.13 339.956 160.586 329.131 151.064 321.357C141.542 313.582 129.626 309.336 117.334 309.336C105.041 309.336 93.1259 313.582 83.6039 321.357C74.0819 329.131 67.5378 339.956 65.0788 352H53.3328C50.5048 351.996 47.7938 350.871 45.7942 348.872C43.7945 346.872 42.6695 344.161 42.6658 341.333V330.667C45.4768 330.64 48.1635 329.504 50.1416 327.507C52.1198 325.509 53.2295 322.812 53.2295 320C53.2295 317.189 52.1198 314.492 50.1416 312.494C48.1635 310.497 45.4768 309.361 42.6658 309.334H10.6658C7.85473 309.361 5.16807 310.497 3.18992 312.494C1.21176 314.492 0.102051 317.189 0.102051 320C0.102051 322.812 1.21176 325.509 3.18992 327.507C5.16807 329.504 7.85473 330.64 10.6658 330.667H21.3328V341.334C21.342 349.818 24.7164 357.952 30.7156 363.951C36.7147 369.95 44.8487 373.325 53.3328 373.334H65.0778C67.5368 385.378 74.0809 396.203 83.6029 403.977C93.1249 411.752 105.04 415.998 117.333 415.998C129.625 415.998 141.541 411.752 151.063 403.977C160.585 396.203 167.129 385.378 169.588 373.334H342.411C344.87 385.378 351.414 396.203 360.936 403.977C370.458 411.752 382.373 415.998 394.666 415.998C406.958 415.998 418.874 411.752 428.396 403.977C437.918 396.203 444.462 385.378 446.921 373.334H480C488.484 373.325 496.618 369.95 502.617 363.951C508.616 357.952 511.99 349.818 512 341.334V297.24C512.012 289.627 510.381 282.102 507.219 275.177V275.177ZM117.333 394.667C111.004 394.667 104.817 392.79 99.5545 389.274C94.2922 385.758 90.1906 380.76 87.7686 374.913C85.3466 369.066 84.7129 362.631 85.9476 356.424C87.1824 350.217 90.2301 344.515 94.7054 340.04C99.1806 335.564 104.882 332.517 111.09 331.282C117.297 330.047 123.731 330.681 129.579 333.103C135.426 335.525 140.424 339.626 143.94 344.889C147.456 350.151 149.333 356.338 149.333 362.667C149.323 371.151 145.949 379.285 139.95 385.284C133.951 391.283 125.817 394.658 117.333 394.667V394.667ZM394.666 394.667C388.337 394.667 382.15 392.79 376.888 389.274C371.625 385.758 367.524 380.76 365.102 374.913C362.68 369.066 362.046 362.631 363.281 356.424C364.515 350.217 367.563 344.515 372.038 340.04C376.514 335.564 382.215 332.517 388.423 331.282C394.63 330.047 401.064 330.681 406.912 333.103C412.759 335.525 417.757 339.626 421.273 344.889C424.789 350.151 426.666 356.338 426.666 362.667C426.656 371.151 423.282 379.285 417.283 385.284C411.284 391.283 403.151 394.657 394.667 394.667H394.666ZM405.333 224H460.527L479.921 266.667H405.333V224Z', fill:'black'}
  ]*/


//export const truck_svg=[ {path:'M 50 50 l 0 50 l 50 0 l 0 -50 z', fill:'#FFFF'}]

export const truck_svg = [{
  path: 'M17.402,0H5.643C2.526,0,0,3.467,0,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644 V6.584C23.044,3.467,20.518,0,17.402,0z M22.057,14.188v11.665l-2.729,0.351v-4.806L22.057,14.188z M20.625,10.773 c-1.016,3.9-2.219,8.51-2.219,8.51H4.638l-2.222-8.51C2.417,10.773,11.3,7.755,20.625,10.773z M3.748,21.713v4.492l-2.73-0.349 V14.502L3.748,21.713z M1.018,37.938V27.579l2.73,0.343v8.196L1.018,37.938z M2.575,40.882l2.218-3.336h13.771l2.219,3.336H2.575z M19.328,35.805v-7.872l2.729-0.355v10.048L19.328,35.805z',
  fill: 'blue'
}]


