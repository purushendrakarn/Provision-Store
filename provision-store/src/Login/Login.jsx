// Login.jsx

import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateForm = (e) => {
    e.preventDefault();

    // Client-side validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!emailRegex.test(email) || !passwordRegex.test(password)) {
      alert('Invalid email or password format');
      return;
    }

    const sha256Password = sha256(password);
    loginAPI(email, sha256Password);
  };
  const sha256 = (input) => {
    return CryptoJS.SHA256(input).toString();
  };
  const loginAPI = (email, password) => {
    console.log('Logging in with:', email, password);
  };

  return (
    <div className="login">
      <form onSubmit={validateForm}>
        <label className="txt_field" htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="txt_field" htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="login-button" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
