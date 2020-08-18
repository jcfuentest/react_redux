import React from 'react'
import {useDispatch,useSelector} from 'react-redux'
import  {
    Link, NavLink
  } from "react-router-dom";

import {cerrarCesion} from '../redux/usuarioDucks'
import {withRouter} from 'react-router-dom'

const Navbar = (props) => {
    const dispatch = useDispatch()

    const cerrar = () => {
       dispatch(cerrarCesion())
       props.history.push('/login')
    }

    const activo = useSelector(store => store.usuarios.activo) 
    const imagen = useSelector(store => store.usuarios.usuario)
    
    
    return (
        <div className="navbar navbar-dark bg-dark mt-3">
              <Link to="/" className="navbar-brand p-3">Poke API</Link>
            <div>
                <div className="d-flex">
                    {
                        activo === true ?
                          (<NavLink
                        className="btn btn-dark mr-2"
                        exact
                        to="/">
                        Pokemon
                     </NavLink>): null
                    }
                  
                  {!activo === true ? (
                  <NavLink
                        className="btn btn-dark mr-2"
                        exact
                        to="/login">
                        Login
                  </NavLink>):
                  null           
                  }
                  {
                      activo ?
                      (<NavLink
                        className="btn btn-dark mr-2"
                        exact
                        to="/perfil">
                        Perfil
                  </NavLink>):null
                  }
                  {
                      activo === true ? (
                             <button
                        className="btn btn-dark"
                        onClick={()=>cerrar()}
                    >
                        cerrar Sesión

                    </button>
                    
                    
                      ): null
                  }

                  {
                      activo===true?
                  (<img src={imagen.fotoUrl} width="30px" className="rounded-circle "/>):null
                  }
                    
                  
                   
                </div>
            </div>
        </div>
    )
}

export default withRouter(Navbar)
