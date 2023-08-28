import React, { useState } from 'react';
import './Styles.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "./Login.css"

function Login(props) {
    const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  

  const handleLogin = async() => {
    if (!username || !password) {
      alert('Please fill in both username and password fields.');
      return;
    }
  
    const response = await axios.post('https://task-management-l6a9.onrender.com/api/login', {
      username: username,
      password: password,
    });
  
    if(response.status===200){  localStorage.setItem('isLoggedIn', 'true');  navigate('/home')  }


  };

  return (
    <div>
      <div className='login-container'>
    <div className='login-input'>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <div>
      <button onClick={handleLogin}>Login</button></div>
    </div>
    <div>
    <p>New user?<button onClick={() => navigate('/register')}>
          Register
        </button></p>
        </div>
        </div>
    </div>
  );
}

export default Login;
