'use client';

import './index.scss';
import React, { useEffect, useState } from 'react';
import { IOrder, IOrderDetail } from '@/types/order';
import WithAuth from '@/components/WithAuth';
import useSWR, { mutate } from 'swr';
import TableApi from '@/services/tables';
import OrderApi from '@/services/orders';
import { Loading } from '@/components/Loading';
import { groupBy } from 'lodash';
import { Button, Modal, notification } from 'antd';
import { formatCurrency, timeDifferenceFromNow } from '@/utils';
import { NotepadText } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { IRestaurant } from '@/types/restaurant';
import useSWRMutation from 'swr/mutation';
import { ITable } from '@/types/table';
import ClientApi from '@/services/client';
import { getImage } from '@/utils';
import Image from 'next/image';
import { OrderStatus } from '@/constants';

const formatGroupOrders = (orders: IOrder[]) => {
  const flatOrderDetails = orders
    .map((order) =>
      order.orderDetails.map((orderDetail) => ({
        ...orderDetail,
        orderId: order.id,
        tableId: order.tableId,
      })),
    )
    .flat();
  const groupedOrders = groupBy(
    flatOrderDetails,
    (item) => `${item.orderId}-${item.groupOrderNumber}`,
  );

  const formattedGroupedOrders: IOrderDetail[][] = [];
  Object.values(groupedOrders).forEach((group) => {
    formattedGroupedOrders.push(group);
  });

  return formattedGroupedOrders.sort(
    (a, b) =>
      new Date(b[0].createdAt).getTime() - new Date(a[0].createdAt).getTime(),
  );
};

