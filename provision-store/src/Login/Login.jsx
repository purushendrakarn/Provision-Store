import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';  
import './Login.css';
import { login } from '../../src/api/Service';

const Login = () => {
  const navigate = useNavigate();  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginAPI = async (email, password) => {
    try {
      const response = await login(email, password);
      console.log('Login Response ->', response.resposeCode);
  
      if (response.isSuccess && response.resposeCode === 200) {
        setIsLoggedIn(true);
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login API Error ->', error);
      alert('An error occurred during login. Please try again.');
    }
  };
  

  const validateForm = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!emailRegex.test(email) || !passwordRegex.test(password)) {
      alert('Invalid email or password format');
      return;
    }

    const sha256 = (input) => {
      return CryptoJS.SHA256(input).toString();
    };
    const sha256Password = sha256(password);
    // console.log('sha256Password', sha256Password);
    loginAPI(email, sha256Password);
  };

  useEffect(() => {
    if (isLoggedIn) {
      console.log("is logged in");
      navigate("/Productlist");
    }
  }, [isLoggedIn, navigate]);
  
  // console.log("is logged i",isLoggedIn)
  return (
    <div className="login">
      <form onSubmit={validateForm}>
        <label className="txt_field" htmlFor="email">
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="txt_field" htmlFor="password">
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
