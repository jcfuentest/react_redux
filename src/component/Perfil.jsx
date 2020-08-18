import React from 'react'
import {modificarNombre,guardarImagen} from '../redux/usuarioDucks'

import {useDispatch, useSelector} from 'react-redux'
        
 
const Perfil = () => {

    const [editaNombre, setEditaNombre] = React.useState(false)
    const [editar, setEditar] = React.useState('')

    const nombre = useSelector(store => store.usuarios.usuario)
    const activo = useSelector(store => store.usuarios.activo)
    const dispatch = useDispatch()
     console.log(nombre)

     const guardar = () => {

        dispatch(modificarNombre(editar))
        setEditaNombre(false)
        

     }

     

     const seleccionarArchivo = (e) => {

         console.log(e.target.files[0]) 

         const imagenCli = e.target.files[0]

         if (imagenCli === undefined) {
             console.log('no selecciono imGEN')
             return
         }

         if (imagenCli.type==="image/png" || imagenCli.type==="image/jpg") {
              console.log('es una imagen jpg o png ')
              dispatch(guardarImagen(imagenCli))
         }
     }
    
    return  activo ? (
        
        <div className=" mt-5  text-center">
            <div className="card">
                <div className="card-body">
                    
                         <img src={nombre.fotoUrl} width="70px " className="img-fluid rounded"/> 
                         <h5 className="card-title">{nombre.nombre}</h5>
                         <p className="card-text">d make up the bu</p>
                                   <button 
                                   className="btn btn-dark"
                                   onClick={()=> setEditaNombre(true)}
                                   >
                               editar nombre
                                   </button> 
                                   <div className="custom-file">
                                    <input 
                                    type="file" 
                                    className="custom-file-input" 
                                    id="inputGroupFile01" 
                                    style={{display:'none'}}
                                    onChange={e => seleccionarArchivo(e)}
                                    />
                                    <label 
                                    className="btn btn-dark mt-3" 
                                    htmlFor ="inputGroupFile01"
                                    >
                                        Actualizar Imagen
                                    </label>
                                </div>
                      
                      {
                          editaNombre && 
                          (
                            <div className="card-body">
                            <div className="row justify-content-center">
                            <div className="col-md-5">
                            <div className="input-group mb-3">
                                 <input 
                                 type="text" 
                                 className="form-control" 
                                 placeholder="Editar"
                                 value={editar}
                                 onChange={(e)=>setEditar(e.target.value)}
                                 
                                  />
                                 <div className="input-group-append">
                                     <button 
                                     className="btn btn-dark" 
                                     type="button"
                                      id="button-addon2"
                                      
                                      onClick={()=>guardar()}
                                      >
                                       Guardar
                                      </button>
                                 </div>

                                 
                             </div>
                            </div>
                          
                            </div>
                        
                         
                         </div>
                          )
                      }
                
                          
                                                
                    
                </div>
            </div>


        </div>
    ): <div> Cargando....</div>
}

export default Perfil
