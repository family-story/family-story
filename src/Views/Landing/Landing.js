import React from 'react'

import NavBar from '../../Components/NavBar/NavBar'

export default function Landing(props){
   return (
    <div>
      <NavBar/>
      <div className = 'landing-picture'>
        <div className = 'landing-mid'>
          <span className = 'landing-welcome-1'>
            Welcome to Family Story
          </span>
            <div className = 'landing-welcome-2'>
              where your stories come to life...
            </div>
        </div> 
      </div> 
      <a href={process.env.REACT_APP_LOGIN} ><button>LOGIN</button></a>
    </div>
  )
}