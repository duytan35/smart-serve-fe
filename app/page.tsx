'use client';
import { useEffect } from 'react';
import './page.scss';
// import { useRouter } from 'next/navigation';
import { Row } from 'antd';
import MainHeader from '@/components/MainHeader';

const Home = () => {
  // const router = useRouter();
  useEffect(() => {
    console.log('get in');

    // router.push('/home');
  }, []);
  return (
    <Row>
      <MainHeader />
    </Row>
  );
};

export default Home;
