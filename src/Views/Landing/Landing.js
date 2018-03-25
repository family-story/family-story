import React from 'react'
import { Link } from 'react-router-dom'

import NavBar from '../../Components/NavBar/NavBar'

export default function Landing(props){
   return (
    <div>
      <NavBar/>
      <div>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt possimus magnam dolore a exercitationem voluptatibus corporis reprehenderit ex ad dolor aperiam, atque enim illo minima sit, non, tempora dolorum architecto!
        Dolore commodi delectus explicabo consequuntur corrupti dignissimos distinctio ipsam magnam possimus. Cupiditate, nesciunt aut earum commodi eius ipsa, repudiandae velit ad magnam molestiae dolores consectetur sapiente, vel nam voluptas eos!
        Harum asperiores animi dicta? Porro laborum quibusdam placeat libero. Quam quo, a cum amet doloremque quae nesciunt labore maiores neque sed possimus et assumenda! Sit delectus ratione qui a fugit?
      </div> 
      <a href={process.env.REACT_APP_LOGIN} ><button>LOGIN</button></a>
    </div>
  )
}