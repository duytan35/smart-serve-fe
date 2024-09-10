'use client';
import type { Metadata } from 'next';
import './globals.scss';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Provider } from 'react-redux';
import store from '../redux/store';

// export const metadata: Metadata = {
//   title: 'Smart Serve',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body>
          <AntdRegistry>{children}</AntdRegistry>
        </body>
      </html>
    </Provider>
  );
}
