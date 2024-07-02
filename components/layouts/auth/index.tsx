import React from 'react';
import Link from 'next/link';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/sign-in">Logout</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
      <footer>Auth Footer</footer>
    </div>
  );
};

export default AuthLayout;
