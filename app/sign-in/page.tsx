'use client';

import React, { useState } from 'react';
import './index.scss';
import { Button } from 'antd';
import { loginThunk } from '../../redux/actions/authThunk';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

const SignInPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginThunk({ mail: email, password: password })).then(() => {
      router.push('/home');
    });
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
