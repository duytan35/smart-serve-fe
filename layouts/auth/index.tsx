'use client';
import React from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import './styles.scss';
import Sidebar from '@/components/Sidebar/Index';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container">
      <Sidebar />
      <div className="content_container">
        <div className="header">
          <Header />
        </div>
        <div className="content">
          <main className="layout_container">{children}</main>
        </div>
        {/* <footer className='footer'>
          <Footer />
        </footer> */}
      </div>
    </div>
  );
};

export default AuthLayout;
