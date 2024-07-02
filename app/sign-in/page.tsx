'use client';

import React, { useState } from 'react';
import './index.scss';
import authApi from '@/services/auth';
import { Button } from 'antd';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the login logic, e.g., making an API call
    console.log('Email:', email, 'Password:', password);

    const res = await authApi.signIn({ email, password });
    console.log(res);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="primary" htmlType="submit">
            Button Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
