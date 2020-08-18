import axios from 'axios'

// constantes
 const dataInicial = {
     array : [],
     offset : 0
 }

 const OBTENER_POKEMONES_EXITO = 'OBTENER_POKEMONES_EXITO'
 const SIGUENTE_POKEMONES_EXITO = 'SIGUENTE_POKEMONES_EXITO'

// reducer


export default function pokeReducer(state=dataInicial, action){
    switch (action.type) {
        case OBTENER_POKEMONES_EXITO:
           return {...state, array: action.payload}
        case SIGUENTE_POKEMONES_EXITO:
            return {...state, array: action.payload.array, offset: action.payload.offset}
            
        default:
            return state
    }

}

//acciones

export const onbtenerPokemonesAccion = () => async (dispatch, getState) => {

    console.log('getState', getState().pokemones.offset)
    const {offset} =  getState().pokemones
 try {
     const res = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20')
     dispatch({
         type: OBTENER_POKEMONES_EXITO,
         payload: res.data.results
     })
 } catch (error) {
     console.log(error.message)
 }
}

export const siguentePokemonAccion = () => async (dispatch, getState)=>{
    
    const {offset} = getState().pokemones
    const siguente = offset + 20
    try {

        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${siguente}&limit=20`)
        dispatch({
            type: SIGUENTE_POKEMONES_EXITO,
            payload: {
                array: res.data.results,
                offset: siguente

            }
        })
    } catch (error) {
        
    }
   
}
