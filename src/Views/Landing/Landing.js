import React from 'react'

import NavBar from '../../Components/NavBar/NavBar'

export default function Landing(props){
   return (
    <div>
      <NavBar/>
      <div className = 'landing-picture'>
      </div> 
      <a href={process.env.REACT_APP_LOGIN} ><button>LOGIN</button></a>
    </div>
  )
}