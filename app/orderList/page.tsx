'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, Col, Row } from 'antd';
import './styles.scss';
import withAuth from '@/components/withAuth';
import { Content } from 'antd/es/layout/layout';
import { calculateWaitingTime } from '@/utils/utils';
import { CloseCircleOutlined } from '@ant-design/icons';
import RemoveOrderModal from '@/components/RemoveOrderModal';
import { IOrderResponse } from '@/types/api/order';
import { ITableResponse } from '@/types/api/table';
import { orderStatus } from '@/contants/orderStatus';

interface ITable extends ITableResponse {
  status: string;
}

const initialTableList = [
  {
    id: 1,
    createdAt: '2024-07-06T06:46:03.138Z',
    updatedAt: '2024-07-06T06:46:03.138Z',
    restaurantId: '0e21b496-6ebc-4045-bf61-665dc990114d',
    name: 'Bàn 1',
    seats: 4,
  },
  {
    id: 2,
    createdAt: '2024-07-09T13:13:20.307Z',
    updatedAt: '2024-07-09T13:13:20.307Z',
    restaurantId: '0e21b496-6ebc-4045-bf61-665dc990114d',
    name: 'Bàn 2',
    seats: 4,
  },
  {
    id: 3,
    createdAt: '2024-07-09T13:13:20.307Z',
    updatedAt: '2024-07-09T13:13:20.307Z',
    restaurantId: '0e21b496-6ebc-4045-bf61-665dc990114d',
    name: 'Bàn 2',
    seats: 4,
  },
  {
    id: 4,
    createdAt: '2024-07-09T13:13:20.307Z',
    updatedAt: '2024-07-09T13:13:20.307Z',
    restaurantId: '0e21b496-6ebc-4045-bf61-665dc990114d',
    name: 'Bàn 2',
    seats: 4,
  },
  {
    id: 5,
    createdAt: '2024-07-09T13:13:20.307Z',
    updatedAt: '2024-07-09T13:13:20.307Z',
    restaurantId: '0e21b496-6ebc-4045-bf61-665dc990114d',
    name: 'Bàn 2',
    seats: 4,
  },
  {
    id: 6,
    createdAt: '2024-07-09T13:13:20.307Z',
    updatedAt: '2024-07-09T13:13:20.307Z',
    restaurantId: '0e21b496-6ebc-4045-bf61-665dc990114d',
    name: 'Bàn 2',
    seats: 4,
  },
  {
    id: 7,
    createdAt: '2024-07-09T13:13:20.307Z',
    updatedAt: '2024-07-09T13:13:20.307Z',
    restaurantId: '0e21b496-6ebc-4045-bf61-665dc990114d',
    name: 'Bàn 2',
    seats: 4,
  },
  {
    id: 8,
    createdAt: '2024-07-09T13:13:20.307Z',
    updatedAt: '2024-07-09T13:13:20.307Z',
    restaurantId: '0e21b496-6ebc-4045-bf61-665dc990114d',
    name: 'Bàn 2',
    seats: 4,
  },
  {
    id: 9,
    createdAt: '2024-07-09T13:13:20.307Z',
    updatedAt: '2024-07-09T13:13:20.307Z',
    restaurantId: '0e21b496-6ebc-4045-bf61-665dc990114d',
    name: 'Bàn 2',
    seats: 4,
  },
  {
    id: 10,
    createdAt: '2024-07-09T13:13:20.307Z',
    updatedAt: '2024-07-09T13:13:20.307Z',
    restaurantId: '0e21b496-6ebc-4045-bf61-665dc990114d',
    name: 'Bàn 2',
    seats: 4,
  },
  {
    id: 11,
    createdAt: '2024-07-09T13:13:20.307Z',
    updatedAt: '2024-07-09T13:13:20.307Z',
    restaurantId: '0e21b496-6ebc-4045-bf61-665dc990114d',
    name: 'Bàn 2',
    seats: 4,
  },
  {
    id: 12,
    createdAt: '2024-07-09T13:13:20.307Z',
    updatedAt: '2024-07-09T13:13:20.307Z',
    restaurantId: '0e21b496-6ebc-4045-bf61-665dc990114d',
    name: 'Bàn 2',
    seats: 4,
  },
  {
    id: 13,
    createdAt: '2024-07-09T13:13:20.307Z',
    updatedAt: '2024-07-09T13:13:20.307Z',
    restaurantId: '0e21b496-6ebc-4045-bf61-665dc990114d',
    name: 'Bàn 2',
    seats: 4,
  },
  {
    id: 14,
    createdAt: '2024-07-09T13:13:20.307Z',
    updatedAt: '2024-07-09T13:13:20.307Z',
    restaurantId: '0e21b496-6ebc-4045-bf61-665dc990114d',
    name: 'Bàn 2',
    seats: 4,
  },
];

