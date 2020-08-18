import axios from 'axios'


// contantes
const dataInicial = {
    count: 0,
    next: null,
    previus:null,
    results:[]
}

const OBTENER_POKEMONES_EXITO = 'OBTENER_POKEMONES_EXITO'
const SIGUENTE_POKEMON_EXITO = 'SIGUENTE_POKEMON_EXITO'
const ANTERIOR_POKEMON_EXITO = 'ANTERIOR_POKEMON_EXITO'
const DETALLE_POKEMON_EXITO = 'DETALLE_POKEMON_EXITO'


//reducer

export default function pokeReducer(state=dataInicial, action){
  switch (action.type) {
      case OBTENER_POKEMONES_EXITO:
        return{...state, ...action.payload}
      case SIGUENTE_POKEMON_EXITO:
          return {...state, ...action.payload }
      case ANTERIOR_POKEMON_EXITO:
          return {...state, ...action.payload }
      case DETALLE_POKEMON_EXITO:
          return {...state, unpokemon: action.payload }
  
      default:
          return state
  }
}

//acciones
export const detallePokeAccion = (url= 'https://pokeapi.co/api/v2/pokemon/1/' ) => async (dispatch) => {

    try {
        const res = await axios.get(url)
        console.log(res.data)
        dispatch({
          type: DETALLE_POKEMON_EXITO,
          payload: {
              nombre: res.data.name
          }
    
        })
    } catch (error) {
        console.log(error)
    }
}

export const obtenerPokemonesAccion = () => async (dispatch, getState) => {

    if (localStorage.getItem('juan')) {
        console.log('datos desde locaStorege')
        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload: JSON.parse(localStorage.getItem('juan')) 
        })
        return
    }
   
 
try {
    console.log('datos desde la api')
    const res = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20')
    dispatch({
        type: OBTENER_POKEMONES_EXITO,
        payload: res.data
    })

   localStorage.setItem('juan', JSON.stringify(res.data))
} catch (error) {
    console.log(error)
}

}

export const siguentePokeAction = () => async (dispatch, getState) => {


    const next = getState().pokemones.next
    console.log(next)
    if (localStorage.getItem(next)) {
        console.log('datos desde locaStorege')
        dispatch({
            type: SIGUENTE_POKEMON_EXITO,
            payload: JSON.parse(localStorage.getItem(next)) 
        })
        return
    }
   

    try {

        const res = await axios.get(next)
        console.log('datos desde api')
        dispatch({
            type: SIGUENTE_POKEMON_EXITO,
            payload:  res.data
        })
        localStorage.setItem(next, JSON.stringify(res.data))
         
    } catch (error) {
        console.log(error)
    }

}

export const anteriorPokeAction = () => async (dispatch, getState) => {  

    const previous = getState().pokemones.previous
    if (localStorage.getItem(previous)) {
        console.log('datos desde locaStorege')
        dispatch({
            type: ANTERIOR_POKEMON_EXITO,
            payload:  JSON.parse(localStorage.getItem(previous)) 
        })
        return
    }

    try {
        const res = await axios.get(previous)
        console.log('datos desde api')
        dispatch({
            type: ANTERIOR_POKEMON_EXITO,
            payload: res.data

        })
        localStorage.setItem(previous, res.data)
        
    } catch (error) {
        console.log(error)
    }



}