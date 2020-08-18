import React from 'react'

import Detalle from './Detalle.jsx'

import {useDispatch, useSelector} from 'react-redux'
import {obtenerPokemonesAccion,siguentePokeAction,anteriorPokeAction,detallePokeAccion} from './redux/ducks';

const Pokemones = () => {

    const dispatch = useDispatch()
    const pokemon = useSelector(store => store.pokemones.results)
    const next = useSelector(caca => caca.pokemones.next)
    const previous = useSelector(mojon => mojon.pokemones.previous)
    


    return (
        <div  className="row mt-5">
     
            <div className="col-md-6 ">
                <h3>pokemon</h3>
                <div className="d-flex justify-content-between mt-5">
             {
                 pokemon.length===0 && 
                    <button className="btn btn-dark" onClick={()=> dispatch(obtenerPokemonesAccion())}>llamar pokemones</button>
                 
             }

             {
                 next && <button className="btn btn-dark" onClick={()=>dispatch(siguentePokeAction())}>Siguente Pokemones</button>
             }

             {
                 previous &&  <button className="btn btn-dark"jj onClick={()=>dispatch(anteriorPokeAction())}>aterior Pokemones</button>
             }
            
            </div>
            
             <ul  class="list-group">
                 {
                     pokemon.map(item => (
                     <li class="list-group-item" key= {item.name}>{item.name}
                     <button type="button" class="btn btn-outline-info float-right" onClick={()=>dispatch(detallePokeAccion(item.url))}>Info</button>
                     </li>
                     ))
                     
                 }
             </ul>
             </div>
             <div className="col-md-6">
                 <h3>Detalle Pokemon</h3>
                <Detalle/>
             </div>
        </div>
    )
}

export default Pokemones
