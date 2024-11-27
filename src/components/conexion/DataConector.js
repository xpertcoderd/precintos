let hoy = new Date();
let ayer = new Date(hoy.getTime() - (24 * 60 * 60 * 1000) * 2);

  import axios from 'axios';
  const backEnd = process.env.VUE_APP_API;        
//const backEnd= "http://10.0.0.172:9000";



//------------- | metodos |-------------------------

export async function transfers_list(hash) {

    let data = { success: false };


    await axios.get(backEnd + `/v1/transfers/list/${hash}`).then(response => {

        if (response.data.success) {
            data = response.data
        }

        // console.log(response.data)

    }).catch(error => {
        console.log(error)
    });

    return data
}

export async function auth(params) {

    let data = { success: false };

        await axios.get(backEnd + `/v1/auth/login/${params.username}/${params.password}`).then(response => {
    

        if (response.data.success) {
            data = response.data
        }


         }).catch(error => {
            console.log(error)
            return data = false
        });

    return data
}

export async function devicesAll(hash) {

    let data = { success: false };

    await axios.get(backEnd + `/v1/devices/all/${hash}`).then(response => {


        if (response.data.success) {
            data = response.data
        }

        // console.log(response.data)

    }).catch(error => {
        console.log(error)
    });

    return data
}


export async function transfers_listFrame(hash) {


    let data = { success: false };

    await axios.get(backEnd + `/v1/transfers/list/${hash}/${ayer.toISOString()}/${hoy.toISOString()}`).then(response => {


        if (response.data.success) {
            data = response.data
        } else if (response.data.note) {

            data = response.data
            // console.log("No hay transfersList")
        }

        // console.log(response.data)

    }).catch(error => {
        console.log(error)
    });

    return data
}

export async function transfers_listRange(hash, from, to) {


    let data = { success: false };

    await axios.get(backEnd + `/v1/transfers/list/${hash}/${from}/${to}`).then(response => {
        
        if (response.data.success) {
            data = response.data
        } else if (response.data.note) {

            data = response.data
            // console.log("No hay transfersList")
        }

        // console.log(response.data)

    }).catch(error => {
        console.log(error)
    });

    return data
}






export async function counterGeneral(hash) {

    let data = { success: false };

    await axios.get(backEnd + `/v1/states/count/${hash}`).then(response => {


        if (response.data.success) {
            data = response.data
        }

        // console.log(response.data)

    }).catch(error => {
        console.log(error)
    });


    return data
}

export async function counterCandado(hash) {

    let data = { success: false };

    await axios.get(backEnd + `/v1/devices/allStats/${hash}`).then(response => {


        if (response.data.success) {
            data = response.data
        }

        // console.log(response.data)

    }).catch(error => {
        console.log(error)
    });


    return data
}

export async function counterGeneralFrame(hash) {

    let data = { success: false };

    await axios.get(backEnd + `/v1/states/count/${hash}/${ayer.toISOString()}/${hoy.toISOString()}`).then(response => {

        if (response.data.success) {
            data = response.data
        } else if (response.data.note) {

            data = response.data
            //console.log("no existe")
        }

        // console.log(response.data)

    }).catch(error => {
        console.log(error)
    });


    return data
}

export async function counterGeneralRange(hash, from, to) {

    let data = { success: false };

    await axios.get(backEnd + `/v1/states/count/${hash}/${from}/${to}`).then(response => {


        if (response.data.success) {
            data = response.data
        } else if (response.data.note) {

            data = response.data
            //console.log("no existe")
        }

        // console.log(response.data)

    }).catch(error => {
        console.log(error)
    });


    return data
}




export async function blitsTranfers(hash, transfer_id) {

    let data = { success: false };

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


/*export async function transfers_list(params) {
    let data = []
    await axios.post(backEnd + '/v1/transfers/list', params).then(response => {
        data = response.data
    }).catch(error => {
        console.log(error)
        return data = false
    });
    return data
}*/