const initialOrderList = [
  {
    id: 2,
    tableId: 1,
    status: 'InProgress',
    createdAt: '2024-07-30T06:51:04.473Z',
    updatedAt: '2024-07-30T06:51:42.54Z',
    orderDetails: [
      {
        id: 3,
        quantity: 2,
        discountPercent: 0,
        dishId: 1,
        dishName: 'Phở',
        dishPrice: 50000,
        createdAt: '2024-07-06T06:51:42.547Z',
        updatedAt: '2024-07-06T06:51:42.547Z',
      },
    ],
  },
  {
    id: 3,
    tableId: 2,
    status: 'Complete',
    createdAt: '2024-07-07T10:15:30.473Z',
    updatedAt: '2024-07-07T10:45:42.54Z',
    orderDetails: [
      {
        id: 4,
        quantity: 1,
        discountPercent: 10,
        dishId: 2,
        dishName: 'Bún Bò Huế',
        dishPrice: 60000,
        createdAt: '2024-07-07T10:45:42.547Z',
        updatedAt: '2024-07-07T10:45:42.547Z',
      },
      {
        id: 5,
        quantity: 3,
        discountPercent: 0,
        dishId: 3,
        dishName: 'Chả Giò',
        dishPrice: 15000,
        createdAt: '2024-07-07T10:45:42.547Z',
        updatedAt: '2024-07-07T10:45:42.547Z',
      },
    ],
  },
  {
    id: 4,
    tableId: 3,
    status: 'Cancel',
    createdAt: '2024-07-08T12:30:15.473Z',
    updatedAt: '2024-07-08T13:00:42.54Z',
    orderDetails: [
      {
        id: 6,
        quantity: 4,
        discountPercent: 5,
        dishId: 4,
        dishName: 'Gỏi Cuốn',
        dishPrice: 20000,
        createdAt: '2024-07-08T13:00:42.547Z',
        updatedAt: '2024-07-08T13:00:42.547Z',
      },
    ],
  },
  {
    id: 5,
    tableId: 1,
    status: 'InProgress',
    createdAt: '2024-07-09T14:15:25.473Z',
    updatedAt: '2024-07-09T14:45:42.54Z',
    orderDetails: [
      {
        id: 7,
        quantity: 2,
        discountPercent: 0,
        dishId: 1,
        dishName: 'Phở',
        dishPrice: 50000,
        createdAt: '2024-07-09T14:45:42.547Z',
        updatedAt: '2024-07-09T14:45:42.547Z',
      },
      {
        id: 8,
        quantity: 1,
        discountPercent: 0,
        dishId: 5,
        dishName: 'Bánh Mì',
        dishPrice: 30000,
        createdAt: '2024-07-09T14:45:42.547Z',
        updatedAt: '2024-07-09T14:45:42.547Z',
      },
      {
        id: 9,
        quantity: 1,
        discountPercent: 0,
        dishId: 5,
        dishName: 'Bánh Mì',
        dishPrice: 30000,
        createdAt: '2024-07-09T14:45:42.547Z',
        updatedAt: '2024-07-09T14:45:42.547Z',
      },
    ],
  },
];

const getSortedOrderDetails = (orderList: IOrderResponse[]) => {
  return orderList.sort(
    (a: any, b: any) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );
};

