import React from 'react'

export default function NavBar(props){
   return (
    <div className = 'navbar'>
      <span className = 'family-story'> Family Story </span> 
      <span className = 'logout-nav'> LOGOUT </span>
      {props.logout ? <a className = 'logout' href={process.env.REACT_APP_LOGOUT} ><button>Logout</button></a>: null }
    </div>
  )
}