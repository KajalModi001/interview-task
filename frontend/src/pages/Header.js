import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
        <ul>
            <Link to='/adminlogin'><li>Login</li></Link>
            <Link to='/adminregister'><li>Admin Register</li></Link>
            <Link to='/userregister'><li>User Register</li></Link> 
        </ul>
        
    </div>
  )
}

export default Header