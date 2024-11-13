'use client';
import { useEffect } from 'react';
import './page.scss';
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();
  useEffect(() => {
    console.log('get in');

    // router.push('/home');
  }, []);
  return <div>This is root page</div>;
};

export default Home;
