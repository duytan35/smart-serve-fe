'use client';

import './index.scss';
import WithAuth from '@/components/WithAuth';
import React, { useEffect, useMemo, useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';
import useSWR, { mutate } from 'swr';
import TableApi from '@/services/tables';
import OrderApi from '@/services/orders';
import { OrderStatus } from '@/constants';
import { Loading } from '@/components/Loading';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { IRestaurant } from '@/types/restaurant';
import { IOrder, IOrderDetail } from '@/types/order';
import { Step } from '@/types/menu';
import { groupBy } from 'lodash';
import useSWRMutation from 'swr/mutation';
import { notification } from 'antd';
import { NotepadText } from 'lucide-react';
import { timeDifferenceFromNow } from '@/utils';

const mappingData = (orders: IOrder[], steps: Step[]) => {
  const orderDetails: IOrderDetail[] = [];
  orders.forEach((order) => {
    orderDetails.push(
      ...order.orderDetails.map((orderDetail) => ({
        ...orderDetail,
        tableId: order.tableId,
        orderId: order.id,
      })),
    );
  });

  const groupedByStep = groupBy(orderDetails, 'step');
  const result: Record<
    string,
    { stepName: string; orderDetails: IOrderDetail[] }
  > = {};

  Object.keys(groupedByStep).forEach((step) => {
    result[step] = {
      stepName:
        steps.find((s) => s.step === Number(step))?.name ||
        steps[steps.length - 1].name,
      orderDetails: groupedByStep[step].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    };
  });

  // Add empty step
  steps.forEach((step) => {
    if (!result[step.step.toString()]) {
      result[step.step.toString()] = {
        stepName: step.name,
        orderDetails: [],
      };
    }
  });

  return result;
};

const OrdersManagement = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [columns, setColumns] = useState<
    Record<
      string,
      {
        stepName: string;
        orderDetails: IOrderDetail[];
      }
    >
  >({});
  const restaurant = useSelector(
    (state: RootState) => state.app.restaurant as IRestaurant,
  );

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
        notification.success({
          message: 'Update order detail successfully!',
        });
      },
      onError: (error) => {
        console.error('Error update order detail:', error);
        notification.error({
          message: 'Update order detail failed!',
        });
      },
    },
  );

  const newColumns = useMemo(
    () => mappingData(orders, restaurant.steps),
    [orders, restaurant.steps],
  );

  useEffect(() => {
    setColumns(newColumns);
  }, [newColumns]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;

    const movedItem = columns[sourceCol].orderDetails[source.index];

    const sourceItems = Array.from(columns[sourceCol].orderDetails);
    const destItems = Array.from(columns[destCol].orderDetails);

    const [removed] = sourceItems.splice(source.index, 1);

    if (sourceCol === destCol) {
      sourceItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [sourceCol]: { ...columns[sourceCol], orderDetails: sourceItems },
      });
    } else {
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [sourceCol]: { ...columns[sourceCol], orderDetails: sourceItems },
        [destCol]: { ...columns[destCol], orderDetails: destItems },
      });
    }

    triggerUpdateOrderDetail({
      id: movedItem.id,
      step: Number(destCol),
    });
  };

  if (isTableLoading || isOrderLoading) {
    return <Loading />;
  }

  const getTableName = (tableId: number) => {
    const table = tables.find((t) => t.id === tableId);
    return table ? table.name : '';
  };

  return (
    <div className="orders-management-container">
      <div className="title">Orders management</div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board">
          {Object.entries(columns).map(([colId, col]) => (
            <Droppable key={colId} droppableId={colId}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="column"
                >
                  <h3>{col.stepName}</h3>
                  {col.orderDetails.map((orderDetail, index) => (
                    <Draggable
                      key={orderDetail.id}
                      draggableId={orderDetail.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="card"
                        >
                          <div className="header">
                            <div className="table">
                              {getTableName(orderDetail.tableId as number)}
                            </div>
                            <div className="time">
                              {timeDifferenceFromNow(
                                orderDetail.createdAt,
                                currentTime,
                              )}
                            </div>
                          </div>
                          <div className="name-quantity">
                            <div className="name">{orderDetail.dishName}</div>
                            <div className="quantity">
                              x{orderDetail.quantity}
                            </div>
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
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default WithAuth(OrdersManagement);
