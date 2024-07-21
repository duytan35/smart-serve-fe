'use client';
import { Table } from 'antd';
import './styles.scss';
import withAuth from '@/components/withAuth';

const OrderList = () => {
    return (
        <div className='home_container'>
            This is orderList page
        </div>
    );
};

export default withAuth(OrderList);