const OrderList = () => {
  const [waitingTimes, setWaitingTimes] = useState<{ [key: number]: string }>(
    {},
  );
  const [orderList, setOrderList] =
    useState<IOrderResponse[]>(initialOrderList);
  const [visible, setVisible] = useState({ removeOrderItem: false });
  const [focusOrderDetail, setFocusOrderDetail] = useState<any>(undefined);

  const dynamicOrderList = useMemo(() => {
    return getSortedOrderDetails(orderList);
  }, [orderList]);

  const currenTable = useMemo(() => {
    return initialTableList.map((item) => {
      const order = dynamicOrderList.find((e) => e.tableId === item.id);
      return { ...item, status: order?.status ?? 'free' };
    });
  }, [dynamicOrderList]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newWaitingTimes: { [key: number]: string } = {};
      dynamicOrderList.forEach((order) => {
        newWaitingTimes[order.id] = calculateWaitingTime(
          String(order.createdAt),
        );
      });
      setWaitingTimes(newWaitingTimes);
    }, 60000);

    return () => clearInterval(interval);
  }, [dynamicOrderList]);

  const removeOrderItem = (orderId: number, itemId: number) => {
    setVisible({ ...visible, removeOrderItem: false });
    setOrderList((prevOrders) => {
      const updatedOrders = prevOrders.map((order) => {
        if (order.id === orderId) {
          const updatedOrderDetails = order.orderDetails.filter(
            (item) => item.id !== itemId,
          );

          if (updatedOrderDetails.length === 0) {
            return null;
          }

          return {
            ...order,
            orderDetails: updatedOrderDetails,
          };
        }
        return order;
      });

      return updatedOrders.filter((order) => order !== null);
    });
  };

  const renderTable = (table: ITable) => {
    console.log(table.status);

    return (
      <Col span={8} key={table.id}>
        <Col
          className="table_container"
          style={{
            backgroundColor:
              table.status === orderStatus.InProgress ? 'orange' : '#04f400',
          }}
        >
          <Row className="table_header" justify={'space-between'}>
            <Col className="table_name">{table.name}</Col>
            <Col className="table_status">Trống</Col>
          </Row>
          <Row>các món đang chờ</Row>
        </Col>
      </Col>
    );
  };

  const renderOrder = (order: IOrderResponse) => {
    const table = initialTableList.find((item) => item.id === order.tableId);
    return (
      <Col className="order_container" key={order.id}>
        <Row className="order_header" justify={'space-between'}>
          <Col className="order_name">{table?.name} </Col>
          <Col className="table_status">
            {waitingTimes[order.id] ||
              calculateWaitingTime(String(order.createdAt))}
          </Col>
        </Row>
        {order.orderDetails.map((item, index) => (
          <Row className="order_value" justify={'space-between'} key={index}>
            <Col className="order_name">
              <CloseCircleOutlined
                color="red"
                className="dish_cancel"
                onClick={() => {
                  setFocusOrderDetail({ order: order, orderItem: item });
                  setVisible({ ...visible, removeOrderItem: true });
                }}
              />
              {item.dishName}
            </Col>
            <Col className="order_amount"> Số Lượng : {item.quantity}</Col>
          </Row>
        ))}
        <Row gutter={[12, 12]} justify={'end'}>
          <Col>
            <Button type="primary">Xác nhận</Button>
          </Col>
        </Row>
      </Col>
    );
  };

  return (
    <div className="order_list_container">
      <Row className="container_header">Danh sách đơn hàng</Row>
      <Content className="container_content">
        <Row justify={'space-around'}>
          <Col span={16}>
            <Row className="table_list" gutter={[12, 8]} justify={'start'}>
              {currenTable.map((item) => renderTable(item))}
            </Row>
          </Col>
          <Col span={8} className="order_list">
            <Card className="order_card">
              {dynamicOrderList.map((order) => renderOrder(order))}
            </Card>
          </Col>
        </Row>
      </Content>
      <RemoveOrderModal
        visible={visible.removeOrderItem}
        onCancel={() => setVisible({ ...visible, removeOrderItem: false })}
        onSubmit={() =>
          removeOrderItem(
            focusOrderDetail?.order?.id,
            focusOrderDetail?.orderItem?.id,
          )
        }
        orderItemDetail={focusOrderDetail}
      />
    </div>
  );
};

export default withAuth(OrderList);
