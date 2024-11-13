'use client';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import AuthLayout from '../../layouts/auth';

const withAuth = (WrappedComponent: any) => {
  return function WithAuth(props: any) {
    const isUserAuthenticated = true; // get from useContext
    useEffect(() => {
      if (!isUserAuthenticated) {
        redirect('/sign-in');
      }
    }, [isUserAuthenticated]);

    return (
      <AuthLayout>
        <WrappedComponent {...props} />
      </AuthLayout>
    );
  };
};

export default withAuth;
