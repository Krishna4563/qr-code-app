import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://qr-code-app-4rpn.vercel.app/login', { username: username, password: password }).then(navigate('/main'))
      const { token } = response.data;
      console.log(token);
    } catch (error) {
      console.error(error); 
    }
  };

  return (
    <div className='login-container'>
      <h2 className='title'>Login Here</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        className='input-field'
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        className='input-field'
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} className='login-button'>Login</button>
    </div>
  );
};

export default Login;
