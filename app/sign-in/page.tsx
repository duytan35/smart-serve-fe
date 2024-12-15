'use client';

import './index.scss';
import React, { useState } from 'react';
import { Button, notification } from 'antd';
import { useRouter } from 'next/navigation';
import useSWRMutation from 'swr/mutation';
import { ISignin } from '@/types/auth';
import AuthApi from '@/services/auth/index';
import { useDispatch } from 'react-redux';
import { setRestaurant } from '@/store/slices/appSlice';
import Link from 'next/link';

const SignInPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const { trigger: triggerSignin, isMutating: isLoading } = useSWRMutation(
    'signin',
    async (
      _: string,
      {
        arg,
      }: {
        arg: ISignin;
      },
    ) => AuthApi.signin(arg),
    {
      onSuccess: (data) => {
        const { accessToken, ...restaurant } = data;
        notification.success({
          message: 'Sign in successfully!',
        });

        localStorage.setItem('accessToken', accessToken);
        dispatch(setRestaurant(restaurant));

        router.push('/home');
      },
      onError: () => {
        notification.error({
          message: 'Sign in failed! Email or password is incorrect',
        });
      },
    },
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    triggerSignin({ email, password });
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Sign in</h1>
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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          </div>
          <div className="button-container">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isLoading}
            >
              Sign in
            </Button>
          </div>
          <div className="sign-up-ref">
            Have you created an account yet? <Link href="sign-up">Sign up</Link>{' '}
            now!
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
