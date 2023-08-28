import React, { useState } from 'react';
import './Styles.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister =async () => {
    if (!username || !password) {
      alert('Please fill in both username and password fields.');
      return;
    }
    if (password != confirmPassword) {
      alert('Passwords dont match');
      return;
    }
  
  
    const response = await axios.post('https://task-management-l6a9.onrender.com/api/register', {
        username: username,
        password: password,
      });
     if(response.status===200) navigate('/login')
  };

  return (
    <div className="container">
      <div className="register-container">
        <h1>Register</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
        <p>Already a user?<button onClick={() => navigate('/')}>
          Login
        </button></p>
        
      </div>
    </div>
  );
}

export default Register;
