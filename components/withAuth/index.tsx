'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthLayout from '../../layouts/auth';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Loading } from '../Loading';
import AuthApi from '@/services/auth/index';
import { setRestaurant } from '@/store/slices/appSlice';
import { disconnectSocket, initializeWebSocket } from '@/utils/socket';
import { IWebSocketMessage } from '@/types/order';
import { WebSocketEvent } from '@/constants';
import { mutate } from 'swr';

const WithAuth = (WrappedComponent: any) => {
  return function WithAuthPage(props: any) {
    const router = useRouter();
    const restaurant = useSelector((state: RootState) => state.app.restaurant);
    const isUserAuthenticated = restaurant?.name !== null;
    const dispatch = useDispatch();

    useEffect(() => {
      if (!restaurant) return;
      const socket = initializeWebSocket(restaurant.id);

      socket.onmessage = (event) => {
        const message: IWebSocketMessage = JSON.parse(event.data);
        if (message.event === WebSocketEvent.PLACE_ORDER) {
          mutate('orders');
        }
      };

      return () => {
        disconnectSocket();
      };
    }, [restaurant]);

    useEffect(() => {
      if (!isUserAuthenticated) {
        router.push('/sign-in');
      }
    }, [isUserAuthenticated, router]);

    useEffect(() => {
      const getRestaurantInfo = async () => {
        try {
          const restaurantResponse = await AuthApi.getMe();
          dispatch(setRestaurant(restaurantResponse));
        } catch {
          router.push('/sign-in');
        }
      };

      getRestaurantInfo();
    }, [dispatch, router]);

    return restaurant ? (
      <AuthLayout>
        <WrappedComponent {...props} />
      </AuthLayout>
    ) : (
      <Loading />
    );
  };
};

export default WithAuth;
