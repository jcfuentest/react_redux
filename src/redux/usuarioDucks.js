import {auth, firebase, db, storage} from '../component/ConfigFirebase'

const dataInicial = {
    loading: false,
    activo: false
}


const LOADING = 'LOADING'
const USUARIO_ERROR = 'USUARIO_ERROR'
const USUARIO_EXITO = 'USUARIO_EXITO'
const CERRAR_CESION = 'CERRAR_CESION'
const MODIFICAR_NOMBRE = 'MODIFICAR_NOMBRE'

export default function usuarioReducer (state= dataInicial, action) {
    switch(action.type){
        case LOADING:
            return {...state, loading: true }
        case USUARIO_ERROR:
            return {...dataInicial }
        case USUARIO_EXITO:
            console.log('entro')
            return {...state, usuario: action.payload, activo: true}
        case CERRAR_CESION:
            return {...dataInicial}
        case MODIFICAR_NOMBRE:
            return {...state, nombre: action.payload}
        default:
            return {...state}
    }
}

export const ingresoUsuarioAccion = () => async (dispatch) => {

    dispatch({
        type: LOADING,
    })

    try {

        const provider = new firebase.auth.GoogleAuthProvider();
        const res = await auth.signInWithPopup(provider)
        

        const datosUsuario = {
            email: res.user.email,
            fotoUrl: res.user.photoURL,
            nombre: res.user.displayName
         
        }

        const datadb = await db.collection('usuarios').doc(res.user.email ).get()

        if(datadb.exists){
            dispatch({
                type: USUARIO_EXITO,
                payload:  datadb.data(),
            })
            localStorage.setItem('usuario',JSON.stringify(datadb.data()))
             
        }else{
            await db.collection('usuarios').doc(datosUsuario.email).set(datosUsuario)
            dispatch({
                type: USUARIO_EXITO,
                payload:  datosUsuario
            })
            localStorage.setItem('usuario',JSON.stringify(datosUsuario))
        }

    
    } catch (error) {
        console.log(error)
        dispatch({
            type: USUARIO_ERROR
        })
    }
}

export const validarUsuario = () => (dispatch) => {

    if(localStorage.getItem('usuario')){
        dispatch({
            type: USUARIO_EXITO,
            payload: JSON.parse(localStorage.getItem('usuario'))
        })
    }

}

export const cerrarCesion = () => (dispatch) => {
      auth.signOut()
      dispatch({
          type: CERRAR_CESION
      })

      localStorage.removeItem('usuario')
}

export const guardarImagen = (imagenEditada) =>  async (dispatch, getState) => {
     
    dispatch({
        type: LOADING
    })

    const usuario = getState().usuarios.usuario;
      
    const email = getState().usuarios.usuario.email
    console.log(email)

    try {

        const imagenRef = await storage.ref().child(email).child('fotos usuario')
        await imagenRef.put(imagenEditada)
        const imagenUrl = await imagenRef.getDownloadURL()

        

        const imgNueva = {
            ...usuario,
            fotoUrl: imagenUrl
        }   

        console.log(imgNueva)

        await db.collection('usuarios').doc(email).update({
            fotoUrl: imagenUrl
        })

        console.log('llega aqui')
        dispatch({
            type: USUARIO_EXITO,
            payload: imgNueva
        })

        localStorage.setItem('usuario', JSON.stringify(usuario))

       
        
        
    } catch (error) {
        
    }

}

export const modificarNombre = (nombreNuevo) => async (dispatch, getState) => {

    const email = getState().usuarios.usuario.email
    const usuario = getState().usuarios.usuario

    try {
       
        await db.collection('usuarios').doc(email).update({
            nombre: nombreNuevo
        })

        const user = {
            ...usuario,
            nombre: nombreNuevo
        }
        dispatch({
            type: USUARIO_EXITO,
            payload: user
        })
        
        
    } catch (error) {
        
    }

}