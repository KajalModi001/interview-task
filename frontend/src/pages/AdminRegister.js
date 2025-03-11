import React, { useState } from 'react'
import axios from 'axios'

const AdminRegister = () => {
    const [first_name, setfirstname] = useState('')
    const [last_name, setlastname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const register = async(e) => {
        e.preventDefault()
        const data = {first_name, last_name, email, password, role: 'admin'}

        await axios.post("http://localhost:5555/userregister", data)
        .then((res)=> {
            alert(res.data.message);
        })
        .catch((err)=> {
            alert(err.res.data.message);
        })

    }

  return (
    <form onSubmit={register}>
    <input type="text" value={first_name} onChange={(e) => setfirstname(e.target.value)} placeholder="First Name" />
    <input type="text" value={last_name} onChange={(e) => setlastname(e.target.value)} placeholder="Last Name" />
    <input type="email" value={email} onChange={(e) => setemail(e.target.value)} placeholder="Email" />
    <input type="password" value={password} onChange={(e) => setpassword(e.target.value)} placeholder="Password" />
    <button type="submit">Register</button>
  </form>
  )
}

export default AdminRegister