const TablesOrders = () => {
  const restaurant = useSelector(
    (state: RootState) => state.app.restaurant as IRestaurant,
  );
  const steps = restaurant.steps;
  const [currentTime, setCurrentTime] = useState(new Date());
  const [viewTable, setViewTable] = useState<ITable>();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const { data: tables = [], isLoading: isTableLoading } = useSWR(
    'tables',
    TableApi.getTables,
  );
  const { data: orders = [], isLoading: isOrderLoading } = useSWR(
    'orders',
    () => OrderApi.getOrders({ status: OrderStatus.InProgress }),
  );

  const { data: orderInViewTable } = useSWR(
    viewTable?.id ? ['table-order', viewTable.id] : null,
    () => ClientApi.getOrderByTable({ tableId: viewTable?.id as number }),
  );

  const { trigger: triggerUpdateOrderDetail } = useSWRMutation(
    'update-order-detail',
    async (
      _: string,
      {
        arg,
      }: {
        arg: {
          id: number;
          step: number;
        };
      },
    ) => OrderApi.updateOrderDetail(arg),
    {
      onSuccess: () => {
        mutate('orders');
      },
      onError: (error) => {
        console.error('Error update order detail:', error);
        notification.error({
          message: 'Update order detail failed!',
        });
      },
    },
  );

  const { trigger: triggerUpdateOrder, isMutating: isUpdatingOrder } =
    useSWRMutation(
      'update-order',
      async (
        _: string,
        {
          arg,
        }: {
          arg: {
            id: number;
            status: string;
          };
        },
      ) => OrderApi.updateOrder(arg),
      {
        onSuccess: () => {
          mutate('orders');
          setViewTable(undefined);
          notification.success({
            message: 'Mark order complete successfully!',
          });
        },
        onError: (error) => {
          console.error('Error update order:', error);
          notification.error({
            message: 'Update order detail!',
          });
        },
      },
    );

  if (isTableLoading || isOrderLoading) {
    return <Loading />;
  }

  const groupOrders = formatGroupOrders(orders);

  const getTableName = (tableId: number) => {
    const table = tables.find((t) => t.id === tableId);
    return table ? table.name : '';
  };

  const getCurrentStep = (index: number) => {
    const maxStep = Math.max(...steps.map((step) => step.step));

    if (index > maxStep) {
      return steps.find((step) => step.step === maxStep)?.name;
    }

    return steps.find((step) => step.step === index)?.name;
  };

  const handleNextStep = (orderDetail: IOrderDetail) => {
    triggerUpdateOrderDetail({
      id: orderDetail.id,
      step: orderDetail.step + 1,
    });
  };

  return (
    <>
      <div className="tables-orders-container">
        <div className="tables-container">
          <div className="title">Tables</div>
          <div className="tables grid">
            {tables.map((table) => (
              <div
                className={`table-card ${orders.find((o) => o.tableId === table.id) ? 'active' : 'empty'}`}
                key={table.id}
                onClick={() => {
                  if (orders.find((o) => o.tableId === table.id)) {
                    setViewTable(table);
                  }
                }}
              >
                <div className="name">{table.name}</div>
                <div className="seats">{table.seats} seats</div>
                <div className="status">
                  {orders.find((o) => o.tableId === table.id)
                    ? 'Being served'
                    : 'Empty'}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="divide" />
        <div className="orders-container">
          <div className="title">Processing orders</div>
          <div className="orders">
            {groupOrders.map((groupOrder) => (
              <div
                className="order-card"
                key={`${groupOrder[0].tableId}_${groupOrder[0].groupOrderNumber}`}
              >
                <div className="header">
                  <div className="title">
                    {getTableName(groupOrder[0].tableId as number)}
                  </div>
                  <div className="time">
                    {timeDifferenceFromNow(
                      groupOrder[0].createdAt,
                      currentTime,
                    )}
                  </div>
                </div>
                <div className="body">
                  {groupOrder.map((orderDetail) => (
                    <div className="row-container" key={orderDetail.id}>
                      <div className="row">
                        <div className="name-quantity">
                          <div className="name">{orderDetail.dishName}</div>
                          <div className="quantity">
                            x{orderDetail.quantity}
                          </div>
                        </div>
                        {orderDetail.step !== 0 ? (
                          <div className="step">
                            {getCurrentStep(orderDetail.step)}
                          </div>
                        ) : (
                          <div className="actions">
                            <Button
                              size="small"
                              color="primary"
                              variant="outlined"
                              onClick={() => handleNextStep(orderDetail)}
                            >
                              Next step
                            </Button>
                          </div>
                        )}
                      </div>
                      {orderDetail.note && (
                        <div className="note-container">
                          <div className="icon-note">
                            <NotepadText size={16} />
                          </div>
                          <p className="note">{orderDetail.note}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal
        title={viewTable?.name}
        open={!!viewTable}
        onOk={() =>
          triggerUpdateOrder({
            id: orderInViewTable?.id as number,
            status: OrderStatus.Complete,
          })
        }
        onCancel={() =>
          triggerUpdateOrder({
            id: orderInViewTable?.id as number,
            status: OrderStatus.Cancel,
          })
        }
        okText="Finish"
        cancelText="Cancel order"
        okButtonProps={{ loading: isUpdatingOrder }}
        cancelButtonProps={{ danger: true, loading: isUpdatingOrder }}
        className="table-order-modal"
      >
        <div className="cart-items">
          {orderInViewTable?.orderDetails.map((orderDetail) => (
            <div className="cart-item" key={orderDetail.id}>
              <Image
                src={getImage(orderDetail.imageIds[0])}
                alt="Dish image"
                width={200}
                height={200}
                objectFit="cover"
              />
              <div className="info">
                <div className="row">
                  <h4 className="name">{orderDetail.dishName}</h4>
                  <p className="price">
                    {formatCurrency(orderDetail.dishPrice)}
                  </p>
                </div>
                <div className="row">
                  <div className="des-note">
                    <p>{orderDetail.dishDescription}</p>
                    {orderDetail.note && (
                      <div className="note-container">
                        <div className="icon-note">
                          <NotepadText size={16} />
                        </div>
                        <p className="note">{orderDetail.note ?? 'Add note'}</p>
                      </div>
                    )}
                  </div>
                  <div className="quantity-step">
                    <div className="quantity">{orderDetail.quantity}</div>
                    <div className="step">
                      {getCurrentStep(orderDetail.step)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="order-summary">
            <div>
              Total quantity:
              <span>
                {orderInViewTable?.orderDetails.reduce(
                  (total, orderDetail) => total + orderDetail.quantity,
                  0,
                )}
              </span>
            </div>
            <div>
              Total price:
              <span>
                {formatCurrency(
                  orderInViewTable?.orderDetails.reduce(
                    (total, orderDetail) =>
                      total + orderDetail.dishPrice * orderDetail.quantity,
                    0,
                  ) ?? 0,
                )}
              </span>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default WithAuth(TablesOrders);
