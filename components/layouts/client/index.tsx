import React from 'react';
import Link from 'next/link';

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
      <footer>Client Footer</footer>
    </div>
  );
};

export default ClientLayout;
