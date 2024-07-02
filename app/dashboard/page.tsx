'use client';
import { Table } from 'antd';
import './index.scss';
import withAuth from '@/components/withAuth';

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

const DashboardPage = () => {
  return (
    <div>
      This is dashboard page
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  );
};

export default withAuth(DashboardPage);
