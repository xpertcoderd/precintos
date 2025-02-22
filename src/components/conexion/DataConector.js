import axios from 'axios';
import jwtDecode from "jwt-decode";

const backEnd = process.env.VUE_APP_API;
//const backEnd= "http://10.0.0.172:9413";

/*
  import axios from 'axios';
  const backEnd = process.env.VUE_APP_API;        

//const backEnd= "http://10.0.0.172:9000";

*/




export function decodeJWT_firmed(token) {
  try {
    return jwtDecode(token); 
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}

export function decode64Native(token) {
  try {
    console.log("Encoded Token:", token);

    // Extraer el payload (segunda parte del token)
    const payloadBase64 = token.split(".")[1];

    // Decodificar el payload
    const decodedJson = atob(payloadBase64);

    // Convertirlo en un objeto JSON
    const userPublicInfo = JSON.parse(decodedJson);

    console.log("Decoded Payload:", userPublicInfo);

    return userPublicInfo;
  } catch (e) {
    console.error("Error decoding token:", e);
    return null;
  }
}


export function decodeBase64Token(token) {
  try {
    // Decodificar el token directamente
    const decodedJson = atob(token);
    
    // Convertir a JSON
    const userInfo = JSON.parse(decodedJson);

    console.log("Decoded Data:", userInfo);
    return userInfo;
  } catch (e) {
    console.error("Error decoding token:", e);
    return null;
  }
}

//------------- | metodos |-------------------------

export async function transfer_Types() {
    let data = {
        success: false
    };
    await axios.get(backEnd + `/api/v1/transferTypes/all`).then(response => {
        if (response.data.success) {
            data = response.data
        }
        // console.log(response.data)
    }).catch(error => {
        console.log(error)
    });
    return data
}

export async function tariffs_List() {
    let data = {
        success: false
    };
    await axios.get(backEnd + `/api/v1/tariffs/all`).then(response => {
        if (response.data.success) {
            data = response.data
        }
        // console.log(response.data)
    }).catch(error => {
        console.log(error)
    });
    return data
}

export async function tariffs_calculation(trTypeId, startPlace, endPlace) {
    let data = {
        success: false
    };

    await axios.get(backEnd + `/api/v1/tariffs/calc/${trTypeId.id}/${startPlace.id}/${endPlace.id}`).then(response => {
        

        if (response.status === 200) {

        data={
            success: true,
            tariffSelected:response.data
        }
        }else {
            console.log("Error: Código de estado inesperado", response.status);
    }

        // console.log(response.data)
    }).catch(error => {
        console.log(error)
    });
    return data
}




export async function transfers_Create(params) {
    let data = {
        success: false
    };
    await axios.post(backEnd + `/api/v1/transfers/create`,params).then(response => {
    

    if (response.status === 201) {
      
    if (response.data.success) {
        data = response.data // hay que validad con 201

        response.code

    }
    
    } else {
            console.log("Error: Código de estado inesperado", response.status);
    }

        // console.log(response.data)
    }).catch(error => {

        console.log(error.code)

        switch (error.code) {

        case 'ERR_NETWORK':
            console.log("Error de conexion")
            break;
            
        case 'ERR_BAD_RESPONSE':
            console.log(error.response.data)
            data = error.response.data 

            break;

        case 'ERR_BAD_REQUEST':
            console.log(error.response.data)
            data=error.response.data
                
            break  

        default:
            console.log("Error de conexion General")

            break;   
  }

    })

        return data ;  
}

export async function assgin_Containers(params) {
    let data = {
        success: false
    };

    await axios.post(backEnd + `/api/v1/transferUnits/create`,params).then(response => {
    

    if (response.status === 201) {
      
    if (response.data.success) {
        data = response.data // hay que validad con 201

        response.code

    }
    
    } else {
            console.log("Error: Código de estado inesperado", response.status);
    }

        // console.log(response.data)
    }).catch(error => {

        console.log(error.code)

        switch (error.code) {

        case 'ERR_NETWORK':
            console.log("Error de conexion")
            break;
            
        case 'ERR_BAD_RESPONSE':
            console.log(error.response.data)
            data = error.response.data 

            break;

        case 'ERR_BAD_REQUEST':
            console.log(error.response.data)
            data=error.response.data
                
            break  

        default:
            console.log("Error de conexion General")

            break;   
  }

    })

        return data ;  
}


export async function transfers_listAll() {
    let data = {
        success: false
    };
    await axios.get(backEnd + `/api/v1/transfers/all`).then(response => {
        if (response.data.success) {
            data = response.data
        }
        // console.log(response.data)
    }).catch(error => {
        console.log(error)
    });
    return data
}

export async function transfer_UnitsAll() {
    let data = {
        success: false
    };
    await axios.get(backEnd + `/api/v1/transferUnits/all`).then(response => {
        if (response.data.success) {
            data = response.data
        }
        // console.log(response.data)
    }).catch(error => {
        console.log(error)
    });
    return data
}

export async function transfers_list() {
    let data = {
        success: false
    };
    await axios.get(backEnd + `/api/v1/transfers/list`).then(response => {
        if (response.data.success) {
            data = response.data
        }
        // console.log(response.data)
    }).catch(error => {
        console.log(error)
    });
    return data
}



export async function check_Session() {
    let data = {
        success: false
    };
    
    await axios.get(backEnd + `/api/v1/auth/checkSession`).then(response => {
        if (response.data.success) {
            data = response.data
        }
        // console.log(response.data)
    }).catch(error => {
        console.log(error)
    });
    return data
}

export async function transfersCheckBL(name) {
    let data = {
        success: false
    };
    
    await axios.get(backEnd + `/api/v1/transfers/check/${name}`).then(response => {

        if (response.data== 'Transfer exists') {
            data = { success: true }
        }else{
            console.log(response.data)
        }

    }).catch(error => {
        console.log(error)
    });
    return data
}


export async function auth(params) {
    let data = {
        success: false
    };
    await axios.post(backEnd + `/api/v1/auth/login`, params).then(response => {

        if (response.data.success) {
            data = response.data
        }
    }).catch(error => {
        console.log(error)
    });
    return data
}

export async function logOut() {
    let data = {
        success: false
    };
    await axios.get(backEnd + "/api/v1/auth/logout",).then(response => { 
        console.log(response.data)

        if (response.data.success) {
            data = response.data
        }
        // console.log(response.data)
    }).catch(error => {
        console.log(error)
    });
    return data
}

export async function devicesAll() {
    let data = {
        success: false
    };

    await axios.get(backEnd + "/api/v1/devices/all",).then(response => { 
        console.log(response.data)


        if (response.data.success) {
            data = response.data
        }
        // console.log(response.data)
    }).catch(error => {
        console.log(error)
    });
    return data
}

export async function placesList_All(serverClientId) {
    let data = {
        success: false
    };
    await axios.get(backEnd + `/api/v1/places/list/${serverClientId}`,).then(response => {
        console.log(response.data)
        console.log("*******************************")


        if (response.data.success) {
            data = response.data
        }
        // console.log(response.data)
    }).catch(error => {
        console.log(error)
    });
    return data
}

export async function startPlace_Points(serverClientId) {
    let data = {
        success: false
    };
    await axios.get(backEnd + `/api/v1/places/getStartPoints/${serverClientId}`,).then(response => {
        console.log(response.data)


        if (response.data.success) {
            data = response.data
        }
        // console.log(response.data)
    }).catch(error => {
        console.log(error)
    });
    return data
}

export async function endPlace_Points(serverClientId) {
    let data = {
        success: false
    };
    await axios.get(backEnd + `/api/v1/places/getEndPoints/${serverClientId}`,).then(response => {
        console.log(response.data)


        if (response.data.success) {
            data = response.data
        }
        // console.log(response.data)
    }).catch(error => {
        console.log(error)
    });
    return data
}


export async function clientsList() {
    let data = {
        success: false
    };
    await axios.get(backEnd + "/api/v1/clients/all",).then(response => { 
        console.log(response.data)


        if (response.data.success) {
            data = response.data
        }
        // console.log(response.data)
    }).catch(error => {
        console.log(error)
    });
    return data
}

export async function tariffsListAll() {
    let data = {
        success: false
    };
    await axios.get(backEnd + "/api/v1/tariffs/all").then(response => { 
        console.log(response.data)


        if (response.data.success) {
            data = response.data
        }
        // console.log(response.data)
    }).catch(error => {
        console.log(error)
    });
    return data
}


export async function tariffsDelete(id) {
    let data = {
        success: false
    };
    await axios.delete(backEnd + `/api/v1/tariffs/delete/${id}`).then(response => {
    

    if (response.status === 204) {
      
    if (response.data.success) {
        data = response.data // hay que validad con 201

        response.code

    }
    
    } else {
            console.log("Error: Código de estado inesperado", response.status);
    }

        // console.log(response.data)
    }).catch(error => {

        console.log(error.code)

        switch (error.code) {

        case 'ERR_NETWORK':
            console.log("Error de conexion")
            break;
            
        case 'ERR_BAD_RESPONSE':
            console.log(error.response.data)
            data = error.response.data 

            break;

        case 'ERR_BAD_REQUEST':
            console.log(error.response.data)
            data=error.response.data
                
            break  

        default:
            console.log("Error de conexion General")

            break;   
  }

    })

        return data ;  
}


export async function finalClientsList(serverClientId) {
    let data = {
        success: false
    };

    await axios.get(backEnd + `/api/v1/clients/list/${serverClientId}`).then(response => { 
        console.log(response.data)


        if (response.data.success) {
            data = response.data
        }
        // console.log(response.data)
    }).catch(error => {
        console.log(error)
    });
    return data
}

export async function usersList() {
    let data = {
        success: false
    };
    await axios.get(backEnd + "/api/v1/users/all",).then(response => { 
        console.log(response.data)

        if (response.data.success) {
            data = response.data
        }
        // console.log(response.data)
    }).catch(error => {
        console.log(error)
    });
    return data
}


export async  function update_Users(form, user_id) {
    let data

    await axios.put(backEnd + `/api/v1/users/update/${user_id}`, form).then(response => {
        console.log(response.data)

         data = response

    }).catch(error => {

        console.log(error.code)

        switch (error.code) {

        case 'ERR_NETWORK':
            console.log("Error de conexion")
            break; 

        case 'ERR_BAD_REQUEST':
            console.log(error.response.data)

            data=error.response.data
                
            break  

        default:
            console.log("Error de conexion General")

            break;   
  }

    })
    .finally(() => {
       /* data = "text"*/

    })

           return data ;  
   
}


export async function rolesList() {
    let data = {
        success: false
    };
    //await rolesAll().then(response => {
    await axios.get(backEnd + "/api/v1/roles/all",).then(response => { 
        console.log(response.data)

        if (response.data.success) {
            data = response.data
        }
        // console.log(response.data)
    }).catch(error => {
        console.log(error)
    });
    return data
}

export async  function create_Client(form) {
    let data

    await axios.post(backEnd + `/api/v1/clients/create`, form).then(response => {
        console.log(response.data)

         data = response

    }).catch(error => {

        console.log(error.code)

        switch (error.code) {

        case 'ERR_NETWORK':
            console.log("Error de conexion")
            break; 

        case 'ERR_BAD_REQUEST':
            console.log(error.response.data)

            data=error.response.data
                
            break  

        default:
            console.log("Error de conexion General")

            break;   
  }

    })

        return data ;  
   
}


export async function tarrifs_create(params) {
    let data = {
        success: false
    };
    await axios.post(backEnd + `/api/v1/tariffs/create`,params).then(response => {
    

    if (response.status === 201) {
      
    if (response.data.success) {
        data = response.data // hay que validad con 201

        response.code

    }
    
    } else {
            console.log("Error: Código de estado inesperado", response.status);
    }

        // console.log(response.data)
    }).catch(error => {

        console.log(error.code)

        switch (error.code) {

        case 'ERR_NETWORK':
            console.log("Error de conexion")
            break;
            
        case 'ERR_BAD_RESPONSE':
            console.log(error.response.data)
            data = error.response.data 

            break;

        case 'ERR_BAD_REQUEST':
            console.log(error.response.data)
            data=error.response.data
                
            break  

        default:
            console.log("Error de conexion General")

            break;   
  }

    })

        return data ;  
}

export async  function update_Client(form, client_id) {
    let data

    await axios.put(backEnd + `/api/v1/clients/update/${client_id}`, form).then(response => {
        console.log(response.data)

         data = response

    }).catch(error => {

        console.log(error.code)

        switch (error.code) {

        case 'ERR_NETWORK':
            console.log("Error de conexion")
            break; 

        case 'ERR_BAD_REQUEST':
            console.log(error.response.data)

            data=error.response.data
                
            break  

        default:
            console.log("Error de conexion General")

            break;   
  }

    })

        return data ;  
   
}



export async  function create_User(form) {
    let data

    await axios.post(backEnd + `/api/v1/users/create`, form).then(response => {
        console.log(response.data)

         data = response

        // console.log(response.data)
    }).catch(error => {

        console.log(error.code)

        switch (error.code) {

        case 'ERR_NETWORK':
            console.log("Error de conexion")
            break; 

        case 'ERR_BAD_REQUEST':
            console.log(error.response.data)
            console.log(error.response.data.message)

            data=error.response.data
                
            break  

        default:
            console.log("Error de conexion General")

            break;   
  }

    })
        return data ;  
   
}

export async function openSeal(params, pin) {

    let data = {
        success: false
    };

    params.pin=pin

    await axios.post(backEnd + `/api/v1/devices/openSeal`, params).then(response => {
        if (response.data.success) {
            data = {
                success: true
            };
        }
    }).catch(error => {
        console.log(error)
        return data = false
    });
    return data
}
 
export async function counterCandado() {
    let data = {
        success: false
    };
    await axios.get(backEnd + `/api/v1/devices/allStats`).then(response => {
        if (response.data.success) {
            data = response.data
        }
        // console.log(response.data)
    }).catch(error => {
        console.log(error)
    });
    return data
}

export async function blitsTranfers(hash, transfer_id) {
    let data = {
        success: false
    };

    await axios.get(backEnd + `/v1/transferBlits/list/${hash}/${transfer_id}`).then(response => {
        if (response.data.success) {
            data = response.data
        } else if (response.data.note) {
            data = response.data
            console.log("no existe")
        }
        // console.log(response.data)
    }).catch(error => {
        console.log(error)
    });
    return data
}
