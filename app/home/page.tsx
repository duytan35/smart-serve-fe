'use client';
import { Table } from 'antd';
import './styles.scss';
import withAuth from '@/components/withAuth';

const HomePage = () => {
    return (
        <div className='home_container'>
            This is HomePage page
        </div>
    );
};

export default withAuth(HomePage);
