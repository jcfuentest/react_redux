import React from 'react'
import  {useDispatch, useSelector} from 'react-redux'
import {ingresoUsuarioAccion} from '../redux/usuarioDucks'
import {withRouter} from 'react-router-dom'


const Login = (props) => {

    
    const loading = useSelector(store => store.usuarios.loading)
    const activo = useSelector(store => store.usuarios.activo)

    React.useEffect(()=>{
        const siactivo = ()=>{
            if (activo) {
                 props.history.push('/')
            }
        }
         siactivo()
    },[props.history, activo])
    
    
    const dispatch = useDispatch()

    return (
        <div className="mt-3 text-center">
            <h2>Login</h2>
            <hr/>
            <button className="btn btn-dark mt-4"
             disabled= {loading}
             onClick= {()=> dispatch(ingresoUsuarioAccion())}>Ingresa Con Google</button>
        </div>
    )
}

export default withRouter(Login) 
