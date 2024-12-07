'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, Col, Row } from 'antd';
import { initializeSocket, disconnectSocket } from '@/utils/socket';
import './styles.scss';
import withAuth from '@/components/withAuth';
import { Content } from 'antd/es/layout/layout';
import { calculateWaitingTime } from '@/utils';
import { CloseCircleOutlined } from '@ant-design/icons';
import RemoveOrderModal from '@/components/RemoveOrderModal';
import { IOrder } from '@/types/order';
import { ITableResponse } from '@/types/table';
import { OrderStatus } from '@/constants';
import { getTables } from '@/services/table';
import { getOrders } from '@/services/order';

interface ITable extends ITableResponse {
  status: string;
}

const getSortedOrderDetails = (orderList: IOrder[]) => {
  return orderList.sort(
    (a: any, b: any) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );
};

const OrderList = () => {
  const [waitingTimes, setWaitingTimes] = useState<{ [key: number]: string }>(
    {},
  );
  // initialOrderList
  const [orderList, setOrderList] = useState<IOrder[]>([]);
  const [tableList, setTableList] = useState<ITableResponse[]>([]);
  const [visible, setVisible] = useState({ removeOrderItem: false });
  const [focusOrderDetail, setFocusOrderDetail] = useState<any>(undefined);

  const dynamicOrderList = useMemo(() => {
    return getSortedOrderDetails(orderList);
  }, [orderList]);

  const currenTable = useMemo(() => {
    return tableList.map((item) => {
      const order = dynamicOrderList.find((e) => e.tableId === item.id);
      return { ...item, status: order?.status ?? 'free' };
    });
  }, [dynamicOrderList, tableList]);

  useEffect(() => {
    loadTableList();
    loadOrderList();
  }, []);

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

  const loadTableList = async () => {
    const response = await getTables();
    if (response?.data?.success) {
      setTableList(response.data?.data);
    }
  };

  const loadOrderList = async () => {
    const response = await getOrders();
    console.log(response.data?.data);

    if (response?.data?.success) {
      setOrderList(response.data?.data);
    }
  };

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

  const handleConfirmOrder = (order: IOrder) => {
    console.log(order);
  };

  const renderTable = (table: ITable) => {
    return (
      <Col span={8} key={table.id}>
        <Col
          className="table_container"
          style={{
            backgroundColor:
              table.status === OrderStatus.InProgress ? 'orange' : '#04f400',
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

  const renderOrder = (order: IOrder) => {
    const table = tableList.find((item) => item.id === order.tableId);
    return (
      <Col className="order_container" key={order.id}>
        <Row className="order_header" justify={'space-between'}>
          <Col className="order_name">
            {table?.name} : {order?.status}{' '}
          </Col>
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
            <Button onClick={() => handleConfirmOrder(order)} type="primary">
              Xác nhận
            </Button>
          </Col>
        </Row>
      </Col>
    );
  };

  // setup socket example
  const [messages, setMessages] = useState<string[]>([]);
  console.log(messages);

  useEffect(() => {
    const socket = initializeSocket();

    socket.on('connect', () => {
      console.log('Connected to the server');
    });

    socket.on('message', (message: string) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup when the component unmounts
    return () => {
      disconnectSocket();
    };
  }, []);

  // const sendMessage = () => {
  //   const socket = getSocket();
  //   socket.emit('message', 'Hello from Next.js!');
  // };

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
