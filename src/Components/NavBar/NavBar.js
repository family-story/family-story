import React from 'react'

export default function NavBar(props){
   return (
    <div className='navbar'>
      <span> Family Story </span> 
      {props.logout ? <a className = 'logout'> Logout </a>: null }
    </div>
  )
}