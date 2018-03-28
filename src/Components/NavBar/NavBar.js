import React from 'react'

export default function NavBar(props){
   return (
    <div className = 'navbar'>
      <span className = 'family-story'> Family Story </span>
      {props.logout ? <a className = 'logout-nav' href={process.env.REACT_APP_LOGOUT}><span>LOGOUT</span></a>: <a href={process.env.REACT_APP_LOGIN} className = 'login-nav'><span> LOGIN </span></a> }
    </div>
  )
}