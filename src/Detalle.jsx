import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {detallePokeAccion} from './redux/ducks'

const Detalle = () => {

    
const dispatch = useDispatch()

React.useEffect(()=>{

  const fetchData = () => {
       dispatch(detallePokeAccion())
  }
  fetchData()
},[dispatch])

const elpokemom = useSelector(store => store.pokemones.unpokemon)
console.log('tienda',elpokemom)

    return elpokemom?  (
        <div class="card mt-5">
            <div className="card-body">
                <div className="card-title">nombre del pokemon </div>
    <p className="card-text">{elpokemom.nombre}</p>
            </div>
        </div>
    ): null
}

export default Detalle

