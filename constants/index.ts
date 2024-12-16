import { BringToFront, House, PieChart, SquareMenu } from 'lucide-react';

type SidebarNavItem = {
  name: string;
  icon: React.ElementType;
  path: string;
};

export const SidebarNavigate: SidebarNavItem[] = [
  {
    name: 'home',
    icon: House,
    path: '/home',
  },
  {
    name: 'orderList',
    icon: BringToFront,
    path: '/order-list',
  },
  {
    name: 'menuList',
    icon: SquareMenu,
    path: '/menuList',
  },
  {
    name: 'dashboard',
    icon: PieChart,
    path: '/dashboard',
  },
];

export const OrderStatus = {
  InProgress: 'InProgress',
  Complete: 'Complete',
  Cancel: 'Cancel',
};

export const WebSocketEvent = {
  ORDER_UPDATED: 'ORDER_UPDATED',
  PLACE_ORDER: 'PLACE_ORDER',
};
