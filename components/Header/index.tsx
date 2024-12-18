import './index.scss';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { IRestaurant } from '@/types/restaurant';
import Image from 'next/image';
import Link from 'next/link';
import {
  CookingPot,
  LayoutDashboard,
  Settings,
  SquareMenu,
  Table,
  TableProperties,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { getImage } from '@/utils';

const navigationItems = [
  {
    path: '/dashboard',
    icon: <LayoutDashboard width={16} height={16} />,
    text: 'Dashboard',
  },
  {
    path: '/tables-orders',
    icon: <TableProperties width={16} height={16} />,
    text: 'Tables & orders',
  },
  {
    path: '/orders-management',
    icon: <CookingPot width={16} height={16} />,
    text: 'Orders management',
  },
  { path: '/menu', icon: <SquareMenu width={16} height={16} />, text: 'Menu' },
  { path: '/tables', icon: <Table width={16} height={16} />, text: 'Tables' },
  {
    path: '/settings',
    icon: <Settings width={16} height={16} />,
    text: 'Settings',
  },
];

const Header = () => {
  const pathname = usePathname();
  const restaurant = useSelector(
    (state: RootState) => state.app.restaurant as IRestaurant,
  );

  return (
    <>
      <div className="header-container">
        <div className="logo-container">
          <Image src="/icon.jpg" width={100} height={100} alt="Web icon" />
          Smart serve
        </div>
        <div className="restaurant-name">
          {restaurant.name}
          <Image
            src={
              restaurant.avatar ? getImage(restaurant.avatar) : '/default.webp'
            }
            width={100}
            height={100}
            alt="Restaurant avatar"
          />
        </div>
      </div>
      <div className="navigation">
        {navigationItems.map((item, index) => (
          <Link
            key={index}
            href={item.path}
            className={`navigation-item ${pathname === item.path ? 'active' : ''}`}
          >
            {item.icon}
            {item.text}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Header;
