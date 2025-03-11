import React, { useState } from 'react';
import axios from 'axios';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async(e) => {
        e.preventDefault()
        const data = {email, password}

        await axios.post("http://localhost:5555/login", data)
        .then((res)=> {
            alert(res.data.message);
        })
        .catch((err) => {
            alert(err.res.data.message);
        })
    }
  return (
    <form>
    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
    <button onClick={login}>Login</button>
  </form>
  )
}

export default AdminLogin