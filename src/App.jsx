import React from 'react';
import Pokemones from './Pokemones';
import {auth} from './component/ConfigFirebase';
import  {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Navbar from './component/Navbar';
import Login from './component/Login';
import Perfil from './component/Perfil'


function App() {

  const [firebaseUser, setFirebaseUser] = React.useReducer(false)


  // React.useEffect(()=>{

  //   const fetchUser = () => {
  //     auth.onAuthStateChanged(user => {
  //       console.log(user)
  //       if (user) {
  //         setFirebaseUser(user)
  //       }else{
  //         setFirebaseUser(null)
  //       }
  //     })
  //   }

  //   fetchUser()
  // },[])


  // const rutaPrivada = ({component, path, ...rest}) => {
    
  //   if (localStorage.getItem('usuario')) {
  //     const elUser = JSON.parse(localStorage.getItem('usuario'))
  //     if (elUser.uid === firebaseUser.uid) {
  //        return <Route component={component} path={path} {...rest}/>
  //     }else{
  //       return <Redirect  to='/login' {...rest} />     
  //     }
  //   }else {
  //     return <Redirect  to='/login' {...rest} />
  //   }
  // }

 
  return  (
    

    <BrowserRouter>
      
       <div className="container ">
         <Navbar/>
         <Switch>
           <Route path='/' component={Pokemones} exact/>
           <Route path='/perfil' component={Perfil} exact/>
           <Route path='/login' component={Login} exact/>
             
           
           
         </Switch>
  
          
      </div>
    </BrowserRouter>
   
  
  
  )
}

export default App;
