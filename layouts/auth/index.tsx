'use client';

import './index.scss';
import React from 'react';
import Header from '@/components/Header';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container">
      <div className="content-container">
        <div className="header">
          <Header />
        </div>
        <div className="content">
          <main className="layout-container">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
