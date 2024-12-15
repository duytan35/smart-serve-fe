'use client';

import './index.scss';
import React, { useState } from 'react';
import { Button, notification } from 'antd';
import { useRouter } from 'next/navigation';
import useSWRMutation from 'swr/mutation';
import { ISignup } from '@/types/auth';
import AuthApi from '@/services/auth/index';
import Link from 'next/link';

const SignUpPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');

  const { trigger: triggerSignup, isMutating: isLoading } = useSWRMutation(
    'signup',
    async (
      _: string,
      {
        arg,
      }: {
        arg: ISignup;
      },
    ) => AuthApi.signup(arg),
    {
      onSuccess: () => {
        notification.success({
          message: 'Sign up successfully!',
        });

        router.push('/sign-in');
      },
      onError: (error) => {
        console.error(error);
        notification.error({
          message: 'Sign up failed! Email already exist.',
        });
      },
    },
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== retypePassword) {
      notification.error({
        message: 'Password and retype password must be the same',
      });
      return;
    }
    triggerSignup({ email, password, name, address, phone });
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h1>Sign up</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Restaurant name</label>
            <input
              type="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Restaurant name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="address"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              placeholder="Address"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone number</label>
            <input
              type="phone"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="Address"
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
              placeholder="Password"
              minLength={8}
            />
          </div>
          <div className="form-group">
            <label htmlFor="retypePassword">Retype Password</label>
            <input
              type="password"
              id="retypePassword"
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
              required
              placeholder="Retype Password"
            />
          </div>
          <div className="button-container">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isLoading}
            >
              Sign up
            </Button>
          </div>
          <div className="sign-in-ref">
            Or do you already have an account?{' '}
            <Link href="sign-in">Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
