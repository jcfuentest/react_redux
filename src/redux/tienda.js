
import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import pokeReducer from './ducks'
import usuarioReducer,{validarUsuario} from './usuarioDucks'


const rootReducer = combineReducers({
    pokemones: pokeReducer, 
    usuarios: usuarioReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore(){
    const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
    validarUsuario()(store.dispatch)
    return store;
}