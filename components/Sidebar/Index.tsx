'use client';
import React, { useMemo } from 'react';
import { AlignJustify } from 'lucide-react';
import { Col, Row } from 'antd';
import { usePathname } from 'next/navigation';
import { SidebarNavigate } from '../../constants';

import './styles.scss';
import Link from 'next/link';

type SidebarNavItem = {
  name: string;
  icon: React.ElementType;
  path: string;
};

const Sidebar = () => {
  const pathname = usePathname();

  const sidebarIndex = useMemo(() => {
    const navIndex = SidebarNavigate.findIndex((item) =>
      pathname.includes(item.path),
    );
    return navIndex !== -1 ? navIndex : 0;
  }, [pathname]);

  const renderNavIcon = (item: SidebarNavItem, key: number) => {
    return (
      <Col
        span={24}
        key={key}
        className={`nav_item ${sidebarIndex === key && 'focus_icon'}`}
      >
        <Link href={item.path}>
          <item.icon />
        </Link>
      </Col>
    );
  };

  return (
    <div className="sidebar_container">
      <div className="sidebar_header">
        <AlignJustify />
      </div>
      <Row gutter={[0, 12]} className="icon_container">
        <Col
          span={24}
          className="nav_item_background"
          style={{ top: 54 * sidebarIndex + sidebarIndex * 12 }}
        ></Col>
        {SidebarNavigate.map((item, key) => {
          return renderNavIcon(item, key);
        })}
      </Row>
    </div>
  );
};

export default Sidebar;
